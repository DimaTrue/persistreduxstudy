const initialState = {
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        ...state,

        loggedIn: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
