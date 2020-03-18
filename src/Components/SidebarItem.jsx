import React from 'react';
import { NavLink } from 'react-router-dom'

export const SidebarItem = ({...props}) => {

  return (
    <NavLink 
      to={`/${props.item.name}`} 
      className={(props.deleteClass) ? "sidebar-item deleteClass" : "sidebar-item"}
      onClick={e => {
        props.getPicture();
        e.stopPropagation();
      }}
    >
      <div className="sidebar-item-text-container">
        <p>{props.item.name}</p>
        <p>{props.item.shortInfo}</p>
      </div>
      <span id="span" role="img" onClick={e => {
        e.stopPropagation();//тут проблема, скидывает в начальную страницу. Без stopPropagation() работает нормально, но 
        props.deleteItem(); //клик всплывает дальше и дёргает другой онклик, чего мне не нужно
        }}>❌</span>
    </NavLink>    
  );
}

