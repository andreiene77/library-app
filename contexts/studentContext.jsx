import React, { createContext, useContext, useReducer } from 'react';

export const actionTypes = {
  INITIALIZE_TOKENS: 'initialize_tokens',
  SET_TOKENS: 'set_tokens',
  SET_USER: 'set_user',
  LOGOUT: 'logout',
};

const initialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_TOKENS:
      return {
        ...state,
        accessToken: localStorage.getItem('library_AccessToken'),
        refreshToken: localStorage.getItem('library_RefreshToken'),
      };
    case actionTypes.SET_TOKENS:
      localStorage.setItem('library_AccessToken', action.accessToken);
      localStorage.setItem('library_RefreshToken', action.refreshToken);
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        accessToken: '',
        refreshToken: '',
      };
    default:
      return state;
  }
};

export const StudentContext = createContext();
export const StudentProvider = ({ children }) => (
  <StudentContext.Provider value={useReducer(reducer, initialState)}>{children}</StudentContext.Provider>
);
export const useStudentContext = () => useContext(StudentContext);
