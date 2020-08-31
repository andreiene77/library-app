import { Box, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useCallback, useMemo } from 'react';
import theme from '../assets/theme';
import { useStudentContext } from '../contexts/studentContext';
import actionStates from '../utils/actionState';

const useStyles = makeStyles({
  btn_group_root: {
    margin: theme.spacing(1),
  },
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
});

const ActionsTable = ({ actions, addAction, modifyAction, deleteAction }) => {
  const [{ accessToken }] = useStudentContext();
  const classes = useStyles();

  const columns = useMemo(
    () => [
      { field: 'createDate', title: 'Date Created', type: 'date', editable: 'never' },
      { field: 'lastUpdate', title: 'Last Update', type: 'date' },
      { field: 'deadline', title: 'Deadline', type: 'date' },
      {
        field: 'state',
        title: 'State',
        lookup: Object.values(actionStates).reduce((result, state) => {
          result[state] = state;
          return result;
        }, {}),
        render: (rowData) =>
          [
            actionStates.BOOKING_REQUESTED,
            actionStates.BORROWED_AWAITING,
            actionStates.BORROW_EXTEND_REQUEST,
            actionStates.USER_RETURNED,
          ].includes(rowData.state) ? (
            <p style={{ color: theme.palette.warning.main, fontWeight: 'bold' }}>{rowData.state}</p>
          ) : [
              actionStates.BORROW_EXTEND_DECLINED,
              actionStates.CANCELED_BY_ADMIN,
              actionStates.CANCELED_BY_OVERDUE,
              actionStates.CANCELED_BY_USER,
              actionStates.RETURN_DENIED,
              actionStates.RETURN_OVERDUE,
            ].includes(rowData.state) ? (
            <p style={{ color: theme.palette.error.main, fontWeight: 'bold' }}>{rowData.state}</p>
          ) : (
            <p style={{ color: theme.palette.success.main, fontWeight: 'bold' }}>{rowData.state}</p>
          ),
      },
      // { field: 'proof', title: 'Proof' },
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

  const detailPanel = useCallback((rowData) => {
    return (
      <Box style={{ padding: 10 }}>
        <Button variant='contained' color='success' startIcon={<CheckIcon />} style={{ marginRight: 10 }}>
          Confirm
        </Button>
        <Button variant='contained' color='danger' startIcon={<CloseIcon />}>
          Deny
        </Button>
      </Box>
    );
  }, []);

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
