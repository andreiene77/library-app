import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  accessToken: '',
  refreshToken: '',
};

export const AdminContext = createContext();
export const AdminProvider = ({ reducer, children }) => (
  <AdminContext.Provider value={useReducer(reducer, initialState)}>{children}</AdminContext.Provider>
);
export const useAdminContext = () => useContext(AdminContext);
