import React from 'react';
import './css/style.css';
import axios from 'axios';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import {SidebarItem} from './Components/SidebarItem';
import {BigItem} from './Components/BigItem';

let testApi = 'https://mrsoft.by/tz20/list.json';

async function getData() {
  const res = await axios(testApi);
  const result = res.data.data;
  const resultData = result.map(elm => ({...elm, class: false}));
  return resultData;
}


export class App extends React.Component{

  state = {
    items: [],
    picture: {},
  };

  getPicture = async (link) => {
    const picture = await axios('https://mrsoft.by/tz20'+link);
    this.setState({
      picture: picture
    });
  }

  async componentDidMount(){
    let apiData = await getData();

    this.setState({
      items: apiData
    });
  };

  deleteItem = (items,itemId) => {

    const itemIndex = items.findIndex(item => item.id === itemId);
    const itemToDelete = items[itemIndex];
    itemToDelete.class = !itemToDelete.class;

    console.log("itemToDelete",itemToDelete);

    this.setState({
      items: [
        ...items.slice(0, itemIndex),
        itemToDelete,
        ...items.slice(itemIndex + 1)
      ]
    });
  }

render(){
  const items = this.state.items;
  console.log("стейт ", items);
  
if(Object.keys(this.state.picture).length !== 0){
  return (
    <div className="main">
      <BrowserRouter>
        <div className="sidebar">
          {items.map(item => (
            <SidebarItem
              key={item.id} 
              item={item}
              deleteItem={() => this.deleteItem(items,item.id)}
              getPicture={() => this.getPicture(item.more)}
              deleteClass={item.class}
            />
          ))}
        </div> 
        <div className="view-container">
          <Switch>  
            {items.map(item => (
              <Route key={item.id} path={`/${item.name}`} render={() => <BigItem item={item} picture={this.state.picture}/>} />
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
} else {
  return (
    <div className="main">
      <div className="sidebar">
        {items.map(item => (
          <SidebarItem
            key={item.id} 
            item={item}
            deleteItem={() => this.deleteItem(items,item.id)}
            getPicture={() => this.getPicture(item.more)}
            deleteClass={item.class}
          />
        ))}
      </div> 
      <div className="view-container">
        <h1>Породы кошек</h1>
        <div className="defolt-text-container">
          <p>В списке слева представлены некторые породы кошек. По щелчку на элемент вы сможете увидеть более подробную информацию</p>
          <div></div>
        </div>
      </div>
  </div>
  );
}
}}
 
