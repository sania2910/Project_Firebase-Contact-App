import React from 'react'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState , useEffect } from 'react';
import { collection, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddandUpdate from './components/AddandUpdate';
import useRepeat from './Hooks/useRepeat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';
const App = () => {
  const [contacts, setContacts] = useState([]);
  const {onClose ,onOpen, isOpen} = useRepeat();
  useEffect(() => {
    const getContacts = async  () => {
try {
  const  contactsRef =   collection(db, "Contacts");
  onSnapshot(contactsRef,(snapshot)=>{
    const contactLists = snapshot.docs.map((doc)=> {
      return {
        id: doc.id,
        ...doc.data(),
      };
        });
      setContacts(contactLists);
      return contactLists;
  });
 
}catch (error) {
  console.log(error);
}
    };
    getContacts();
  }, []);
  const filterContacts = (e) => {
    const value = e.target.value;
      const  contactsRef =   collection(db, "Contacts");
      onSnapshot(contactsRef,(snapshot)=>{
        const contactLists = snapshot.docs.map((doc)=> {
          return {
            id: doc.id,
            ...doc.data(),
          };
            });
            const filteredContacts = contactLists.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));
          setContacts(filteredContacts);
          return filteredContacts;
      });
     
  };
  return (<>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
            onChange={filterContacts}
              type="text"
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <AiFillPlusCircle
           onClick={onOpen}
            className="cursor-pointer text-5xl text-white"
          />
        </div>
        <div className='mt-4 gap-3 flex flex-col'>
          {
       contacts.length  <= 0 ? (
        <NotFoundContact/>
       )   :  contacts.map((contact)=>(
              <ContactCard key={contact.id} contact={contact}/>
            ))
          }
        </div>
    </div>
    <ToastContainer position="bottom-center" />
    <AddandUpdate  onClose={onClose} isOpen={isOpen} ></AddandUpdate>
  
    </>
  )
}

export default App
