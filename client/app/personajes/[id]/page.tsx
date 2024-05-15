'use client'
import Link from "next/link"
import { useParams } from "next/navigation"
import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "@/app/components/Loader"

export default function Page() {
     const { id }:any = useParams()
     const idNum = parseInt(id)
     const [personaje,setPersonaje] = useState({
        name:'',
        eye_color:'',
        birth_year:'',
        hair_color:'',
        height:'',
        skin_color:'',
        mass:''
     })
     useEffect(() => {
         const getData = async () => {
             const {data} = await axios(`https://swapi.dev/api/people/${id}/`)
             setPersonaje(data)
            }
            getData()
        },[])
    return (
        <>
            {
                personaje.name || personaje.eye_color || personaje.birth_year || personaje.hair_color || personaje.height?
                <div>
                    <div className="flex justify-center mb-4 xs:mb-0 xs:absolute xs:bottom-0 xs:right-1/2 xs:translate-y-[-50%]  xs:translate-x-[50%] cursor-pointer">
                        <div className="flex items-center">
                            {
                                id == '1'? '':
                                <Link className='text-yellow-300 bg-slate-900 p-2 cursor-pointer mx-2'  href={`/personajes/${idNum - 1}`}>
                                    {`<-`}
                                </Link>
                            }
                            {
                                <Link href={`/personajes`}>
                                    <p className="text-white bg-amber-500 font-bold p-2 text-center rounded w-16" >
                                        Salir
                                    </p>
                                </Link>
                            }
                            {
                                id == '82'? '':
                                <Link className='text-yellow-300 bg-slate-900 p-2 cursor-pointer mx-2'  href={`/personajes/${idNum + 1}`}>
                                            {`->`}
                                </Link>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center xs:flex-row  xs:absolute xs:top-1/2 xs:left-1/2 xs:translate-x-[-50%] xs:translate-y-[-50%]">
                        <div className={` ${styles.bg_luke} w-[200px] h-[250px] sm:w-[300px] sm:h-[350px] rounded rounded-r-none`}/>
                        <div className="w-[200px] xs:h-[250px] sm:w-[250px] sm:h-[350px] xs:bg-black rounded rounded-l-none">
                            <p className="text-white text-center font-bold text-xl mt-4">
                                {personaje.name}
                            </p>
                            <div>
                                {
                                    personaje.eye_color == 'n/a' || personaje.eye_color == 'none' || personaje.eye_color == 'unknown' ? '':
                                    <p className="text-gray-300 xs:text-center  my-2 sm:my-4">
                                        {`Eye: ${personaje.eye_color}`}
                                    </p>
                                }
                                {
                                    personaje.birth_year == 'n/a' || personaje.birth_year == 'none' || personaje.birth_year == 'unknown' ? '':
                                    <p className="text-gray-300 xs:text-center my-2 sm:my-4">
                                        {`Birthyear: ${personaje.birth_year}`}
                                    </p>
                                }
                                {
                                    personaje.hair_color == 'n/a' || personaje.hair_color == 'none' || personaje.hair_color == 'unknown' ? '':
                                    <p className="text-gray-300 xs:text-center my-2 sm:my-4">
                                        {`Hair: ${personaje.hair_color}`}
                                    </p>
                                }
                                {
                                    personaje.height == 'n/a' || personaje.height == 'none' || personaje.height == 'unknown' ? '':
                                    <p className="text-gray-300 xs:text-center my-2 sm:my-4">
                                        {`Height: ${personaje.height}cm`}
                                    </p>
                                }
                                {
                                    personaje.skin_color == 'n/a' || personaje.skin_color == 'none' || personaje.skin_color == 'unknown' ? '':
                                    <p className="text-gray-300 xs:text-center my-2 sm:my-4">
                                        {`Skin: ${personaje.skin_color}`}
                                    </p>
                                }
                                {
                                    personaje.mass == 'n/a' || personaje.mass == 'none' || personaje.mass == 'unknown' ? '':
                                    <p className="text-gray-300 xs:text-center my-2 sm:my-4">
                                        {`Mass: ${personaje.mass}`}
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>:<Loader/>
            }
        </>
    )
}