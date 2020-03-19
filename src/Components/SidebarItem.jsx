import React from 'react';
import { NavLink } from 'react-router-dom'

export const SidebarItem = ({...props}) => {

  return (
    <NavLink 
      to={`/${props.item.name}`} 
      className={(props.deleteClass) ? "sidebar-item deleteClass" : "sidebar-item"}
    >
      <div>
        <p>{props.item.name}</p>
        <p>{props.item.shortInfo}</p>
      </div>
      <span class="span" role="img" onClick={e => {
        // debugger;
        props.deleteItem(); 
        }}>❌</span>
    </NavLink>    
  );
}
