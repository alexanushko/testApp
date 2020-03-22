import React from 'react';
import { NavLink } from 'react-router-dom'

export const SidebarItem = ({...props}) => {

  const item = props.item; 

  return (
    <NavLink 
      to={`/${item.name}`} 
      className={(props.deleteClass) ? "sidebar-item deleteClass" : "sidebar-item"}
      onClick={e => {
        e.stopPropagation();}}
    >
      <div>
        <p>{item.name}</p>
        <p>{item.shortInfo}</p>
        <p>{item.time}</p>
      </div>
      <span className="span" role="img" onClick={e => {
        e.stopPropagation();
        props.deleteItem(); 
      }}>{(props.deleteClass)? 'R':'❌'}</span>
    </NavLink>    
  );
}

