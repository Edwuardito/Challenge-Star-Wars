import Link from "next/link"
import { fetchpeliculas } from "../data"
import styles from "./page.module.css"
export default async function Page () {
    const peliculas = await fetchpeliculas()
    return (
        <div>
                <div className="flex flex-wrap w-4/5 justify-around text-white gap-4  mx-auto">
                    {
                        peliculas?.map((pelicula:any) => (
                            <Link className="cursor-pointer" href={`/peliculas/${pelicula.episode_id}`}>
                                <div className={`${styles.bg} z-10`}/>
                                <div className="flex absolute bg-black bg-opacity-50 w-[300px] h-[350px] z-99 translate-y-[-100%]">
                                    <p className="text-4xl m-auto">
                                        {pelicula.episode_id == 1? 'I': pelicula.episode_id == 2? 'II':pelicula.episode_id == 3? 'III':pelicula.episode_id == 4? 'IV':pelicula.episode_id == 5? 'V':'VI'}
                                    </p>
                                </div>
                                <p className="text-center cursor-pointer">
                                    {pelicula.title}
                                </p>
                            </Link>
                        ))
                    }
                </div>
        </div>
    )
}