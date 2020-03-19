import React from 'react';
import axios from 'axios';

async function getPicture(link){
  return await axios('https://mrsoft.by/tz20'+link);
}

export class BigItem extends React.Component{
  state = {
    picture: {}
  };

  async componentDidMount(){
    let result = await getPicture(this.props.item.more);

    this.setState({
      picture: result
    });
  };

  render(){

  const item = this.props.item;
  const picture = this.state.picture;

  if(Object.keys(this.state.picture).length !== 0){
    return (
      <div className="big-item">
        <div className="big-item-text-container">
          <h1 >{item.name}</h1>
          <h2>{item.shortInfo}</h2>
          <p>{picture.data.bio}</p>
        </div>
        <div className="item-picture">
          <img src={`https://mrsoft.by/tz20${picture.data.pic}`} alt="картинка с сервера"/>
        </div>
      </div>    
    );
  }else{
    return (
      <div>Loading</div>
    );
  }
}}
