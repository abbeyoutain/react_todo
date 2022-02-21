//npm install yup
//npm install formik
import * as Yup from 'yup' //import everything from Yup and give it an alias of Yup

const catSchema = Yup.object().shape({
    Name: Yup.string().max(50, 'Max 50 Characters').required('*Required'),
    Description: Yup.string().max(100, 'Max 100 Characters')
})

const todoSchema = Yup.object().shape({
    Action: Yup.string().required('*Required'),
    CategoryId: Yup.number().required()
})

//Above, double check if bool is the correct word here

export {todoSchema};
export default catSchema;