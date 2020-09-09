export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = typeof initialState

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

type ActionsType = changeStatusActionType | SetErrorActionType;
export type changeStatusActionType = ReturnType<typeof changeStatusAC>;
export const changeStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);

export type SetErrorActionType = ReturnType<typeof SetErrorAC>;
export const SetErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const);


