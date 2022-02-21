//Step 1 - Read - create component, pay attention to the imports
import React, {useState, useEffect} from 'react';
import { Card, Container } from 'react-bootstrap';
import sampleTodos from './sampleTodos';
import SingleTodo from './SingleTodo';
import axios from 'axios'
import './Todos.css'

//CREATE
import TodoCreate from './TodoCreate';
import { useAuth } from '../../contexts/AuthContext'

export default function Todos() {

  //Step 2 - Read - create the hook
  const [todos, setTodos] = useState(sampleTodos);

  //CREATE
  const [showCreate, setShowCreate] = useState(false);
  const {currentUser} = useAuth();

  //Step 4 - Read - inject the data into the component
  const getTodos = () => {
    axios.get('http://todoapi.abbey-outain.com/api/todo/').then(response => {
      setTodos(response.data)
    })
  }

  useEffect(() => {
    getTodos();
  }, []);

  //Step 3 - Read - create the UI
  return (
      <section className="todos">
        <Container>
          <Card className="m-2 text-center">
            <Card.Header>
              <h1>To-Dos</h1>
            </Card.Header>
          </Card>
        </Container>

        {/* CREATE - Step */}
        {currentUser.email === 'abbeyoutain@outlook.com' &&
          <div className="p-2 mb-3 text-center">
            <button className="btn" onClick={() => setShowCreate(!showCreate)}>
              {!showCreate ? 'Create New Todo' : 'Close Form'}
            </button>
          <div className="createContainer">
            {showCreate &&
            <TodoCreate 
              getTodos={getTodos}
              setShowCreate={setShowCreate}
            />
            }
          </div>
          </div>
        }

        <Container>
          <article className="todoGallery row justify-content-center">
            {/* EDIT - Step 1 */}
            {todos.map(x =>
            <SingleTodo
              key={x.TodoId}
              todo={x}
              getTodos={getTodos} />
            )}
          </article>
        </Container>
      </section>
  );
}
