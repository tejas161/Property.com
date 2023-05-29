import React from 'react';

import { Link } from 'react-router-dom';

import {  List,ListItem } from '@mui/material'


import Avatar from '@mui/material/Avatar';


// import MenuUnstyled from '@mui/base/MenuUnstyled';
// import MenuItemUnstyled, {
//     menuItemClasses,
//   } from '@mui/base/MenuItemUnstyled';
//   import PopperUnstyled from '@mui/base/PopperUnstyled';


import MenuItem, { menuItemClasses } from '@mui/base/MenuItem';

import Popper from '@mui/base/Popper';

  import { styled } from '@mui/system';


  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };

  const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
  );
  
  const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;

    
    
   

    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemClasses.focusVisible} {
       outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
         outline:none;
       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
  );



  const PopperStyled = styled(Popper)`
  z-index: 1;
`;



const UserIcon = ({name,profileIcon}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const buttonRef = React.useRef(null);
    const menuActions = React.useRef(null);
    const preventReopen = React.useRef(false);

  
  
    const handleButtonClick = (event) => {
      if (preventReopen.current) {
        event.preventDefault();
        preventReopen.current = false;
        return;
      }
  
      if (isOpen) {
        setAnchorEl(null);
      } else {
        setAnchorEl(event.currentTarget);
      }
    };
  
    const handleButtonMouseDown = () => {
      if (isOpen) {
        // Prevents the menu from reopening right after closing
        // when clicking the button.
        preventReopen.current = true;
      }
    };
  
    const handleButtonKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        if (event.key === 'ArrowUp') {
          menuActions.current?.highlightLastItem();
        }
      }
    };
  
    const close = () => {
      setAnchorEl(null);
      buttonRef.current.focus();
    };
  
    const createHandleMenuClick = (menuItem) => {
      return () => {
        console.log(`Clicked on ${menuItem}`);
        close();
      };
    };

  


    return(
        <>
           
       <Avatar
         onClick={handleButtonClick}
         onKeyDown={handleButtonKeyDown}
         onMouseDown={handleButtonMouseDown}
         ref={buttonRef}
         aria-controls={isOpen ? 'simple-menu' : undefined}
         aria-expanded={isOpen || undefined}
         aria-haspopup="menu"
         src={profileIcon ? profileIcon : ""}
       
        sx={{ bgcolor: 'orange', cursor: 'pointer',marginRight:'10px' }}>{name  
          ? name[0].toUpperCase() : 'U'
        
        
        }</Avatar>
    
{/*    
    <MenuItem
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        slots={{ root: PopperStyled, listbox: StyledListbox }}
        slotProps={{ listbox: { id: 'simple-menu' } }}
        sx={{zIndex:'1200'}}
      
      >
        
         <Link to="/myprofile" style={{textDecoration:'none',color:'inherit'}}>
         <StyledMenuItem onClick={close}>
         
         My Profile
      
       
      
       </StyledMenuItem>
         
         </Link>

         <Link to="/saved" style={{textDecoration:'none',color:'inherit'}}>
         <StyledMenuItem onClick={close}>
         
         Saved Property
      
       
      
       </StyledMenuItem>
         
         </Link>

         <Link to="/requestpage" style={{textDecoration:'none',color:'inherit'}}>
         <StyledMenuItem onClick={close}>
         
         Dashboard
      
       
      
       </StyledMenuItem>
         
         </Link>





       
       <Link to="/logout" style={{textDecoration:'none',color:'inherit'}}>
        <StyledMenuItem onClick={close}>
         Logout
        </StyledMenuItem>
        </Link>

      
      </MenuItem>
    
     
                                              
                                                   */}
                                            
        
        
        
        
        </>





    );
}



export default UserIcon;