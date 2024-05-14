'use client'
import styles from './page.module.css'
import { fetchAllPersonajes } from '../data'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Page () {
    const [personajes,setPersonajes] = useState([])
    const [page,setPage] = useState(1)
    const [personajesParaMostrar,setPersonajesParaMostrar] = useState([])
    const [eyesColor,setEyesColor] = useState([])
    const handleNextandPrevious = (action:string) => {
        if(action == 'next'){
            setPersonajesParaMostrar(personajes.slice(page * 10, page * 10 + 10))
            setPage(page + 1)
            return
        }
        if (page > 0) {
            setPersonajesParaMostrar(personajes.slice((page - 1) * 10, (page - 1) * 10 + 10))
            setPage(page - 1)
        }
    }
    useEffect(() => {
        const getdata = async () => {
            const todosLosPersonajes = await fetchAllPersonajes()
            const obtenerColoresDeOjos = todosLosPersonajes.flat().map((el:any) => {
                if(el.eye_color !== 'unknown') {
                    return el.eye_color.split(', ')
                }
            }).flat().filter((el:any) => el !== undefined)
            const uniqueColorEyes = obtenerColoresDeOjos.filter((color:string, index:number, array:any) => {
                return array.indexOf(color) === index;
            });
            setPersonajes(todosLosPersonajes.flat())
            setPersonajesParaMostrar(todosLosPersonajes.flat().slice(0,10))
            setEyesColor(uniqueColorEyes)
        }
        getdata()
    },[])

    return (
        <div className='flex'>
            <div className='w-64 flex items-start justify-center mt-16'>
                <div className='w-56 flex flex-col justify-center items-center'>
                        <p className='text-yellow-300 mb-2'>Genero: </p>
                        <div className='flex flex-wrap gap-4 mb-4'>
                            <div className='flex items-center justify-center w-24 h-8 bg-slate-900 rounded cursor-pointer'>
                                <p className='text-yellow-600 text-center'>Masculino</p>
                            </div>
                            <div className='flex items-center justify-center w-24 h-8 bg-slate-900 rounded cursor-pointer'>
                                <p className='text-yellow-600 text-center'>Femenino</p>
                            </div>
                        </div>
                        <p className='text-yellow-300 mb-2'>Color de Ojos: </p>
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {
                                eyesColor?.map((el:string, index:number) => (
                                    <div key={index} className='flex items-center justify-center w-24 h-8 bg-slate-900 rounded cursor-pointer'>
                                        <p className='text-yellow-600 text-center'>
                                            {el}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                </div>
            </div>
            <div className='mt-8'>
                <div className='w-full flex flex-wrap gap-4 cursor-pointer justify-center'>
                    {personajesParaMostrar.map((el:any,index:number)=> (
                        <div key={index} className={`rounded ${styles.bg_robot} flex items-end`}>
                            <p className='text-white'>{el.name}</p>
                        </div>
                    ))}
                </div>
                <div className='flex m-4 justify-end mr-14'>
                    <div className='text-yellow-300 bg-slate-900 p-4 cursor-pointer'  onClick={() => handleNextandPrevious('previous')}>
                        {`<-`}
                    </div>
                    <div className='ml-4 text-yellow-300 bg-slate-900 p-4 cursor-pointer' onClick={() => handleNextandPrevious('next')}>
                        {`->`}
                    </div>
                </div>
            </div>
        </div>
    )
}