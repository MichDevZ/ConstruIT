'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { formatRUT, isValidRut } from '../../utils/formatRut'
import { IUser } from '../../interface'
import axios from 'axios'
import { useParams } from "next/navigation";


const page = () => {

    const params: any = useParams(); 
    const {id} = params;

    useEffect(() => {
        
        const getUser = async (id: number) => {
            const {data} = await axios.get(`http://localhost:5116/api/users/${id}`)
            setFormData(data)
        }

        getUser(Number(id));

    }, [])
    

    const [formData, setFormData] = useState<IUser>()

    const [validations, setvalidations] = useState<string>()
    const [success, setSuccess] = useState(false)

    

    const onSubmit = async (user: IUser) => {

        if (!isValidRut(user.rut)) {
            return setvalidations("Ingrese un rut válido")
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(user.name)) {
            return setvalidations("Ingrese un nombre válido")
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(user.lastName)) {
            return setvalidations("Ingrese un apellido válido")
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(user.dateOfBirth) 
        || Number(user.dateOfBirth.split("-")[0]) > new Date().getFullYear()
        ) {
            return setvalidations("Ingrese una fecha de nacimiento válida")
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            return setvalidations("Ingrese un correo electrónico válido")
        }

        if (user.phone.length != 9 ) {
            return setvalidations("Ingrese un teléfono válido")
        }

        try {
            const data = await axios.put(`http://localhost:5116/api/users/${id}`, {
                rut: user.rut,
                name: user.name,
                lastName: user.lastName,
                dateOfBirth: user.dateOfBirth,
                email: user.email,
                phone: user.phone
            })
            if (data) {
                setvalidations("")
                setSuccess(true)

            }
        } catch (error) {
            setvalidations("Algo salió mal")
            
        }
    }


  return (
    <>
        {
            formData ? (
            <>

<div className={`bg-red-500 text-white text-center mb-5 p-2 ${validations ? "" : "hidden"} `}>
      <p>{validations}</p>
  </div>
    <div className={`bg-green-500 text-white text-center mb-5 p-2 ${success ? '' : 'hidden'}`}>
        <p>Usuario actualizado correctamente</p>
    </div>
    <div className="bg-gray-100 p-10">
    <div>
      <h1 className="text-2xl text-center font-bold  p-2  mb-5 ">Ingresar nuevo usuario</h1>
    </div>
  <div className="w-72 mx-auto">
    <div className="relative z-0 w-full mb-5 group">
        <input defaultValue={formData?.rut} maxLength={12} disabled  type="text" name="floating_email" id="floating_email" className={`${!isValidRut(formData.rut) ? "border-red-500": "border-gray-300" }  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RUT</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input value={formData?.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" name="floating_email" id="floating_email" className={`${!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.name) ? "border-red-500": "border-gray-300" }  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
        
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input value={formData?.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}  type="text" name="floating_email" id="floating_email" className={`${!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.lastName) ? "border-red-500": "border-gray-300" }  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input value={formData?.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} type="date" name="floating_email" id="floating_email" className={`${!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth) 
        || Number(formData.dateOfBirth.split("-")[0]) > new Date().getFullYear() ? "border-red-500": "border-gray-300" }  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha de nacimiento</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input  value={formData?.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" name="floating_password" id="floating_password" className={`${!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "border-red-500": "border-gray-300" }  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo electrónico</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input value={formData?.phone} maxLength={9} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, "")})} type="text" name="repeat_password" id="floating_repeat_password" className={`${formData.phone.length != 9  ? "border-red-500": "border-gray-300" }  block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " required />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Teléfono</label>
    </div>
    <div className="grid md:grid-cols-1 md:gap-6">
   
  
    </div>
  
    <div className="text-center">
    <button onClick={() => onSubmit(formData)}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear nuevo usuario</button>
    </div>
    <div className="text-center my-5">
    <Link href={'/'}>
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Volver</button>
    </Link>
    </div>
  </div>
  </div>

  </>
            ) : <h2>Cargando</h2>
        }

</>


  )
}

export default page
