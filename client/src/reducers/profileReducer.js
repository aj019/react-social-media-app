import {GET_PROFILE,GET_ALL_PROFILES,PROFILE_LOADING,PROFILES_LOADING,CLEAR_CURRENT_PROFILE} from '../actions/types'
 
const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    profilesLoading: false,
}

export default function(state = initialState,action){
    switch(action.type){

        case PROFILE_LOADING:
            return{...state,loading:true}
        
        case PROFILES_LOADING:
            return{...state,profilesLoading:true}    

        case GET_PROFILE:
            return{...state,profile:action.payload,loading:false}   
        
        case GET_ALL_PROFILES:
            return {...state,profiles:action.payload,profilesLoading:false}
            
        case CLEAR_CURRENT_PROFILE:
        return{...state,profile:null}
        default:
                return state;
    }
}