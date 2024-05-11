'use client'
import Link from "next/link"
import styles from "../page.module.css"
import { useParams } from "next/navigation"
import { fetchpelicula, parseNumber } from "../../data"

export default async function Page() {
    const {id} = useParams()
    const pelicula = await fetchpelicula(id)
    return (
     <div className="flex">
          <div className={`${styles.bg}`}/>
          <div className="absolute w-[300px] h-[350px] flex justify-end">
               <div>
                    <p className="text-white text-2xl px-4 py-1 bg-black bg-opacity-55">
                         {parseNumber(id)}
                    </p>
               </div>
          </div>
          <h1 className="text-white text-3xl m-6">{`${pelicula.title}: Capitulo ${parseNumber(id)}`}</h1>
     </div>
    )
  }