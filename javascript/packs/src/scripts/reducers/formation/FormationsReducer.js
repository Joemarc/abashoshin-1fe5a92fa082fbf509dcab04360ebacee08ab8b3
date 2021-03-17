import {
  GET_FORMATIONS_FAILURE, GET_FORMATIONS_REQUEST, GET_FORMATIONS_SUCCESS,
  GET_FORMATION_FAILURE, GET_FORMATION_REQUEST, GET_FORMATION_SUCCESS,
  GET_MODULES_REQUEST, GET_MODULES_FAILURE, GET_MODULES_SUCCESS
} from '../../actions';

const initialState = {
  isLoading: false,
  formation: null,
  isLoadingFormation: false,
  formations: [],
  modules: [],
  isLoadingModules: false,
  error: null,
};

export default function(state = initialState, action) {
  let reducer;
  switch(action.type) {
    case GET_FORMATIONS_REQUEST:
      reducer = {
        ...state,
        isLoading: true
      };
      break;
    case GET_FORMATIONS_SUCCESS:
      reducer = {
        ...state,
        formations: action.payload,
        isLoading: false
      };
      break;
    case GET_FORMATIONS_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_FORMATION_REQUEST:
      reducer = {
        ...state,
        isLoadingFormation: true
      };
      break;
    case GET_FORMATION_SUCCESS:
      reducer = {
        ...state,
        formation: action.payload,
        isLoadingFormation: false
      };
      break;
    case GET_FORMATION_FAILURE:
      reducer = {
        ...state,
        isLoading: false,
        error: action.payload
      };
      break;
    case GET_MODULES_REQUEST:
      reducer = {
        ...state,
        isLoadingModules: true
      };
      break;
    case GET_MODULES_SUCCESS:
      reducer = {
        ...state,
        modules: action.payload,
        isLoadingModules: false
      };
      break;
    case GET_MODULES_FAILURE:
      reducer = {
        ...state,
        isLoadingModules: false,
        error: action.payload
      };
      break;
    default:
      reducer = state;
  }
  return reducer;
}
