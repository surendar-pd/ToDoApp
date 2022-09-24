import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';



export default function SelectMenuComponent({selectedIndex, setSelectedIndex, options}) {
const [anchorEl, setAnchorEl] = React.useState(null);
// const [selectedIndex, setSelectedIndex] = React.useState(1);
const open = Boolean(anchorEl);
const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
};

const handleClose = () => {
    setAnchorEl(null);
};

return (
    <div>
    <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: '#2B2E36' }}
    >
        <ListItem
        button
        id="lock-button"
        aria-haspopup="listbox"
        aria-controls="lock-menu"
        aria-label="when device is locked"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickListItem}
        >
            <div className="flex flex-col gap-2">
                <h1>Status</h1>
                <h1 className={`${options[selectedIndex] === 'To do' ? "text-red-500" : options[selectedIndex] === 'Doing' ? "text-yellow-500" : "text-green-500"}`}>{options[selectedIndex]}</h1>
            </div>
        </ListItem>
    </List>
    <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
    }}
    >
        {options.map((option, index) => (
            <MenuItem
            // sx={{ bgcolor: '#2B2E36' }}
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
        >
            <h1>{option}</h1>
        </MenuItem>
        ))}
    </Menu>
    </div>
);
}
