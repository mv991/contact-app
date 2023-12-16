import React, { useEffect, useState } from "react";
import {  getStates, getCities } from "../api/api";
import { countries } from "../countries";
import axios from "axios";
export default function Modal({
  showModal,
  setShowModal,
  setContacts,
  modalData,
  setModalData,
  contacts
}) {
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [country, setCountry] = useState(null);
 
  useEffect(() => {
    setStates(null)
    const getData = async() => {
      if(modalData) {
        setCountry(modalData.country)
        const res = await getStates(modalData.country);
        setStates([...res]);
        const res2 = await getCities(modalData.state,modalData.country);
        setCities(res2)
        setLoading(false)
     }
     else {
      setLoading(false)
     }
    }
    getData();
  
  }, [modalData]);
  async function handleChange(value) {
      const res = await getCities(value,country);
      setCities(res);
   
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.firstName.value,"fortsname")
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      city: e.target.city.value,
      state: e.target.state.value,
      country: e.target.country.value,
      mobile: e.target.mobile.value,
    };
    if (modalData) {
      
      await axios
        .put(`http://localhost:8000/updateContact`, {formData:formData,id:modalData._id})
        .then((res) => {
         const newContacts = contacts.map((c) => {
             if(c._id===modalData._id) {
              return res.data.updatedContact;
             }
             return c;

           })
           setContacts(newContacts)
        })
        .catch((e) => console.log(e));
       
    } else {
      await axios
        .post(`http://localhost:8000/addContact`, formData)
         .then((res) => setContacts((prev) => ([...prev,res.data.contact])))
        .catch((e) => console.log(e));
    }
    setShowModal(false);
  }
  return (
    <>
      {showModal && !loading ? (
        <>
          <div className="modal justify-center items-center flex overflow-x-hidden overflow-y-scroll inset-0 z-50 rounded-lg w-4/5 shadow-lg fixed md:w-3/5 lg:w-2/5 md:h-3/5 p-4 flex-col bg-white  ">
            <form onSubmit={(e) => handleSubmit(e)} className="h-full m-12">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Add Contact
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          defaultValue={modalData && modalData.firstName}
                          type="text"
                          name="firstName"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="lastName"
                          id="last-name"
                          autoComplete="family-name"
                          className="block p-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                          defaultValue={modalData && modalData.lastName}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block p-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                          defaultValue={modalData && modalData.email}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          onChange={ async(e) => {
                                 setCountry(e.target.value)
                                 const state =  await getStates(e.target.value);
                                 setStates(state);
                                 setCities(null)        
                          }}
                          defaultValue={modalData && modalData.country}
                        >
                          {countries?.map((c, index) => {
                            return (
                              <option key={index} value={c.name}>
                                {c.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <select
                          id="state"
                          name="state"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          onChange={(e) => {
                           handleChange(e.target.value)
                          }}
                          required
                          defaultValue={modalData && modalData.state}
                        >
                          {states?.map((s, index) => {
                            return (
                              <option key={index} value={s.name}>
                                {s.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <select
                          id="city"
                          name="city"
                          autoComplete="city-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          defaultValue = {modalData && modalData.city}
                        >
                          {cities?.map((c, index) => {
                            return (
                              <option key={index} value={c} >
                                {c}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Mobile
                      </label>
                      <div className="mt-2">
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          autoComplete="mobile"
                          className="block p-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                          defaultValue={modalData && modalData.mobile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-x-6 pb-6 pt-2">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => {
                    setShowModal(false);
                    setStates(null);
                    setCities(null);
                    setModalData(null)
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : 
      <>
      <div role="status" className="spinner inset-0 z-50 flex items-center justify-center fixed ">
    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
   
</div>
<div className="opacity-25 fixed inset-0 z-40 bg-black w-full h-full"></div>
</>
      }
    </>
  );
}
