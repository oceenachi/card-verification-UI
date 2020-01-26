import {GET_STATISTICS} from '../../../types';
import {TRIGGER, SET_ERROR} from '../../../types';


export default (state, action) => {
   
    switch(action.type) {
        case GET_STATISTICS:
            return {
                ...state,
                statData: action.payload
            }
        case TRIGGER:
            return {
                ...state,
                loading: true
            };
        case SET_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default: 
            return state;
    }
}