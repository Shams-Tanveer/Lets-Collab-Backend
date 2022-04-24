import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import userImage from '../Images/userImage.png';
import logo from '../Images/logo.png';
import { useLocation } from 'react-router-dom';

const pageList = [
  {
    pageName: "Projects",
    path: "/projects"
  },
  {
    pageName: "Team Work",
    path: "/grouptask"
  },
  {
    pageName: "My Work",
    path: "/mywork"
  },
  {
    pageName: "Chat",
    path: "/chat"
  },
  {
    pageName: "Video",
    path: "/video"
  }
]

const settingList = [
  {
    pageName: "Profile",
    path: "/profile"
  },
  {
    pageName: "Logout",
    path: "/logout"
  }
]

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const [pages, setpages] = useState(pageList);
  const [settings, setsettings] = useState(settingList);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    let path1 = location.pathname;
    if (path1 === '/projects') {
      const newPageList = [
        {
          pageName: "Projects",
          path: "/projects"
        }
      ];
      setpages(newPageList);
      setsettings(settingList);
    }
    else if (path1 === "/" || path1 ==="/login") {
      const newSettingList = [
        {
          pageName: "Register",
          path: "/register"
        }
      ];
      setpages([]);
      setsettings(newSettingList);
    }
    else if (path1 === "/register") {
      const newSettingList = [
        {
          pageName: "Log In",
          path: "/login"
        }
      ];
      setpages([]);
      setsettings(newSettingList);
    }
    else {
      setpages(pageList);
      setsettings(settingList);
    }
  }, [location])


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo} width="150" height="50" alt="Let's Collab" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.pageName} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link style={{ color: 'black', textDecoration: 'none' }} to={page.path}>{page.pageName}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Let's Collab
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.pageName}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{ color: 'white', textDecoration: 'none' }} to={page.path}>{page.pageName}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={userImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.pageName} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link style={{ color: 'black', textDecoration: 'none' }} to={setting.path}>{setting.pageName}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
