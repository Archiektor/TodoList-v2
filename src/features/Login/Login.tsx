import React from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatusAC} from '../../app/app-reducer';
import {useFormik} from 'formik';
import {loginTC} from './auth-reducer';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    dispatch(changeStatusAC('succeeded'));
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            //alert(JSON.stringify(values));
        },
        validate: values => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        }
    });

    if(isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <Grid container justify={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}>here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                            </FormLabel>
                        <FormGroup>
                            <TextField label={'Email'} margin={'normal'} {...formik.getFieldProps('email')}/>
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password" label={'Password'}
                                       margin={'normal'} {...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remeber me'}
                                              control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                                 checked={formik.values.rememberMe}/>}
                            />
                            <Button type="submit" variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}