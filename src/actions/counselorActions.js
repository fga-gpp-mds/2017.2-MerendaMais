import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { SET_COUNSELOR,
  LOGIN_SUCCESS,
  SET_TOKEN } from './types';
import { isLoading, isNotLoading } from './applicationActions';
import { logInfo } from '../../logConfig/loggers';

const FILE_NAME = 'counselorActions.js';

// Actions
export const setCounselor = counselor => ({
  type: SET_COUNSELOR,
  counselor,
});

export const loginSuccess = counselor => ({
  type: LOGIN_SUCCESS,
  counselor,
});

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});

// Async Actions
export const asyncCreateCounselor = userData => (dispatch) => {
  console.log(userData);
  axios.post('http://merenda-mais.herokuapp.com/counselor/', userData)
    .then((response) => {
      console.log(response.data);
      dispatch(setCounselor(response.data));
      Actions.loginCounselorScreen();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const asyncGetCounselor = id => (dispatch) => {
  console.log(id);
  axios.get(`http://merenda-mais.herokuapp.com/counselor/${id}`)
    .then((response) => {
      console.log(response.data);
      response.data = { ...response.data, id };
      dispatch(setCounselor(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const asyncEditCounselor = counselorData => (dispatch) => {
  console.log('counselorActions: ');
  console.log(counselorData);

  axios.patch(`http://merenda-mais.herokuapp.com/counselor/${counselorData.id}/`, {
    email: counselorData.email,
    phone: counselorData.phone,
    name: counselorData.name,
  })
    .then((response) => {
      console.log('counselorActions: ');
      console.log(response.data);
      const responseWithId = {
        ...response.data,
        id: counselorData.id,
      };
      dispatch(setCounselor(responseWithId));
      Actions.profileInfoScreen();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const asyncLoginCounselor = userData => (dispatch) => {
  logInfo(FILE_NAME,
    'asyncLoginCounselor',
    `userData received from LoginCounselorScreen: ${JSON.stringify(userData)}`);

  // Header json to send Login data. OBS: The word "headers" must be write like this.
  const header = {
    headers: {
      email: userData.email,
      senha: userData.password },
  };

  // Setting state loading true, to activate the loading spin.
  dispatch(isLoading());

  // Request to authenticate the user and get his token.
  axios.get('http://mobile-aceite.tcu.gov.br:80/appCivicoRS/rest/pessoas/autenticar', header)
    .then((response) => {
      logInfo(FILE_NAME,
        'asyncLoginCounselor',
        `Token received from Nuvem Cívica ${response.headers.apptoken}`);

      // To catch response header data you need to use response.headers.<Attribute-Needed>.
      dispatch(setToken(response.headers.apptoken));
      dispatch(loginSuccess(response.data));
      dispatch(isNotLoading());
      Actions.mainScreen();
    })
    .catch((erro) => {
      console.log(erro);
      dispatch(isNotLoading());
    });
};

// Modularization Functions
