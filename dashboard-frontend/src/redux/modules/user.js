import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import userApi from '../../api/users';

// 액션 타입
const GET_USERS = 'modules/GET_USERS';
const GET_USERS_PENDING = 'modules/GET_USERS_PENDING';
const GET_USERS_FULFILLED = 'modules/GET_USERS_FULFILLED';
const GET_USERS_REJECTED = 'modules/GET_USERS_REJECTED';

// 액션 생성자
export const getUsers = (startDay, finishDay) => ({
  type: GET_USERS,
  payload: userApi.getUsers(startDay, finishDay)
});

const initialState = Map({
  users: Map({
    data: null,
    pending: false,
    error: false,
    isLoading: false
  })
});

// 리듀서
export default handleActions({
  [GET_USERS_PENDING]: (state, action) => {
    return state.mergeIn(['users'], {
      pending: false,
      isLoading: false,
      error: true
    });
  },
  [GET_USERS_FULFILLED]: (state, action) => {
    const users = action.payload.data;
    console.log(action.payload.data);
    return state.mergeIn(['users'], {
      pending: false,
      isLoading: false,
      data: users,
    })
  },
  [GET_USERS_REJECTED]: (state, action) => {
    return state.mergeIn(['users'], {
      pending: true,
      error: false,
      isLoading:true
    });
  },
}, initialState);