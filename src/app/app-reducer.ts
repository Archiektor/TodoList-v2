import {authAPI} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = typeof initialState

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET_IS_INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}

type ActionsType = changeStatusActionType | SetErrorActionType | setIsInitializedActionType;
export type changeStatusActionType = ReturnType<typeof changeStatusAC>;
export const changeStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);

export type SetErrorActionType = ReturnType<typeof SetErrorAC>;
export const SetErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const);

export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>;
export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET_IS_INITIALIZED',
    isInitialized
} as const);

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            }
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        })
}



