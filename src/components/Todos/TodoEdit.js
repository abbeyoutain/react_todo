import React from 'react'
import {Modal} from 'react-bootstrap'
import TodoForm from './TodoForm'

//EDIT - Step 5
export default function TodoEdit(props) {
  return (
      <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header closeButton>
                <h3>Editing {props.todo.Action}</h3>
            </Modal.Header>
            <Modal.Body>
                <TodoForm
                todo={props.todo}
                setShowEdit={props.setShowEdit}
                getTodos={props.getTodos}
                />
            </Modal.Body>
      </Modal>
  )
}
