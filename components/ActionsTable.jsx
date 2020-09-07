/* eslint-disable react/display-name */
import { Box, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useCallback, useMemo } from 'react';
import { mutate } from 'swr';
import theme from '../assets/theme';
import { useStudentContext } from '../contexts/studentContext';
import actionStates, {
  BOOKING_DECLINED,
  BOOKING_REQUESTED,
  BORROWED_AWAITING,
  BORROW_EXTEND_DECLINED,
  BORROW_EXTEND_REQUEST,
  CANCELED_BY_ADMIN,
  CANCELED_BY_OVERDUE,
  CANCELED_BY_USER,
  RETURN_DENIED,
  RETURN_OVERDUE,
  USER_RETURNED,
} from '../utils/actionState';
import { ACTIONS_ROUTE } from '../utils/apiRoutes';
import { putter } from '../utils/fetcher';

const useStyles = makeStyles({
  btn_group_root: {
    margin: theme.spacing(1),
  },
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
});

const ActionsTable = ({ actions, addAction, modifyAction, deleteAction, fetcherKey }) => {
  const [{ accessToken }] = useStudentContext();
  const classes = useStyles();

  const columns = useMemo(
    () => [
      { field: 'createDate', title: 'Date Created', type: 'date', editable: 'never' },
      { field: 'lastUpdate', title: 'Last Update', type: 'date', defaultSort: 'desc' },
      { field: 'deadline', title: 'Deadline', type: 'date' },
      {
        field: 'state',
        title: 'State',
        lookup: Object.values(actionStates).reduce((result, state) => {
          result[state] = state;
          return result;
        }, {}),
        render: (rowData) => {
          if ([BOOKING_REQUESTED, BORROWED_AWAITING, BORROW_EXTEND_REQUEST, USER_RETURNED].includes(rowData.state))
            return <p style={{ color: theme.palette.warning.main, fontWeight: 'bold' }}>{rowData.state}</p>;
          if (
            [
              BOOKING_DECLINED,
              BORROW_EXTEND_DECLINED,
              CANCELED_BY_ADMIN,
              CANCELED_BY_OVERDUE,
              CANCELED_BY_USER,
              RETURN_DENIED,
              RETURN_OVERDUE,
            ].includes(rowData.state)
          )
            return <p style={{ color: theme.palette.error.main, fontWeight: 'bold' }}>{rowData.state}</p>;
          return <p style={{ color: theme.palette.success.main, fontWeight: 'bold' }}>{rowData.state}</p>;
        },
      },
      { field: 'book', title: 'Book', editable: 'never' },
      { field: 'user', title: 'User', editable: 'never' },
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
      // onRowAdd: addAction,
      onRowUpdate: modifyAction,
      onRowDelete: deleteAction,
    }),
    [deleteAction, modifyAction],
  );

  const confirm = useCallback(
    (state, id) => async () => {
      let url;
      const body = { id };
      if (state === BORROWED_AWAITING) url = ACTIONS_ROUTE.PUT.ADMIN_CONFIRM_BORROW();
      if (state === USER_RETURNED) url = ACTIONS_ROUTE.PUT.ADMIN_CONFIRM_RETURN();
      if (url) await putter(url, body, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );
  const accept = useCallback(
    (state, id) => async () => {
      let url;
      const body = { id };
      if (state === BORROW_EXTEND_REQUEST) url = ACTIONS_ROUTE.PUT.ADMIN_ACCEPT_EXTEND();
      if (state === BOOKING_REQUESTED) url = ACTIONS_ROUTE.PUT.ADMIN_ACCEPT_BOOKING();
      if (url) await putter(url, body, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );
  const deny = useCallback(
    (state, id) => async () => {
      let url;
      const body = { id };
      if (state === BORROWED_AWAITING) url = ACTIONS_ROUTE.PUT.ADMIN_DENY_BORROW();
      if (state === USER_RETURNED) url = ACTIONS_ROUTE.PUT.ADMIN_DENY_RETURN();
      if (url) await putter(url, body, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );
  const decline = useCallback(
    (state, id) => async () => {
      let url;
      const body = { id };
      if (state === BORROW_EXTEND_REQUEST) url = ACTIONS_ROUTE.PUT.ADMIN_DECLINE_EXTEND();
      if (state === BOOKING_REQUESTED) url = ACTIONS_ROUTE.PUT.ADMIN_DECLINE_BOOKING();
      if (url) await putter(url, body, accessToken);
      mutate(fetcherKey);
    },
    [accessToken, fetcherKey],
  );

  const detailPanel = useCallback(
    (rowData) => {
      return [BORROW_EXTEND_REQUEST, BOOKING_REQUESTED, BORROWED_AWAITING, USER_RETURNED].includes(rowData.state) ? (
        <Box style={{ padding: 10 }}>
          {[BORROWED_AWAITING, USER_RETURNED].includes(rowData.state) ? (
            <>
              <Button
                variant='contained'
                color='success'
                startIcon={<CheckIcon />}
                onClick={confirm(rowData.state, rowData._id)}
                style={{ marginRight: 10 }}
              >
                Confirm
              </Button>
              <Button
                variant='contained'
                color='danger'
                startIcon={<CloseIcon />}
                onClick={deny(rowData.state, rowData._id)}
              >
                Deny
              </Button>
            </>
          ) : (
            ''
          )}
          {[BORROW_EXTEND_REQUEST, BOOKING_REQUESTED].includes(rowData.state) ? (
            <>
              <Button
                variant='contained'
                color='success'
                startIcon={<CheckIcon />}
                onClick={accept(rowData.state, rowData._id)}
                style={{ marginRight: 10 }}
              >
                Accept
              </Button>

              <Button
                variant='contained'
                color='danger'
                startIcon={<CloseIcon />}
                onClick={decline(rowData.state, rowData._id)}
              >
                Decline
              </Button>
            </>
          ) : (
            ''
          )}
        </Box>
      ) : undefined;
    },
    [accept, confirm, decline, deny],
  );

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.tableContent}>
          <MaterialTable
            columns={columns}
            data={actions}
            title='All actions'
            options={options}
            editable={editable}
            detailPanel={detailPanel}
          />
        </div>
      </Paper>
    </>
  );
};

export default ActionsTable;
