'use client'
import React from 'react'
import CustomButton from './CustomButton'
import Image from 'next/image'

const Hero = () => {
    const handleScroll = () => {

    }
    return (
        <div className='hero'>
            <div className='flex-1 padding-x pt-36'>
                <h1 className='hero__title'>
                    Find, book, or rent a car -- quickly and easily!
                </h1>
                <p className='hero__subtitle'>
                    Streamline your car rental experience with our effortless booking process
                </p>
                <CustomButton
                    title={'Explore Cars'}
                    containerStyles='bg-primary-blue text-white rounded-full mt-6'
                    handleClick={handleScroll}
                    textStyles=''
                    isDisabled={false}
                    rightIcon=''
                // btnType='button'
                />
            </div>
            <div className='hero__image-container'>
                <div className='hero__image'>
                    <Image src='/hero.png' alt='hero' fill priority className='object-contain' />
                </div>

                <div className='hero__image-overlay' />
            </div>
        </div>
    )
}

export default Hero