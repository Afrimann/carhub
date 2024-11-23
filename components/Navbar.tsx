import Link from 'next/link'
import Image from 'next/image'
import CustomButton from './CustomButton'

const Navbar = () => {
    return (
        <header className='w-full absolute z-10'>
            <nav className='max-w-[1440px] flex justify-between mx-auto sm:px-16 px-6 py-4'>
                <Link className='flex justify-center items-center' href='/'>
                    <Image
                        src='/logo.svg'
                        alt='Carhub Logo'
                        width={118}
                        height={18}
                        className='object-contain'
                    />
                </Link>

                <CustomButton
                    title='Sign In'
                    btnType='button'
                    containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
                />
            </nav>
        </header>
    )
}

export default Navbar