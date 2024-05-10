import styles from './Landing.module.css'
const Home = () => {
  return (
    <div className=' w-full flex justify-between'>
      <div className={`${styles.bg_config} ${styles.bg_peliculas} flex flex-col h-full justify-end cursor-pointer`}>
        <div className='text-white w-full text-center text-2xl bg-black p-2'>
          Peliculas
        </div>
      </div>
      <div className={`${styles.bg_config} ${styles.bg_personajes} flex flex-col h-full justify-end cursor-pointer`}>
        <div className='text-white w-full text-center text-2xl bg-black p-2'>
          Personajes
        </div>
      </div>
    </div>
  )
}

export default Home