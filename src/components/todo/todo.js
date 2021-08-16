import React, { useState, useEffect, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { ListContext } from '../../context/listContext.js';
import { SettingContext } from '../../context/settingsContext.js';
import './todo.scss';
function ToDo(props) {

  const listContext = useContext(ListContext);
  const settingContext = useContext(SettingContext);
  const [state, setState] = useState([])

  // function addItem(item) {
  //   item._id = Math.random();
  //   item.complete = false;
  //   setState([...state, item]);
  // };

  // function toggleComplete(id){

  //   let item = state.filter(i => i._id === id)[0] || {};

  //   if (item._id) {
  //     item.complete = !item.complete;
  //     let list = state.map(listItem => listItem._id === item._id ? item : listItem);
  //     setState(list);
  //   }

  // };

  useEffect(() => {
    let localSettings = localStorage.getItem('settings') === true;
    if (localSettings) {
      localSettings = JSON.parse(localStorage.getItem('settings'))
      settingContext.setSettings(localSettings.items, localSettings.view);
    }
  }, [])


  return (
    <>

      <h2>
        There are {listContext.list.filter(item => !item.complete).length} Items To Complete
      </h2>

      <section className="todo">

        <div>
          <TodoForm
          //  handleSubmit={addItem}
          />
        </div>

        <div>
          <TodoList
            list={state}
          // handleComplete={toggleComplete}
          />
        </div>
      </section>
    </>
  );
}


export default ToDo;
