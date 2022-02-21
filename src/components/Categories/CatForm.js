import React from 'react'
import {Formik, Form, Field} from 'formik'
import catSchema from '../../Utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        //Test to make sure it logs the values in the console window.
        if(!props.category){
            //create code
            const categoryToCreate = {
                Name: values.Name,
                Description: values.Description
            }

            console.log(categoryToCreate);

            axios.post('http://todoapi.abbey-outain.com/api/categories/', categoryToCreate).then(() => {
                props.setShowCreate(false)
                props.getCategories();
            })
        }
        else{
            //edit code
            //EDIT - STEP
            const category = {
            CategoryId: props.category.CategoryId,
            Name: values.Name,
            Description: values.Description
            }
            
            axios.put('http://todoapi.abbey-outain.com/api/categories/', category).then(() => {
            props.getCategories();
            props.setShowEdit(false);
            })
        }
    }

  return (
    <div className="createCategory m-2 text-center">
    <Formik
      initialValues={{
          Name: props.category ? props.category.Name : '',
          Description: props.category ? props.category.Description : ''
      }}
      validationSchema={catSchema}
      onSubmit={values => handleSubmit(values)}>

      {({errors, touched}) => (
          <div className="container">
              <Form id="catForm" className="row text-center m-auto">
                  <div className="form-group m-1 p-1">
                      <Field name="Name" className="textBar form-control" placeholder="Name" />
                      {errors.Name && touched.Name ? (
                          <div className="text-danger">{errors.Name}</div>
                      ) : null}
                  </div>
                  <div className="form-group m-1 p-1">
                      <Field name="Description" className="textBar form-control" placeholder="Description" />
                      {errors.Description && touched.Description ? (
                          <div className="text-danger">{errors.Description}</div>
                      ) : null}
                  </div>
                  <div className="form-group m-1">
                      <button className="btn" type="submit">Submit</button>
                  </div>
              </Form>
          </div>
      )}
    </Formik>
</div>
)
}
