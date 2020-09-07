/* eslint-disable no-console */
import JwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useInterval from 'react-useinterval';
import { actionTypes, useStudentContext } from '../contexts/studentContext';
import apiRoutes from '../utils/apiRoutes';
import { getter } from '../utils/fetcher';
import { useCallback } from 'react';

const { INITIALIZE_TOKENS, SET_TOKENS, SET_USER } = actionTypes;

export const useAuth = () => {
  const router = useRouter();
  const [{ accessToken, refreshToken }, dispatch] = useStudentContext();

  const verifyAndRefreshToken = useCallback(async () => {
    try {
      const { exp } = JwtDecode(accessToken);
      console.log(`verify token, exp: ${new Date(exp * 1000)}`);
      if (exp * 1000 - new Date().valueOf() < 120 * 1000) {
        console.log('Refreshing token');
        const { accessToken: newAccessToken } = await getter(apiRoutes.USERS_ROUTE.GET.REFRESH_TOKEN(refreshToken));
        console.log('newAccessToken', newAccessToken);
        dispatch({ type: SET_TOKENS, accessToken: newAccessToken, refreshToken });
        return newAccessToken;
      }
      return accessToken;
    } catch (e) {
      console.error('Invalid token');
      router.push({ pathname: '/login' });
      return null;
    }
  }, [accessToken, dispatch, refreshToken, router]);

  useEffect(() => {
    dispatch({ type: INITIALIZE_TOKENS });
  }, []);

  useEffect(() => {
    const eff = async () => {
      if (accessToken) {
        const token = await verifyAndRefreshToken();
        const user = token === null ? null : await getter(apiRoutes.USERS_ROUTE.GET.SELF(), token);
        dispatch({ type: SET_USER, user });
      }
    };
    eff();
  }, [accessToken, dispatch, verifyAndRefreshToken]);

  useInterval(async () => {
    await verifyAndRefreshToken();
  }, 10 * 1000);
};

export default useAuth;
