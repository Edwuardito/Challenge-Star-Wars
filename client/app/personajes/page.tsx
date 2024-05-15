'use client'
import styles from './page.module.css'
import { fetchAllPersonajes } from '../data'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Page () {
    let storeData:any = localStorage.getItem('data')
    if (typeof storeData === 'string') {
        storeData = JSON.parse(storeData)
    }
    const [personajesFiltrados,setPersonajesFiltrados] = useState([])
    const [personajesFiltradosParaMostrar,setPersonajesFiltradosParaMostar] = useState([])
    const [personajes,setPersonajes] = useState([])
    const [personajesParaMostrar,setPersonajesParaMostrar] = useState([])
    const [eyesColor,setEyesColor] = useState([])
    const [page,setPage] = useState(1)
    const [filters,setFilters]:any = useState([])

    const nextPage = () => {
        setPage(page + 1);
    };
    const previousPage = () => {
        setPage(page - 1);
    };
    const getPage = () => {
        if(personajesFiltrados.length && filters.length){
            console.log('kkkk')
            setPersonajesFiltradosParaMostar(personajesFiltrados.slice((page - 1) * 10, (page - 1) * 10 + 10))
        }
        else{
            // console.log(page)
            if(page !== 1){
                setPersonajesParaMostrar(personajes.flat().slice((page - 1) * 10, (page - 1) * 10 + 10))
            }else{
                setPersonajesParaMostrar(storeData.personajes.slice(0,10))
            }

        }
    }
    const filter = () => {
        const personajesFiltrados = personajes.filter((personaje:any) => { //all personajes
            const filter = filters.filter((filtro:any) => { //all filtre    
                if(Object.keys(personaje).some(key => key == 'gender' && personaje[key] == filtro || key == 'eye_color' && personaje[key] == filtro)) return personaje
            })
            if(filter.length == filters.length) return personaje
        })
        setPage(1)
        setPersonajesFiltrados(personajesFiltrados)
        if(personajesFiltrados.length > 10) setPersonajesFiltradosParaMostar(personajesFiltrados.slice(0,10))
        else setPersonajesFiltradosParaMostar(personajesFiltrados)
    }
    useEffect(() => {
        const getdata = async () => {
            if(!storeData){
                const todosLosPersonajes = await fetchAllPersonajes()
                const obtenerColoresDeOjos = todosLosPersonajes.flat().map((el:any) => {
                    if(el.eye_color !== 'unknown') {
                        return el.eye_color
                    }
                }).flat().filter((el:any) => el !== undefined)
                const uniqueColorEyes = obtenerColoresDeOjos.filter((color:string, index:number, array:any) => {
                    return array.indexOf(color) === index;
                });
                setPersonajes(todosLosPersonajes.flat())
                setPersonajesParaMostrar(todosLosPersonajes.flat().slice(0,10))
                setEyesColor(uniqueColorEyes)
                console.log('gaaaaaaaa')
                console.log(todosLosPersonajes.flat())
                localStorage.setItem('data', JSON.stringify({personajes:todosLosPersonajes.flat(),ojos:uniqueColorEyes}))

            }
            else {
                console.log(storeData.personajes)
                getPage()
                personajes && setPersonajes(storeData.personajes)
                eyesColor && setEyesColor(storeData.ojos)
            }
        }
        getdata()
        },[page])
        useEffect(() => {
            filter()
        },[filters])
        
        const addFilters = (filter:string) => {
            const searchFilter = filters.filter((el:string) => {
                if (el == filter) return el
            })
            if (searchFilter.length){
                const droppedFilter = filters.filter((el:string) => el !== filter)
                setFilters(droppedFilter)
                if(!droppedFilter.length) setPersonajesFiltradosParaMostar([])
            }else setFilters([...filters,filter])
        }
        console.log(personajesFiltrados)
        console.log(filters.filter((el:string) => 'male').length)
        console.log(filters.filter((el:string) => 'female').length)
    return (
        <div className='flex'>
            <div className='w-72 flex items-start justify-center mt-16'>
                <div className='w-72 flex flex-col justify-center items-center'>
                        <p className='text-yellow-300 mb-2'>Genero: </p>
                        <div className='flex flex-wrap gap-4 mb-4'>
                            <div className={`flex items-center justify-center w-32 h-8 bg-slate-900 rounded cursor-pointer  ${filters.includes('male')? 'border border-yellow-300 shadow shadow-yellow-600':''} `} onClick={() => addFilters('male')}>
                                <p className='text-yellow-600 text-center'>Masculino</p>
                            </div>
                            <div className={`flex items-center justify-center w-32 h-8 bg-slate-900 rounded cursor-pointer ${filters.includes('female')? 'border border-yellow-300 shadow shadow-yellow-600':''}`} onClick={() => addFilters('female')}>
                                <p className='text-yellow-600 text-center'>Femenino</p>
                            </div>
                        </div>
                        <p className='text-yellow-300 mb-2'>Color de Ojos: </p>
                        <div className='flex flex-wrap gap-4 justify-center'>
                            {
                                eyesColor?.map((el:string, index:number) => (
                                    <div key={index} className={`flex items-center justify-center w-32 h-8 bg-slate-900 rounded cursor-pointer ${filters.includes(el)? 'border border-yellow-300 shadow shadow-yellow-600':''}`} onClick={() => addFilters(el)}>
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
                    {   
                        personajesFiltradosParaMostrar.length && filters.length?
                        personajesFiltradosParaMostrar.map((el:any,index:number)=> (
                            <div key={index} className={`rounded ${styles.bg_robot} flex items-end`}>
                                <div className='m-1'>
                                    <p className='text-white font-bold'>{el.name}</p>
                                    <p className='text-slate-50 text-[0.7rem]'>{`${el.eye_color} eye and ${el.gender} gender `}</p>
                                </div>
                            </div>
                        ))
                        :
                        !filters.length? personajesParaMostrar.map((el:any,index:number)=> (
                            <div key={index} className={`rounded ${styles.bg_robot} flex items-end`}>
                                <div className='m-1'>
                                    <p className='text-white font-bold'>{el.name}</p>
                                    <p className='text-slate-50 text-[0.7rem]'>{`${el.eye_color} eye and ${el.gender} gender `}</p>
                                </div>
                            </div>
                        )):<p className='text-white text-xl'>No hay personajes con las caracteristicas que buscas</p>
                        
                    }
                </div>
                <div className='flex m-4 justify-end mr-14'>
                    {
                        page > 1 &&
                        <Link className='text-yellow-300 bg-slate-900 p-4 cursor-pointer'  href={`/personajes`} onClick={previousPage}>
                            {`<-`}
                        </Link>
                    }
                    {
                        personajesFiltrados? Math.ceil(personajesFiltrados.length/10) !== page &&
                            personajes? Math.ceil(personajes.length/10) !== page ?
                        <Link className='ml-4 text-yellow-300 bg-slate-900 p-4 cursor-pointer' href={`/personajes`} onClick={nextPage}>
                            {`->`}
                        </Link>:'':'':''
                    }
                </div>
            </div>
        </div>
    )
}