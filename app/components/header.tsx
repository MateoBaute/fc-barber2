import Link from "next/link";

export default function Header(){
    return(
        <header className="w-full items-center bg-white dark:bg-black">
            <nav className="border-b-2 y border-yellow-400 m-auto flex max-w-6xl justify-between items-center py-4 px-16 bg-white dark:bg-black">
                <div className="cursor-pointer text-2xl font-bold text-gray-800 dark:text-white">
                    FC Barber
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        Inicio
                    </Link>
                    <Link href="/servicios" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        Servicios
                    </Link>
                    <Link href="/contacto" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        Contacto 
                    </Link>
                    <Link href="/reservas" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        Reservar 
                    </Link>
                </div>
            </nav>
        </header>
    )
}
