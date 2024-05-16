'use client'
import { usePathname } from "next/navigation"
import bg from "../page.module.css"
import styles from "./page.module.css"
import {parseNumber } from "../../data"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"
import Loader from "@/app/components/Loader"

export default function Page() {
     const id = usePathname().split('').pop()
     const [pelicula,setPelicula] = useState({
          episode_id:'',
          title:'',
          director:''
     })
     const [personajes,setPersonajes] = useState([])
     useEffect(() => {
          const getData = async () => {
            const {data} = await axios(`https://swapi.dev/api/films/${id}/`)
            setPelicula(data)
            const personajesPromise = data.characters.map(async (el:string) => {
               const {data} = await axios(el)
               return data
            })
            const characters:any = await Promise.all(personajesPromise);
            setPersonajes(characters)
          }
          getData()
      },[])
    return (
     <div>
          {
               pelicula.title && personajes.length ?
               <div>
                    <div className="flex justify-center sm:block">
                         <div className="sm:flex sm:flex-row mx-4">
                              <div className={`${bg.bg}`}/>
                              <div className="absolute translate-y-[-100%] sm:translate-y-0 w-[300px] h-[350px] flex justify-end">
                                   <div>
                                        <p className="text-white text-2xl px-4 py-1 bg-black bg-opacity-55">
                                             {parseNumber(pelicula?.episode_id)}
                                        </p>
                                        </div>
                              </div>
                              <div>
                                   <h1 className="text-white text-lg md:text-xl lg:text-3xl sm:ml-6 mt-2 sm:mt-0">{`${pelicula.title}: Capitulo ${parseNumber(pelicula.episode_id)}`}</h1>
                                   <p className=" text-slate-200 text-sm md:text-l lg:text-xl sm:m-6">{`Director: ${pelicula.director}`}</p>
                                   <div className="flex justify-center sm:justify-start">
                                        <Link href={`/peliculas`}>
                                             <p className="text-white bg-amber-500 font-bold p-2 text-center rounded w-16 sm:ml-6 mt-4 md:mt-0" >
                                                  Salir
                                             </p>
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className={`flex overflow-x-scroll overflow-y-hidden mt-8 ${styles.hidescrollbar}`}>
                         {
                              personajes?.map((el:any,index) => (
                                   <div key={index}>
                                        <Link href={`/personajes/${el.url.split('/')[el.url.split('/').length - 2]}`}>
                                             <div className="mx-4 w-36 h-56">
                                                  <div className={styles.bg_personajes}/>
                                                  <p className="text-white text-center">{el.name}</p>
                                             </div>
                                        </Link>
                                   </div>
                              ))
                         }
                    </div>
               </div>:<Loader/>
          }
     </div>
    )
}