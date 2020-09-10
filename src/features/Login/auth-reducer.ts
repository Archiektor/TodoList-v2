import {Dispatch} from 'redux';
import {changeStatusAC, changeStatusActionType, SetErrorAC, SetErrorActionType} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerNetworkError} from '../../utils/error-utils';

const initialState: InitialStateType = {
    isLoggedIn: false,
}

type InitialStateType = {
    isLoggedIn: boolean
}
type ActionsType = loginMeType | setIsLoggedInType

export const authReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case 'login/SET_IS_LOGGED_IN': {
            return {...state, isLoggedIn: actions.isLoggedIn}
        }
        default:
            return state;
    }
}

type ThunkDispatch = Dispatch<ActionsType> | changeStatusActionType | SetErrorActionType

//actions
export const loginMeAC = (email: string, password: string, remeberMe: boolean) =>
    ({type: 'LOGIN_ME', email, password, remeberMe} as const)

type loginMeType = ReturnType<typeof loginMeAC>;

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET_IS_LOGGED_IN', isLoggedIn} as const)

type setIsLoggedInType = ReturnType<typeof setIsLoggedInAC>;
//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | changeStatusActionType | SetErrorActionType>) => {
    dispatch(changeStatusAC('loading'))
    //alert(email, password, remeberMe)
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                //dispatch(loginMeAC(email, password, rememberMe))
                dispatch(setIsLoggedInAC(true));
                dispatch(changeStatusAC('succeeded'));
            } else {
                dispatch(SetErrorAC(res.data.messages[0]));
                dispatch(changeStatusAC('failed'));
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })

}

export const logoutTC = () => (dispatch: Dispatch<ActionsType | changeStatusActionType | SetErrorActionType>) => {
    dispatch(changeStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(changeStatusAC('succeeded'))
            } else {
                handleServerNetworkError({message: res.data.messages[0]}, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

