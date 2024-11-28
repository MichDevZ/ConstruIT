'use client'
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IUser } from "./interface"


const Table = () => {

    const [data, setData] = useState<IUser[]>()
    const [handleData, setHandleData] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const {data} = await axios.get("http://localhost:5116/api/users")
            setData(data)
        }
    
        getData();

    }, [handleData])

    const handleDelete = async (id: number) => {

        try {
            const data = await axios.delete(`http://localhost:5116/api/users/${id}`)
            
        } catch (error) {
            alert("Algo salió mal")
        }

        setHandleData(!handleData)


    }
    

  return (
    <div className="relative  overflow-x-auto">
        <div className="flex text-center justify-between mb-5 items-center">
            <h1 className="text-2xl font-bold">Usuarios</h1>
            <Link href={"/AddUser"}>
            <button className="bg-blue-600 text-white text-sm p-2">
                Agregar usuario
            </button>
            
            </Link>
        </div>

        {
            data ? (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Rut
                </th>
                <th scope="col" className="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                    Apellido
                </th>
                <th scope="col" className="px-6 py-3">
                    Fecha de nacimiento
                </th>
                <th scope="col" className="px-6 py-3">
                    Edad
                </th>
                <th scope="col" className="px-6 py-3">
                    Correo electrónico
                </th>
                <th scope="col" className="px-6 py-3">
                    Número de teléfono
                </th>
                <th scope="col" className="px-6 py-3">
                    Eliminar
                </th>
                <th scope="col" className="px-6 py-3">
                    Editar
                </th>
            </tr>
        </thead>

        <tbody >
            {
                data.map(user => (
                    
                    <tr key={user.id} className="bg-white ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {user.rut}
                        </th>
                        <td className="px-6 py-4">
                           {user.name}
                        </td>
                        <td className="px-6 py-4">
                           {user.lastName}
                        </td>
                        <td className="px-6 py-4">
                            {user.dateOfBirth}
                        </td>
                        <td className="px-6 py-4">
                        {(() => {
                            const [year, month, day] = user.dateOfBirth.split("-");
                            const birthDate = new Date(Number(year), Number(month) - 1, Number(day)); 
                            const currentDate = new Date();
                            let age = currentDate.getFullYear() - birthDate.getFullYear();
                            if (
                            currentDate.getMonth() < birthDate.getMonth() ||
                            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
                            ) {
                            age--;
                            }

                            return age;
                        })()}
                        </td>
                        <td className="px-6 py-4">
                            {user.email}
                        </td>
                        <td className="px-6 py-4">
                            {user.phone}
                        </td>
        
                        <td className="px-6 py-4">
                            <button onClick={() => handleDelete(user.id!)} className="bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-600 size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </td>
                        <td className="px-6 py-4">
                            <Link href={`/EditUser/${user.id}`}>
                            <button className="bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                </button>

                                </Link>
                         
                        </td>
                    </tr>
                
        
                    
            ))
        }
        </tbody>

    </table>

            ) : (
                <p>Cargando</p>
            )
        }
        
</div>
      
)}

export default Table
