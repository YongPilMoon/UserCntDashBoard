import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import userApi from '../../api/users';
import { addZ } from '../../helper';

// 액션 타입
const GET_USERS = 'modules/GET_USERS';
const GET_USERS_PENDING = 'modules/GET_USERS_PENDING';
const GET_USERS_FULFILLED = 'modules/GET_USERS_FULFILLED';
const GET_USERS_REJECTED = 'modules/GET_USERS_REJECTED';

const GET_THISWEEK_USERS = 'modules/GET_THISWEEK_USERS';
const GET_PREWEEK_USERS = 'modules/GET_PREWEEK_USERS';
const GET_NEXTWEEK_USERS = 'modules/GET_NEXTWEEK_USERS';

// 액션 생성자
export const getUsers = (untilDate) => ({
  type: GET_USERS,
  payload: userApi.getUsers(untilDate)
});

export const getThisWeekUsers = createAction(GET_THISWEEK_USERS);
export const getPreWeekUsers = createAction(GET_PREWEEK_USERS);
export const getNextWeekUsers = createAction(GET_NEXTWEEK_USERS);


const initialState = Map({
  users: Map({
    data: null,
    untilDate: '2017-09-27',
    pending: false,
    error: false,
    isLoading: false
  })
});

// reducer
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

  [GET_THISWEEK_USERS]: (state, action) => {
    return state.setIn(['users','untilDate'], '2017-09-27')
  },
  [GET_PREWEEK_USERS]: (state, action) => {
    const currentDate = state.getIn(['users', 'untilDate']);
    const preDateTS = new Date(currentDate).getTime() - 3600000 * 24 * 7;
    const preDateObj = new Date(preDateTS);
    const preDate = preDateObj.getFullYear() + "-" + addZ((preDateObj.getMonth() + 1)) + '-' + addZ(preDateObj.getDate());
    return state.setIn(['users', 'untilDate'], preDate);
  },
  [GET_NEXTWEEK_USERS]: (state, action) => {
    const currentDate = state.getIn(['users', 'untilDate']);
    const nextDateTS = new Date(currentDate).getTime() + 3600000 * 24 * 7;
    const nextDateObj = new Date(nextDateTS);
    const nextDate = nextDateObj.getFullYear() + "-" + addZ((nextDateObj.getMonth() + 1)) + '-' + addZ(nextDateObj.getDate());
    return state.setIn(['users', 'untilDate'], nextDate);
  }
}, initialState);