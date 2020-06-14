import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import Axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import theme from '../assets/theme';
import EditUserPopup from './EditUserPopup';

const useStyles = makeStyles({
  btn_group_root: {
    margin: theme.spacing(1),
  },
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
  actions_table_cell: { minWidth: 130 },
});

const UsersTable = ({ users, userAdded, userUpdated, userRemoved }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // TODO: maybe useReducer
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('edit');
  const [selectedUser, setSelectedUser] = useState(null);
  const rowsPerPageOptions = useMemo(() => [10, 25, 100], []);

  const tableCellStyle = (column) => ({ minWidth: column.minWidth });

  const columns = useMemo(
    () => [
      { id: 'id', label: 'ID', minWidth: 35 },
      { id: 'username', label: 'Username', minWidth: 250 },
      { id: 'email', label: 'Email Address', minWidth: 250 },
      { id: 'firstName', label: 'First Name', minWidth: 200 },
      { id: 'lastName', label: 'Last Name', minWidth: 200 },
      { id: 'isAdmin', label: 'Is Admin', minWidth: 50 },
      { id: 'totalActions', label: 'No. Total Actions', minWidth: 70 },
    ],
    [],
  );

  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  const handleOpenAddPopup = useCallback(() => {
    setPopupType('add');
    setEditPopupOpen(true);
  }, []);

  const handleOpenEditPopup = useCallback(
    (user) => () => {
      setPopupType('edit');
      setEditPopupOpen(true);
      setSelectedUser(user);
    },
    [],
  );

  const handleCloseEditPopup = useCallback(() => {
    setEditPopupOpen(false);
    setSelectedUser(null);
  }, []);

  const addUser = useCallback(
    async (user) => {
      try {
        const addedUser = await (await Axios.post('/users', user)).data;
        userAdded(addedUser);
      } catch (e) {
        console.log(e);
      }
    },
    [userAdded],
  );
  const editUser = useCallback(
    async (user) => {
      try {
        await Axios.put('/users', user);
        userUpdated(user);
      } catch (e) {
        console.log(e);
      }
    },
    [userUpdated],
  );

  const deleteUser = useCallback(
    (id) => async () => {
      try {
        await Axios.delete('/users', { data: { id } });
        userRemoved(users.findIndex((user) => user.id === id));
      } catch (e) {}
    },
    [userRemoved, users],
  );

  const userRows = useMemo(() => {
    const rowsData = users.map((user) => {
      const { id, username, email, firstName, lastName, isAdmin } = user;
      return { id, username, email, firstName, lastName, isAdmin };
    });
    return rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
      return (
        <TableRow
          hover
          role='checkbox'
          tabIndex={-1}
          key={row.id}
          // style={i % 2 ? { background: 'white' } : { background: theme.palette.grey[100] }}
        >
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number' ? column.format(value) : value}
              </TableCell>
            );
          })}
          <TableCell key='actions'>
            <IconButton onClick={handleOpenEditPopup(row)} aria-label='edit'>
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteUser(row.id)} aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  }, [users, columns, deleteUser, handleOpenEditPopup, page, rowsPerPage]);

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.tableContent}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={tableCellStyle(column)}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key='actions' className={classes.actions_table_cell}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{userRows}</TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <EditUserPopup
        open={editPopupOpen}
        handleClose={handleCloseEditPopup}
        type={popupType}
        user={selectedUser}
        addUser={addUser}
        editUser={editUser}
      />
      <ButtonGroup
        variant='contained'
        color='primary'
        className={classes.btn_group_root}
        aria-label='contained primary button group'
      >
        <Button onClick={handleOpenAddPopup} endIcon={<AddIcon />}>
          Add a user
        </Button>
        {/* <Button endIcon={<PlaylistAddIcon />}>Add multiple users</Button> */}
      </ButtonGroup>
    </>
  );
};

export default UsersTable;
