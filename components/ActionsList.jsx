import { Box, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useCallback, useMemo } from 'react';
import theme from '../assets/theme';
import { useStudentContext } from '../contexts/studentContext';

const useStyles = makeStyles({
  btn_group_root: {
    margin: theme.spacing(1),
  },
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
});

const ActionsList = ({ actions, cancelBooking, userPickedUp, userRequestExtend, userReturn }) => {
  const [{ accessToken }] = useStudentContext();
  const classes = useStyles();

  const columns = useMemo(
    () => [
      { field: 'createDate', title: 'Date Created', type: 'date' },
      { field: 'lastUpdate', title: 'Last Update', type: 'date' },
      { field: 'deadline', title: 'Deadline', type: 'date' },
      { field: 'state', title: 'State' },
      // { field: 'proof', title: 'Proof' },
      { field: 'book', title: 'Book' },
      // { field: 'user', title: 'User' },
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

  const detailPanel = useCallback((rowData) => {
    return (
      <Box style={{ padding: 10 }}>
        <Button
          variant='contained'
          color='danger'
          startIcon={<CloseIcon />}
          onClick={() => cancelBooking(rowData._id)}
          style={{ marginRight: 10 }}
        >
          Cancel Booking
        </Button>
        <Button
          variant='contained'
          color='success'
          startIcon={<AddShoppingCartIcon />}
          onClick={() => userPickedUp(rowData._id)}
          style={{ marginRight: 10 }}
        >
          Pick Up Book
        </Button>
        <Button
          variant='contained'
          color='success'
          startIcon={<WatchLaterIcon />}
          onClick={() => userRequestExtend(rowData._id)}
          style={{ marginRight: 10 }}
        >
          Request Extend
        </Button>
        <Button
          variant='contained'
          color='success'
          startIcon={<AssignmentReturnedIcon />}
          onClick={() => userReturn(rowData._id)}
          style={{ marginRight: 10 }}
        >
          Return
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
            detailPanel={detailPanel}
          />
        </div>
      </Paper>
    </>
  );
};

export default ActionsList;
