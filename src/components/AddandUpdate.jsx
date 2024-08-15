import React from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import Modal from './Modal';
import { addDoc, collection, doc , updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
const contactSchemaValidation  = Yup.object().shape({
    name:Yup.string().required("Name is required"),
    Email : Yup.string().email("Invalid Email").required("email is required")
});
const AddandUpdate = ({isOpen,onClose,isUpdate, contact}) => {

    const addContact =  async (contact) =>{
        try {
            const contactRef = collection(db,"Contacts");
          await addDoc(contactRef,contact)
          onClose();
          toast.success("Contact Added Sucessfully")
        } catch (error) {
            console.log(error);
        }

    };
    const updateContact =  async (contact,id) =>{
        try {
            const contactRef = doc(db,"Contacts",id);
          await updateDoc(contactRef,contact)

          onClose();
          toast.success("Contact Updated Sucessfully")
        } catch (error) {
            console.log(error);
        }

    };
  return (
    <div>
             <Modal  onClose={onClose} isOpen={isOpen}>
             <Formik
            validationSchema={contactSchemaValidation} 
             initialValues={ isUpdate ?
                 {
                name:contact.name,
                Email:contact.Email,
             } :{
                name:"",
                Email:"",
             }
            }
             onSubmit={(values) => {
                console.log(values);
                isUpdate ?
                updateContact(values,contact.id) :
                addContact(values);
            
             }}
             >
                <Form className="flex flex-col gap-4">
                    <div className="flex gap-1 flex-col">
                    <label htmlFor='name'>Name: </label>
                    <Field name="name"className="border-2 h-10  "/>
                    <div className='text-red-500 text-xs'>
<ErrorMessage name="name"/>
                    </div>
                    </div>
                    <div className="flex , flex-col gap-1">
                    <label htmlFor='email'>Email: </label>
                    <Field  name="Email" className="border-2 h-10"/>
                    <div className='text-red-500 text-xs'>
<ErrorMessage name ="Email"/>
                    </div>
                    </div>
                    <button className='bg-orange-400 px-3 py-1 rounded-xl border self-end'>{isUpdate ? 'Update': "Add"} Contact</button>
                </Form>
             </Formik>
            
                </Modal>
              
    </div>
  );
};

export default AddandUpdate
