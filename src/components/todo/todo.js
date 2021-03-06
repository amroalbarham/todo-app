import React, { useState,useEffect,useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { ListContext } from '../../context/listContext.js';
import { SettingContext } from '../../context/settingsContext.js';
import './todo.scss';

function ToDo(props) {

  const listContext = useContext(ListContext);
  const settingContext = useContext(SettingContext);
  const [state, setState] = useState([])

  // useEffect(()=>{
  //   let list = [
  //     { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
  //     { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
  //     { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
  //     { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
  //     { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
  //   ];
    
  //   setState(list);
  // },[])
  

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
          <TodoForm />
        </div>

        <div>
          <TodoList
            list={state}
          />
        </div>
      </section>
    </>
  );
}


export default ToDo;