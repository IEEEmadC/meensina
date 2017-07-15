import Api from '../config/axios';

export const fetchGroups = (limit) => {
  return (dispatch) => {
    Api.get(`/groups?limit=${limit}`).then((response) => {
      dispatch({
        type: 'FETCH_GROUPS',
        payload: response
      })
    }).catch((err) => {
      dispatch({
        type: 'FETCH_GROUPS_ERROR',
        payload: err
      })
    });
  }
}

export const fetchUser = () => {
  return (dispatch) => {
    Api.get('/user/info').then((response) => {
      dispatch({
        type: 'FETCH_USER',
        payload: response
      })
    }).catch((err) => {
      dispatch({
        type: 'FETCH_USER_ERROR',
        payload: err
      })
    })
  }
}
