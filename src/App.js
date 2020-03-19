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
    items: []
  };

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

  //слиял воедино
  
  return (
    <div className="main">
      <BrowserRouter>
        <div className="sidebar">
          {items.map(item => (
            <SidebarItem
              key={item.id} 
              item={item}
              deleteItem={() => this.deleteItem(items,item.id)}
              deleteClass={item.class}
            />
          ))}
        </div> 
        <div className="view-container">
          <Switch>  
            <Route exact path="/" render={() =>
              <>
                <h1>Породы кошек</h1>
                <div className="defolt-text-container">
                  <p>В списке слева представлены некторые породы кошек. По щелчку на элемент вы сможете увидеть более подробную информацию</p>
                  <div></div>
                </div>
              </>
            }/>
            {items.map(item => (
              <Route key={item.id} exact path={`/${item.name}`} render={() => <BigItem item={item}/>}/>
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}}
 
