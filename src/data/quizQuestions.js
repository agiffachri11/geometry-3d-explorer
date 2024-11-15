const quizQuestions = [
    {
      id: 1,
      question: "Calculate the volume of a cube with side length 3 units.",
      options: [
        "9 cubic units",
        "18 cubic units",
        "27 cubic units",
        "36 cubic units"
      ],
      correctAnswer: "27 cubic units",
      explanation: "The volume of a cube is calculated using the formula V = s³, where s is the length of one side. So, 3³ = 27 cubic units.",
      shape: {
        type: "cube",
        dimensions: { width: 3, height: 3, depth: 3 },
        color: "orange"
      }
    },
    {
      id: 2,
      question: "What is the surface area of a sphere with radius 2 units?",
      options: [
        "8π square units",
        "16π square units",
        "32π square units",
        "48π square units"
      ],
      correctAnswer: "16π square units",
      explanation: "The surface area of a sphere is calculated using the formula A = 4πr², where r is the radius. So, 4π(2)² = 16π square units.",
      shape: {
        type: "sphere",
        dimensions: { width: 4 }, // diameter = 2 * radius
        color: "blue"
      }
    },
    {
      id: 3,
      question: "Calculate the volume of a cylinder with radius 2 units and height 4 units.",
      options: [
        "8π cubic units",
        "16π cubic units",
        "24π cubic units",
        "32π cubic units"
      ],
      correctAnswer: "16π cubic units",
      explanation: "The volume of a cylinder is calculated using the formula V = πr²h, where r is the radius and h is the height. So, π(2)²(4) = 16π cubic units.",
      shape: {
        type: "cylinder",
        dimensions: { width: 4, height: 4 },
        color: "green"
      }
    },
    {
      id: 4,
      question: "If you double the radius of a sphere, by what factor does its volume increase?",
      options: [
        "2 times",
        "4 times",
        "6 times",
        "8 times"
      ],
      correctAnswer: "8 times",
      explanation: "The volume of a sphere is V = (4/3)πr³. When radius is doubled, the new volume is (4/3)π(2r)³ = 8((4/3)πr³), which is 8 times the original volume.",
      shape: {
        type: "sphere",
        dimensions: { width: 2 },
        color: "purple"
      }
    },
    {
      id: 5,
      question: "What is the volume of a cone with radius 3 units and height 4 units?",
      options: [
        "12π cubic units",
        "18π cubic units",
        "24π cubic units",
        "36π cubic units"
      ],
      correctAnswer: "12π cubic units",
      explanation: "The volume of a cone is calculated using the formula V = (1/3)πr²h, where r is the radius and h is the height. So, (1/3)π(3)²(4) = 12π cubic units.",
      shape: {
        type: "cone",
        dimensions: { width: 6, height: 4 },
        color: "red"
      }
    }
  ];
  
  export default quizQuestions;