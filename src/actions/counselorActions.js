import axios from 'axios';
import {CREATE_COUNSELOR, SET_COUNSELOR} from './types.js';
//import {profileScreen} from '../screens/profileScreen';
import {Actions} from 'react-native-router-flux';


export const asyncCreateCounselor = (userData) => {
    return(dispatch) =>{
        console.log(userData);
        type: SET_COUNSELOR,
        axios.post('http://merenda-mais.herokuapp.com/counselor/', userData)
        .then((response) => {
            console.log(response.data);
            //Actions.profileScreen();

        })
        .catch(error => {
            console.log(error);
        })
    }
}

/*export const asyncGetCounselor = (id) => {
    return(dispatch) =>{
        console.log(id);
        axios.get(`http://merenda-mais.herokuapp.com/counselor/${id}`)
        .then((response) => {
            console.log(response.data);
            dispatch(setCounselor(response.data))
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const setCounselor = (counselor) => {
    return {
        type: SET_COUNSELOR,
        counselor
    }
}*/
