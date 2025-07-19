import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer 
} from './reducers/userReducers';
import { 
  bookListReducer, 
  bookDetailsReducer, 
  bookCreateReducer, 
  bookUpdateReducer, 
  bookDeleteReducer, 
  bookMyListReducer 
} from './reducers/bookReducers';
import { 
  exchangeCreateReducer, 
  exchangeListMyReducer, 
  exchangeDetailsReducer, 
  exchangeUpdateStatusReducer, 
  exchangeAddMessageReducer 
} from './reducers/exchangeReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  bookDelete: bookDeleteReducer,
  bookMyList: bookMyListReducer,
  exchangeCreate: exchangeCreateReducer,
  exchangeListMy: exchangeListMyReducer,
  exchangeDetails: exchangeDetailsReducer,
  exchangeUpdateStatus: exchangeUpdateStatusReducer,
  exchangeAddMessage: exchangeAddMessageReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;