import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Avatar,
  Tooltip,
  ListItemIcon,
  Divider,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person,
  Logout,
  Home,
  ViewInAr,
  Quiz as QuizIcon,
  Settings,
  Close
} from '@mui/icons-material';

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      handleClose();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Explore', path: '/explore', icon: <ViewInAr /> },
    { text: 'Quiz', path: '/quiz', icon: <QuizIcon /> },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          Geometry 3D
        </Typography>
        <IconButton color="inherit" onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.text}
            onClick={() => {
              navigate(item.path);
              handleDrawerToggle();
            }}
            sx={{
              bgcolor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            '&:hover': {
              color: theme.palette.primary.dark,
            }
          }}
        >
          Geometry 3D Explorer
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          {currentUser && navItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: location.pathname === item.path ? theme.palette.primary.main : 'text.primary',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        {currentUser ? (
          <Box sx={{ ml: 2 }}>
            <Tooltip title={`Signed in as ${currentUser.email}`}>
              <IconButton
                onClick={handleProfileClick}
                size="small"
              >
                <Badge
                  color="secondary"
                  variant="dot"
                  invisible={true} // Set to false when there are new achievements
                >
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.main,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}>
                    {currentUser.email[0].toUpperCase()}
                  </Avatar>
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                  }
                }
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Signed in as
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {currentUser.email}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={() => navigate('/profile')} sx={{
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  }
                }
              }}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'error.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  }
                }
              }}>
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;