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

let testApi = 'tz20/list.json';

export class App extends React.Component{

  state = {
    items: []
  };

  getFromLocalStorage = () => {
    return localStorage.getItem("catsArray");
  }

  putToLocalStorage = (data) => {
    localStorage.setItem("catsArray", JSON.stringify(data));
  }

  getData = async() => {
    const res = await axios(testApi);
    const resultData = (res.data.data).map(elm => ({...elm, class: false}));
    this.putToLocalStorage(resultData);
    this.setState({
      items: resultData
    });
  }

  async componentDidMount(){
    (this.getFromLocalStorage() !== null) ?
      (this.setState({
        items: JSON.parse(this.getFromLocalStorage())
      })) : await this.getData();
  };

  deleteItem = (items,itemId) => {

    function getTime(){
      const time = new Date();
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      return time.toLocaleString("en", options);
    };

    const itemIndex = items.findIndex(item => item.id === itemId);
    const itemToDelete = items[itemIndex];
    itemToDelete.class = !itemToDelete.class;
    const resultArr = (itemToDelete.class)?
      [...items.slice(0, itemIndex),...items.slice(itemIndex + 1),{...itemToDelete,time: `Deleted ${getTime()}`}] :
      [{...itemToDelete,time:""},...items.slice(0, itemIndex),...items.slice(itemIndex + 1)];
    this.putToLocalStorage(resultArr);

    this.setState({
      items: resultArr
    });
  }

render(){
  const items = this.state.items;
  
  return (
    <div className="main">
      <BrowserRouter>
        <div className="sidebar">
          <div className="input-box">
            <span>Filter:</span>
            <input 
              id="search" 
              type="text"
              onChange={e => {
                const filteredArray = (JSON.parse(this.getFromLocalStorage())).filter(cat => 
                  (cat.name.toLowerCase().includes(e.target.value.toLowerCase()))
                );
                this.setState({
                  items: filteredArray
                });
              }}
            />
          </div>
          {items.map(item => (
            <SidebarItem
              key={item.id} 
              item={item}
              deleteItem={() => this.deleteItem(JSON.parse(this.getFromLocalStorage()),item.id)}
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
 
