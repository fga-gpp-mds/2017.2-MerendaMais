import initialState from './initialState';
import { SET_STOCKFOODREPORT_POSITIVE,
  SET_STOCKFOODREPORT_NEGATIVE,
  SET_STOCKFOODOBSERVATION,
  SET_REFECTORYREPORT_POSITIVE,
  SET_REFECTORYREPORT_NEGATIVE,
  SET_REFECTORYOBSERVATION,
  SET_KITCHENREPORT_POSITIVE,
  SET_KITCHENREPORT_NEGATIVE,
  SET_KITCHENOBSERVATION,
  SET_FOODQUALITYOBSERVATION,
  SET_FOODQUALITYREPORT_NEGATIVE,
  SET_FOODQUALITYREPORT_POSITIVE,
} from '../actions/types';
// import { logTrace, logWarn } from '../../logConfig/loggers';

// const FILE_NAME = 'reportReducer.js';

const reportReducer = (state = initialState.report, action) => {
  // logTrace(FILE_NAME, 'reportReducer',
  //   `Action Type received: ${action.type}`);

  if (action === undefined) {
    // logWarn(FILE_NAME, 'reportReducer',
    //   `ERROR: Action is undefined: ${JSON.stringify(action, null, 2)}`);

    return state;
  }

  switch (action.type) {
    case SET_STOCKFOODREPORT_POSITIVE:
      return {
        ...state,
        foodStock: state.foodStock.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          return item;
        }),
      };
    case SET_STOCKFOODREPORT_NEGATIVE:
      return {
        ...state,
        foodStock: state.foodStock.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          return item;
        }),
      };
    case SET_STOCKFOODOBSERVATION:
      return {
        ...state,
        foodStockObservation: action.payload,
      };

    case SET_KITCHENREPORT_POSITIVE:
      return {
        ...state,
        kitchen: state.kitchen.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          console.log(item);
          return item;
        }),
      };
    case SET_KITCHENREPORT_NEGATIVE:
      return {
        ...state,
        kitchen: state.kitchen.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          console.log(item);
          return item;
        }),
      };
    case SET_KITCHENOBSERVATION:
      return {
        ...state,
        kitchenObservation: action.payload,
      };
    case SET_REFECTORYREPORT_POSITIVE:
      return {
        ...state,
        refectory: state.refectory.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          console.log(item);
          return item;
        }),
      };
    case SET_REFECTORYREPORT_NEGATIVE:
      return {
        ...state,
        refectory: state.refectory.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          console.log(item);
          return item;
        }),
      };
    case SET_REFECTORYOBSERVATION:
      console.log(action.payload);
      return {
        ...state,
        refectoryObservation: action.payload,
      };
    case SET_FOODQUALITYREPORT_POSITIVE:
      return {
        ...state,
        foodQuality: state.foodQuality.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedYes: !item.markedYes, status: !item.status };
          }
          console.log(item);
          return item;
        }),
      };
    case SET_FOODQUALITYREPORT_NEGATIVE:
      return {
        ...state,
        foodQuality: state.foodQuality.map((item) => {
          if (item.key === action.payload.key) {
            return { ...item, markedNo: !item.markedNo, status: !item.status };
          }
          console.log(item);
          return item;
        }),
      };
    case SET_FOODQUALITYOBSERVATION:
      console.log(action.payload);
      return {
        ...state,
        foodQualityObservation: action.payload,
      };
    default:
      return state;
  }
};

export default reportReducer;
