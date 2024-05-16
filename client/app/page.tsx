import styles from './page.module.css'
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  return (
    <>
      <Image className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] hidden lg:block xl:w-96 lg:w-48 z-0"  src={'/vader.png'} width={400} height={400} alt='bg-vader'/>
      <div className={`container md:flex md:justify-between md:absolute md:top-1/2 md:left-1/2 md:translate-x-[-50%] md:translate-y-[-50%]`}>
        <Link href={'/peliculas'}>
          <div className={`${styles.bg_config} ${styles.bg_peliculas} max-w-full flex flex-col h-full justify-end cursor-pointer mx-auto my-8 md:my-0 md:mx-8`}>
            <div className='h-24 bg-gradient-to-t from-black flex'>
              <p className='text-white font-semibold text-center text-2xl m-auto'>
                Peliculas
              </p>
            </div>
          </div>
        </Link>
        <Link href={'/personajes'}>
          <div className={`${styles.bg_config} ${styles.bg_personajes} max-w-full flex flex-col h-full justify-end cursor-pointer mx-auto mb-8 md:my-0 md:mx-8`}>
            <div className='h-24 bg-gradient-to-t from-black flex'>
              <p className='text-white font-semibold text-center text-2xl m-auto'>
                  Personajes
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
