import React from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Grid
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {changeStatusAC} from '../../app/app-reducer';
import {useFormik} from 'formik';
import {loginTC} from './login-reducer';

export const Login = () => {
    const dispatch = useDispatch();
    dispatch(changeStatusAC('succeeded'));
    const loginLink = <a href="https://social-network.samuraijs.com/">here</a>;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            alert(JSON.stringify(values));
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

    return (
        <Grid container justify={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel children={
                            <span>To log in get registered {loginLink}<br/>
                            or use common test account credentials:<br/>
                            Email: free@samuraijs.com<br/>
                            Password: free</span>}/>
                        <FormGroup>
                            <TextField label={'Email'} margin={'normal'} {...formik.getFieldProps('email')}/>
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password" label={'Password'}
                                       margin={'normal'} {...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}s
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