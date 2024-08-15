import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import React from 'react'
import { deleteDoc, doc  } from "firebase/firestore";
import { db } from "../config/firebase";
import AddandUpdate from "./AddandUpdate";
import useRepeat from "../Hooks/useRepeat";
import { toast } from "react-toastify";
const ContactCard = ({contact}) => {
    const {onClose ,onOpen, isOpen} = useRepeat();
    const deleteContact = async (id) => {
try {

    await deleteDoc(doc(db,"Contacts" , id));
    toast.success("Contact Deleted Sucessfully ");
} catch (error) {
   console.log(error) ;
}
    };
  return (
    <>
      <div 
              key={contact.id} className='bg-yellow-300 justify-between items-center flex rounded-lg p-2'>
              <div className='flex gap-3 '>
                <CgProfile className='text-orange-400 text-4xl' />
              <div className=''>
            <h2 className='font-medium'>{contact.name}</h2>
            <p className='text-sm '>{contact.Email}</p>
              </div>
              </div>
              <div className='flex  gap-2'>
              <FaEdit onClick={onOpen} className='text-blue-950 cursor-pointer text-3xl pb-2'/>
              <FaTrashAlt onClick={()=> deleteContact(contact.id)} className='text-purple-950  cursor-pointer text-2xl' />
              </div>
              </div>
<AddandUpdate contact={contact}
 isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
    
  )
}

export default ContactCard


