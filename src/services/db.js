import { db } from './firebase';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';

// Fungsi untuk menyimpan hasil quiz
export const saveQuizResult = async (userId, result) => {
  try {
    const userEmail = result.userEmail;
    const displayName = userEmail.split('@')[0];
    const now = new Date().toISOString();

    // Reference to user document
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    const userData = {
      email: userEmail,
      displayName: displayName,
      lastUpdated: now
    };

    if (userDoc.exists()) {
      // Update existing user
      await updateDoc(userRef, {
        ...userData,
        quizHistory: [...(userDoc.data().quizHistory || []), result],
        'stats.totalQuizzes': (userDoc.data().stats?.totalQuizzes || 0) + 1,
        'stats.bestScore': Math.max(userDoc.data().stats?.bestScore || 0, result.score),
        'stats.studyTime': (userDoc.data().stats?.studyTime || 0) + (result.duration || 0)
      });
    } else {
      // Create new user
      await setDoc(userRef, {
        ...userData,
        createdAt: now,
        quizHistory: [result],
        stats: {
          totalQuizzes: 1,
          bestScore: result.score,
          studyTime: result.duration || 0,
          shapesExplored: 0
        }
      });
    }

    // Update leaderboard
    const leaderboardRef = doc(db, 'leaderboard', userId);
    const leaderboardDoc = await getDoc(leaderboardRef);
    const currentBestScore = leaderboardDoc.exists() ? leaderboardDoc.data().bestScore : 0;

    if (!leaderboardDoc.exists() || result.score > currentBestScore) {
      await setDoc(leaderboardRef, {
        userId,
        displayName,
        email: userEmail,
        bestScore: Math.max(result.score, currentBestScore),
        totalQuizzes: userDoc.exists() ? 
          (userDoc.data().stats?.totalQuizzes || 1) : 1,
        lastUpdated: now
      });
    } else {
      await updateDoc(leaderboardRef, {
        totalQuizzes: userDoc.exists() ? 
          (userDoc.data().stats?.totalQuizzes || 1) : 1,
        lastUpdated: now
      });
    }

    return true;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return false;
  }
};

// Fungsi untuk mendapatkan leaderboard
export const getLeaderboard = async (limitCount = 10) => {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(
      leaderboardRef,
      orderBy('bestScore', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};

// Fungsi untuk mendapatkan progress pengguna
export const getUserProgress = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return null;
  }
};

export const updateUserProgress = async (userId, type, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const now = new Date().toISOString();

    if (userDoc.exists()) {
      const currentStats = userDoc.data().stats || {};
      let updateData = {
        lastUpdated: now,
      };

      switch (type) {
        case 'login':
          updateData['stats.studyTimeStart'] = data.studyTimeStart;
          break;

        case 'logout':
        case 'study':
          updateData['stats.studyTime'] = (currentStats.studyTime || 0) + (data.duration || 0);
          break;

        case 'explore':
          updateData['stats.shapesExplored'] = data.shapesCount || currentStats.shapesExplored || 0;
          break;

        case 'quiz':
          updateData['stats.totalQuizzes'] = (currentStats.totalQuizzes || 0) + 1;
          updateData['stats.bestScore'] = Math.max(data.score, currentStats.bestScore || 0);
          break;
      }

      await updateDoc(userRef, updateData);
    } else {
      await setDoc(userRef, {
        createdAt: now,
        lastUpdated: now,
        stats: {
          studyTime: data.duration || 0,
          studyTimeStart: type === 'login' ? data.studyTimeStart : now,
          shapesExplored: 0,
          totalQuizzes: 0,
          bestScore: 0
        }
      });
    }

    return true;
  } catch (error) {
    console.error("Error updating user progress:", error);
    return false;
  }
};

// Helper function untuk menghitung rata-rata
const calculateNewAverage = (oldAverage, totalQuizzes, newScore) => {
  return ((oldAverage * totalQuizzes) + newScore) / (totalQuizzes + 1);
};