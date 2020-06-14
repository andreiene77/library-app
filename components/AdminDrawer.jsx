import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import React from 'react';

const AdminDrawer = ({ isOpen, openDrawer, closeDrawer, page, setPage }) => {
  return (
    <Drawer anchor='left' open={isOpen} onClose={closeDrawer}>
      <div style={{ width: 250 }} role='presentation' onClick={closeDrawer} onKeyDown={closeDrawer}>
        <List>
          {[
            { text: 'Books', icon: <MenuBookIcon /> },
            { text: 'Users', icon: <GroupIcon /> },
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

export default AdminDrawer;
