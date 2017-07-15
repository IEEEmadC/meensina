export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state, me: action.payload.data };
    default:
      return state;
  }
};
