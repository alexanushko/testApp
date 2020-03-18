import React from 'react';

export const BigItem = (props) => {

  return (
    <div className="big-item">
      <div className="big-item-text-container">
        <h1 >{props.item.name}</h1>
        <h2>{props.item.shortInfo}</h2>
      </div>
      <div className="item-picture">
        <img src={`https://mrsoft.by/tz20${props.picture.data.pic}`} alt="картинка с сервера"/>
      </div>
    </div>    
  );
}
