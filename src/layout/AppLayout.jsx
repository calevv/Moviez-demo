import React, {  useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search'; 

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
import { TextField } from '@mui/material'; 

const menuList = [
    { title: 'Home', url: '/' },
    { title: 'Movies', url: '/movies' },
];

 

const AppLayout = () => {
    const [search, setSearch]= useState('')
const navigate = useNavigate(); 
const searchByKeyword =(event)=>{
    event.preventDefault();
    navigate(`/movies?q=${search}`);
    setSearch('');
}
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
                            <Box>
                                <img src="/moviez_logo.png" style={{ maxWidth: '70px' }} alt="logo" />
                            </Box>
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
 
                       <form style={{ display: 'flex', alignItems: 'center', gap: 1 }} onSubmit={searchByKeyword}>
                            <TextField color="primary" id="standard-basic" label="Search" variant="standard" value={search} onChange={(event)=>{setSearch(event.target.value)}} />
                                <Button  color="primary" type='submit'>
                                    <SearchIcon />
                                </Button>
                       </form> 
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
