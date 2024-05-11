interface Pelicula {
    title:string;
    episode_id:number;
}

export async function fetchpeliculas() {
    try {
        const res = await fetch('https://swapi.dev/api/films')
        const json = await res.json()
        const peliculasOrdenadas = json.results.sort((a:Pelicula,b:Pelicula) => a.episode_id - b.episode_id)
        return peliculasOrdenadas
    } catch (error) {
        console.log(error)
    }
}
export async function fetchpelicula(id:any) {
    try {
        const res = await fetch(`https://swapi.dev/api/films/${id}`)
        const json = await res.json()
        return json
    } catch (error) {
        console.log(error)
    }
}
export  function parseNumber(id:any) {
    return id == '1' ? 'I': id == '2'? 'II':id == '3'? 'III':id == '4'? 'IV':id == '5'? 'V':'VI'
}
