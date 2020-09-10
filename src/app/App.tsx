import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from '@material-ui/core/LinearProgress';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC} from '../features/Login/auth-reducer';

function App() {
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch])

    const handleLogout = useCallback(() => {
        dispatch(logoutTC());
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {/*
                        <Button color="inherit">Login</Button>
*/}
                        {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Log out</Button>}
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress color='secondary'/>}
                <Container fixed>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/'} exact render={() => <TodolistsList/>}/>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
