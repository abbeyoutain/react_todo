import React, {useState} from 'react'
//EDIT - Step
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import TodoEdit from './TodoEdit'
import {useAuth} from '../../contexts/AuthContext'

//initialize the FontAwesome library in this file
library.add(fas);

//import for FontAwesome icons
/*
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
*/

export default function SingleTodo(props) {
  //EDIT - Step 3
  //React Hook to show/hide Edit Form
  const [showEdit, setShowEdit] = useState(false);
  const {currentUser} = useAuth();

  //EDIT - Step 4
  const deleteTodo = (id) => {
      //Check with the user to ensure they want to delete...upon the user clocking ok, make a request to the API to delete, and then we will get our todos from the API
      if(window.confirm(`Are you sure you want to delete ${props.todo.Action}`)){
        //We need to import axios into this component so we can make a request to the API
        axios.delete(`http://todoapi.abbey-outain.com/api/todo/${id}`).then(() => {props.getTodos()})
      }    
    }
    
    return (
      <div className="singleTodo col-md-6 m-3">

        <h2>{props.todo.Action}</h2>
        {/* EDIT - Step 2 */}
        {currentUser.email === 'abbeyoutain@outlook.com' && //EDIT - Step - lockdown
          <div>
            <button className="btn m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
              <FontAwesomeIcon icon={['fas', 'edit']} />
            </button>
            <button className="btn m-1 rounded" id="deleteLink" onClick={() => deleteTodo(props.todo.TodoId)}>
              <FontAwesomeIcon icon={['fas', 'trash-alt']} />
            </button>

        {/* EDIT - Step 6 */}
          {showEdit &&
          <TodoEdit
            todo={props.todo}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            getTodos={props.getTodos} />
          }
          </div>
        }          
      </div>
  )
}
