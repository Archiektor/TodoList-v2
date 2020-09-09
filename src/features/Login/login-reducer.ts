import {Dispatch} from 'redux';
import {changeStatusAC, changeStatusActionType, SetErrorAC, SetErrorActionType} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerNetworkError} from '../../utils/error-utils';

const initialState: InitialStateType = {}

type InitialStateType = {}
type ActionsType = ReturnType<typeof loginMeAC>

export const loginReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        default:
            return state;
    }
}

type ThunkDispatch = Dispatch<ActionsType> | changeStatusActionType | SetErrorActionType

//actions
export const loginMeAC = (email: string, password: string, remeberMe: boolean) =>
    ({type: 'LOGIN_ME', email, password, remeberMe} as const)


//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | changeStatusActionType | SetErrorActionType>) => {
    dispatch(changeStatusAC('loading'))
    //alert(email, password, remeberMe)
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                //dispatch(loginMeAC(email, password, rememberMe))
                alert('Hurra');
                dispatch(changeStatusAC('succeeded'))
            } else {
                dispatch(SetErrorAC(res.data.messages[0]))
                dispatch(changeStatusAC('failed'))
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })

}