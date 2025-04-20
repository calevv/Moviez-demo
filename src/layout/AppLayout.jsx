import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

import styles from './AppLayout.module.css';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AppsIcon from '@mui/icons-material/Apps';
import ClearIcon from '@mui/icons-material/Clear';

const menuList = [
    { title: 'Home', url: '/' },
    { title: 'Movies', url: '/movies' },
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const AppLayout = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {menuList.map((menu, index) => (
                    <ListItem key={menu.title} disablePadding>
                        <Link to={menu.url} style={{ textDecoration: 'none', color: 'white' }}>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <LocalMoviesIcon />}</ListItemIcon>
                                <ListItemText primary={menu.title} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters className={styles.toolBar}>
                        <Link to="/">
                            <figure>
                                <img src="/moviez_logo.png" style={{ maxWidth: '70px' }} alt="logo" />
                            </figure>
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: '40px' } }}>
                            {menuList.map((menu, index) => (
                                <Link to={menu.url} style={{ textDecoration: 'none', color: 'white' }}>
                                    <Button key={index} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        {menu.title}
                                    </Button>
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Search>
                                <SearchIconWrapper></SearchIconWrapper>
                                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                            </Search>
                            <Button variant="outlined" color="primary">
                                <SearchIcon />
                            </Button>
                        </Box>
                        <div className={styles.mobileMenu}>
                            <Button onClick={toggleDrawer(true)}>{open ? <ClearIcon /> : <AppsIcon />}</Button>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </div>
    );
};

export default AppLayout;
