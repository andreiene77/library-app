/* eslint-disable no-console */
import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { useStudentContext } from '../contexts/studentContext';
import { USERS_ROUTE } from '../utils/apiRoutes';
import { destroyer, getter, poster, putter } from '../utils/fetcher';

export const useUsers = ({ initialUsers = [] }) => {
  const url = USERS_ROUTE.GET.ALL();
  const [{ accessToken }] = useStudentContext();

  const postAuth = useCallback((givenURL, body) => poster(givenURL, body, accessToken), [accessToken]);
  const putAuth = useCallback((givenURL, body) => putter(givenURL, body, accessToken), [accessToken]);
  const deleteAuth = useCallback((givenURL) => destroyer(givenURL, accessToken), [accessToken]);
  const fetcherKey = [url, accessToken];
  const { data, error } = useSWR(accessToken ? fetcherKey : null, getter);

  const addUser = useCallback(
    async (user) => {
      try {
        mutate(fetcherKey, [...data, user], false);
        await postAuth(USERS_ROUTE.POST.ONE(), user);
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, fetcherKey, postAuth],
  );

  const modifyUser = useCallback(
    async (user) => {
      try {
        mutate(
          fetcherKey,
          data.map((u) => (user.id === u.id ? user : u)),
          false,
        );
        await putAuth(USERS_ROUTE.PUT.OTHER(), user);
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, fetcherKey, putAuth],
  );

  const deleteUser = useCallback(
    async ({ id }) => {
      try {
        mutate(
          fetcherKey,
          data.filter((user) => user.id !== id),
          false,
        );
        await deleteAuth(USERS_ROUTE.DELETE(id));
        mutate(fetcherKey);
      } catch (e) {
        console.log(e);
      }
    },
    [data, deleteAuth, fetcherKey],
  );

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    addUser,
    modifyUser,
    deleteUser,
  };
};

export default useUsers;
