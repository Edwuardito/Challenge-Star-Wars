export default function Loading() {
    return (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] xl:w-96 lg:w-48 z-0">
            <img
                src={'/vader.png'}
                width={400}
                height={400}
                alt='bg-vader'
            />
            <p className="text-neutral-200 text-center mt-4">
                Cargando Datos...
            </p>
        </div>
    )
}