import React, {useState, useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
import {todoSchema} from '../../Utilities/validationSchema'
import axios from 'axios'
import './Todos.css'

export default function TodoForm(props) {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get('http://todoapi.abbey-outain.com/api/todo/').then(response => {
          setCategories(response.data)
        })
      }

      const handleSubmit = (values) => {
        console.table(values)

        if(!props.todo){
            //Assemble a temporary todo object for the HTTP request
            const todoToCreate = {
                Action: values.Action,
                Done: false,
                CategoryId: values.CategoryId
            }
            //POST to the API, then call to props.getTodos and props.setShowCreated to close the form.
            axios.post('http://todoapi.abbey-outain.com/api/todo/', todoToCreate).then(() => {
                props.getTodos(); //This will request a GET http request to our API...get all the todos again.
                props.setShowCreate(false);
            })
        }
        else {
            console.log('Edit Mode');
            //EDIT - Step 8
            const todoToEdit = {
                TodoId: props.todo.TodoId,
                Action: values.Action,
                CategoryId: values.CategoryId
            }
            axios.put('http://todoapi.abbey-outain.com/api/todo/', todoToEdit).then(() => {
                //get todos
                props.getTodos();
                //close the edit form
                props.setShowEdit(false);
            })
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

  return (
      <Formik
      //EDIT - Step 7 add ternary operators to values
      initialValues={{
          Action: props.todo ? props.todo.Action : '',
          Done: '',
          CategoryId: props.todo ? props.todo.CategoryId : ''
      }}
      validationSchema={todoSchema}
      onSubmit={(values) => handleSubmit(values)}
      >

        {({ errors, touched}) => (
          <Form id="todoForm">
              <div className="form-group m-3">
                  <Field name="Action" className="textBar form-control" placeholder="Action" />
                  {errors.Action && touched.Action ?
                  (
                      <div className="text-danger">{errors.Action}</div>
                  ) : null}
              </div>
              {/* TODO DROP DOWN IS FUNCTIONAL -- CATEGORIES NOT SHOWING UP*/}
              <div className="form-group m-3">
                      <Field as="select" name="CategoryId" className="textBar form-control">
                          <option value="0" disabled>[--Please Choose--]</option>
                          {categories.map(cat =>
                            <option key={cat.CategoryId} value={cat.CategoryId}>{cat.Name}</option>
                            )}
                      </Field>
                </div>
                <div className="form-group m-3">
                      <button type="submit" className="btn m-3">Submit To-Do</button>
                </div>
          </Form>
      )}

      </Formik>
  )
}
