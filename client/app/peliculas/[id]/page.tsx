'use client'
import { usePathname } from "next/navigation"
import bg from "../page.module.css"
import styles from "./page.module.css"
import {parseNumber } from "../../data"
import axios from "axios"
import { useEffect, useState } from "react"

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
            const personajes = data.characters.map(async (el:string) => {
               const {data} = await axios(el)
               return data.name
            })
            setPersonajes(personajes)
          }
          getData()
      },[])
    return (
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
                    </div>
               </div>
          </div>
          <div className={`flex overflow-x-scroll overflow-y-hidden mt-8 ${styles.hidescrollbar}`}>
               {
                    personajes?.map((el,index) => (
                         <div className="mx-4 w-36 h-56" key={index}>
                              <div className={styles.bg_personajes}/>
                              <p className="text-white text-center">{el}</p>
                         </div>
                    ))
               }
          </div>
     </div>
    )
}