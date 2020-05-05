import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useCallback, useMemo, useState } from 'react';

const columns = [
  { id: 'id', label: 'ID', minWidth: 35 },
  { id: 'name', label: 'Name', minWidth: 250 },
  { id: 'author', label: 'Author', minWidth: 170 },
  { id: 'publHouse', label: 'Publishing House', minWidth: 140 },
  { id: 'year', label: 'Year', minWidth: 70 },
  { id: 'genre', label: 'Genre', minWidth: 100 },
  { id: 'copies', label: 'No. Of Copies', minWidth: 70 },
];

let idx = 0;

function createData(name, author, publHouse, year, genre, copies = 1) {
  idx += 1;
  return { id: idx, name, author, publHouse, year, genre, copies };
}

const rows = [
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Some Title of a Book', 'Some awesome author', 'some publishing house', '2025', 'science', 1001),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
  createData('Another Title of a Book', 'Another awesome author', 'anther publishing house', '2027', 'science', 2002),
];

const styles = {
  paper: { width: '100%' },
  tableContent: { maxHeight: '80vh', overflow: 'auto' },
  tableCell: (column) => ({ minWidth: column.minWidth }),
};

const BooksTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = useMemo(() => [10, 25, 100], []);

  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  return (
    <Paper style={styles.paper}>
      <div style={styles.tableContent}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={styles.tableCell(column)}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default BooksTable;
