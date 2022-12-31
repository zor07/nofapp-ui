export type LevelType = {
    id: string
    name: string
    order: number
}

type SetLevelsActionType = {
    type: typeof SET_LEVELS
    payload: Array<LevelType>
}

type LevelsStateType = {
    levels: Array<LevelType>
}

const initialState: LevelsStateType = {
    levels: []
}

const SET_LEVELS = 'LEVELS/SET_LEVELS'

const levelsReducer = (state: LevelsStateType = initialState, action: SetLevelsActionType): LevelsStateType => {
    switch (action.type) {
        case "LEVELS/SET_LEVELS":
            return {
                ...state,
                levels: action.payload
            }
    }
}



export default levelsReducer