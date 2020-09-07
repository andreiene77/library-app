import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import BallotIcon from '@material-ui/icons/Ballot';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookIcon from '@material-ui/icons/Book';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import React from 'react';

const StudentDrawer = ({ isOpen, openDrawer, closeDrawer, page, setPage }) => {
  return (
    <Drawer anchor='left' open={isOpen} onClose={closeDrawer}>
      <div style={{ width: 250 }} role='presentation' onClick={closeDrawer} onKeyDown={closeDrawer}>
        <List>
          {[
            { text: 'Books', icon: <MenuBookIcon /> },
            { text: 'Actions', icon: <BallotIcon /> },
            { text: 'Book a book', icon: <BookmarkIcon /> },
            // { text: 'Borrow a book', icon: <BookIcon /> },
            // { text: 'Return a book', icon: <AssignmentReturnIcon /> },
          ].map((pageItem) => (
            <ListItem
              button
              key={pageItem.text}
              onClick={() => {
                setPage(pageItem.text);
                closeDrawer();
              }}
            >
              <ListItemIcon>{pageItem.icon}</ListItemIcon>
              <ListItemText primary={pageItem.text} />
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
    </Drawer>
  );
};

export default StudentDrawer;
