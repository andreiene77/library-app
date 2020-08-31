import { Button, Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import BlockIcon from '@material-ui/icons/Block';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useCallback, useMemo } from 'react';
import theme from '../assets/theme';
import { useStudentContext } from '../contexts/studentContext';
import { USERS_ROUTE } from '../utils/apiRoutes';
import { poster, putter } from '../utils/fetcher';

const useStyles = makeStyles({
  btn_group_root: {
    margin: theme.spacing(1),
  },
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
});

const UsersTable = ({ users, addUser, modifyUser, deleteUser }) => {
  const [{ accessToken }] = useStudentContext();
  const classes = useStyles();

  const columns = useMemo(
    () => [
      { field: 'username', title: 'Username' },
      { field: 'email', title: 'Email Address' },
      { field: 'firstName', title: 'First Name' },
      { field: 'lastName', title: 'Last Name' },
      { field: 'phone', title: 'Phone' },
      { field: 'isAdmin', title: 'Is Admin', type: 'boolean' },
      { field: 'blocked', title: 'Is Blocked', type: 'boolean' },
    ],
    [],
  );

  const options = useMemo(
    () => ({
      pageSize: 10,
      pageSizeOptions: [10, 25, 100],
      headerStyle: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      },
    }),
    [],
  );

  const editable = useMemo(
    () => ({
      onRowAdd: addUser,
      onRowUpdate: modifyUser,
      onRowDelete: deleteUser,
    }),
    [addUser, deleteUser, modifyUser],
  );

  const invalidateTokens = useCallback(
    (rowData) => () => poster(USERS_ROUTE.POST.INVALIDATE_ALL_TOKENS(), { username: rowData.username }, accessToken),
    [accessToken],
  );

  const blockUser = useCallback((id) => () => putter(USERS_ROUTE.PUT.BLOCK_USER(), { id }, accessToken), [accessToken]);

  const unblockUser = useCallback((id) => () => putter(USERS_ROUTE.PUT.UNBLOCK_USER(), { id }, accessToken), [
    accessToken,
  ]);

  const detailPanel = useCallback(
    (rowData) => {
      return (
        <Box style={{ padding: 10 }}>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<HighlightOffIcon />}
            style={{ marginRight: 10 }}
            onClick={invalidateTokens(rowData)}
          >
            Invalidate All Tokens
          </Button>
          {rowData.isAdmin ? (
            ''
          ) : rowData.blocked ? (
            <Button variant='contained' color='secondary' startIcon={<BlockIcon />} onClick={unblockUser(rowData.id)}>
              Unblock User
            </Button>
          ) : (
            <Button variant='contained' color='secondary' startIcon={<BlockIcon />} onClick={blockUser(rowData.id)}>
              Block User
            </Button>
          )}
        </Box>
      );
    },
    [blockUser, invalidateTokens, unblockUser],
  );

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.tableContent}>
          <MaterialTable
            columns={columns}
            data={users}
            title='All users'
            options={options}
            editable={editable}
            detailPanel={detailPanel}
          />
        </div>
      </Paper>
    </>
  );
};

export default UsersTable;
