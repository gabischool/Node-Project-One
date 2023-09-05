import { Link, useLocation, useNavigate } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup'
import { useAddNewUserMutation, useUpdateExistUserMutation } from "../redux_toolkit/slices/Users";
const Add_Info = () => {

  const states = useLocation().state;

  const [value, setValue] = useState(states?.bio ||'');

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  } 
  const Navigate = useNavigate();

  const [ addNewUser ] = useAddNewUserMutation();
  const [ updateExistUser ] = useUpdateExistUserMutation();

  const initialValue = {
    name : '' || states?.name
  }

  const validationSchema = Yup.object({
    name : Yup.string().required('User Name is required')
  })

  const handleSubmit = (values , { resetForm }) => {
    const { name } = values;
    let bio = getText(value)
    const id = states?.id;
    if(!id){
        addNewUser({ name , bio }).then(() => {
          Navigate('/');
        }).catch((error)=>{
          console.log(error);
        })
    }else{
      updateExistUser( {id , name , bio }).then(() => {
        Navigate('/');
      }).catch((error)=>{
        console.log(error);
      })
    }
    resetForm();
  }
  return (
	<div className="md:w-[73%] mx-auto p-5">
    <Link className="text-3xl text-blue-500" to='/'>Home <span> / </span> <span className="text-black"> Add New User </span></Link>
    <div className="mt-10">
      <Formik 
      enableReinitialize
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
        <Form className="flex flex-col justify-start items-start gap-5">
            <Field className="p-3 w-full rounded shadow" type='text' placeholder = "Enter Name" name='name' />
            <ErrorMessage component="div" name="name" className="text-red-500"/>
            <ReactQuill theme="snow" className="w-full h-40" value={value} onChange={setValue} />
            <button type="submit" className="w-full p-3 rounded bg-blue-500 text-white mt-16">submit</button>
        </Form>
      </Formik>
    </div>
  </div>
  )
}

export default Add_Info