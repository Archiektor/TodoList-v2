import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from '@material-ui/core/LinearProgress';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from '../features/Login/Login';

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

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
                        <Button color="inherit">Login</Button>
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
