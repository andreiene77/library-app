import { Box, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import CloseIcon from '@material-ui/icons/Close';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import React, { useCallback, useMemo } from 'react';
import theme from '../assets/theme';
import { useStudentContext } from '../contexts/studentContext';
import {
  BOOKING_ACCEPTED,
  BOOKING_REQUESTED,
  BORROWED_CONFIRMED,
  BORROW_EXTEND_REQUEST,
  BORROW_EXTEND_ACCEPTED,
  BORROW_EXTEND_DECLINED,
} from '../utils/actionState';

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
      { field: 'lastUpdate', title: 'Last Update', type: 'date', defaultSort: 'desc' },
      { field: 'deadline', title: 'Deadline', type: 'date' },
      { field: 'state', title: 'State' },
      { field: 'book', title: 'Book' },
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
        {[BOOKING_REQUESTED, BOOKING_ACCEPTED].includes(rowData.state) ? (
          <Button
            variant='contained'
            color='danger'
            startIcon={<CloseIcon />}
            onClick={() => cancelBooking(rowData._id)}
            style={{ marginRight: 10 }}
          >
            Cancel Booking
          </Button>
        ) : (
          ''
        )}
        {[BOOKING_REQUESTED, BOOKING_ACCEPTED].includes(rowData.state) &&
        new Date().toDateString() === new Date(rowData.deadline).toDateString() ? (
          <Button
            variant='contained'
            color='success'
            startIcon={<AddShoppingCartIcon />}
            onClick={() => userPickedUp(rowData._id)}
            style={{ marginRight: 10 }}
          >
            Pick Up Book
          </Button>
        ) : (
          ''
        )}
        {BORROWED_CONFIRMED === rowData.state ? (
          <Button
            variant='contained'
            color='success'
            startIcon={<WatchLaterIcon />}
            onClick={() => userRequestExtend(rowData._id)}
            style={{ marginRight: 10 }}
          >
            Request Extend
          </Button>
        ) : (
          ''
        )}
        {[BORROWED_CONFIRMED, BORROW_EXTEND_REQUEST, BORROW_EXTEND_ACCEPTED, BORROW_EXTEND_DECLINED].includes(
          rowData.state,
        ) ? (
          <Button
            variant='contained'
            color='success'
            startIcon={<AssignmentReturnedIcon />}
            onClick={() => userReturn(rowData._id)}
            style={{ marginRight: 10 }}
          >
            Return
          </Button>
        ) : (
          ''
        )}
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
