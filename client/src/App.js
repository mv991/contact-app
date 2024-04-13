import Navbar from "./components/Navbar";
import React,{useEffect, useState} from "react";
import Modal from "./components/Modal";
import axios from "axios";
function App() {
   const [showModal, setShowModal] = useState(false);
   const [modalData, setModalData] = useState(null);
   const [contacts, setContacts] = useState([]);
   const [loading, setLoading] = useState(true);

   const getContacts =  () => {
    axios
    .get(`https://contact-app-rshq.onrender.com/getContacts`)
    .then((res) => setContacts(res.data.contacts))
    .then(res => setLoading(false))  
   }
   useEffect(() => {
     getContacts();
   },[])
  
 async function deleteContact(id) {
   await axios.delete(`https://contact-app-rshq.onrender.com/deleteContact/${id}`)
   const newContacts = contacts.filter(c => c._id!==id);
   setContacts(newContacts)
 }

   function handleChange(query) {
    axios
      .get(`https://contact-app-rshq.onrender.com/searchContacts?query=${query}`)
      .then((res) => setContacts([...res.data.result]))

   
   }
  return (
    <div className="main-card md:w-[95%] w-[92%]  bg-white mx-auto rounded-3xl min-h-[90vh] h-fit my-12 shadow-md font-mono">
    {loading && <div className="flex items-center justify-center text-center">Loading.....</div>}
    {showModal && <Modal showModal={showModal} setShowModal={setShowModal} contacts = {contacts} setContacts={setContacts} modalData={modalData} setModalData={setModalData} />}
    <Navbar/>
    <div className="flex">
    <div className="md:w-6/6 w-full flex flex-col sm:mx-6 mt-4">
    <h1 className="font-mono font-semibold sm:text-3xl text-xl text-center">Contact Management App</h1>
      <div className="flex sm:flex-row flex-col w-full justify-center sm:justify-between sm:p-0 px-3">
           <input placeholder="Search for a Contact..." onChange={(e) => handleChange(e.target.value)} className="p-2 bg-[#fafafa] rounded-3xl my-3 px-4 sm:w-[300px] w-full "/>
            <button onClick={() => setShowModal(true)} className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New</button>
        
      </div>
      <div className="bg-gray-100  w-full hidden md:grid md:grid-cols-[15%,15%,18%,15%,15%,15%,7%]   grid-cols-[30%,30%,30%] gap-y-4 h-fit my-4 py-3 rounded-md text-center">
          <div><h4 >Name</h4></div>
          <div> <h4 >Mobile</h4></div>
          <div> <h4 >Email</h4></div>
          <div> <h4>City</h4></div>
          <div> <h4>State</h4></div>
          <div> <h4>Country</h4></div>
      </div>
      
      {
        contacts.length>0 && contacts.map((c,index) => {
          return (
            <div className="bg-gray-100 grid md:grid-cols-[10%,20%,18%,15%,15%,15%,7%] sm:grid-cols-[30%,30%,39%] sm:justify-start sm:pl-2 w-full h-fit my-4 py-3 rounded-md text-center overflow-hidden items-center" key={index}>
               <h4 className="break-word">{c.firstName} {c.lastName}</h4>
               <h4 className=" break-all ">{c.mobile}</h4>
               <h4 className=" break-all ">{c.email}</h4>
               <h4 className="break-word">{c.city}</h4>
               <h4 className="break-word">{c.state}</h4>
               <h4 className="break-word">{c.country}</h4>
               <div className="flex   justify-self-end edit-delete">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer"
                 onClick={() =>{setShowModal(true); setModalData(c) }}
                 >
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => deleteContact(c._id)}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

               </div>
                
            </div>
          )
        })
      }
      
    </div>
    </div>
    </div>
  );
}

export default App;
