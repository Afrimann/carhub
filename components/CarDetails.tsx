'use client'

import { CarProps } from '@/types'
import React from 'react'
import Image from 'next/image'
import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'

interface CarDetailsProps {
    car: CarProps
    closeModal: () => void
    isOpen: boolean
}
const CarDetails = ({ car, closeModal, isOpen }: CarDetailsProps) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </TransitionChild>
                    <div className='overflow-y-auto fixed inset-0 '>
                        <div className='flex min-h-full items-center justify-center text-center p-4 '>
                            <TransitionChild
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <DialogPanel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                                    <button
                                        type='button'
                                        className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                                        onClick={closeModal}

                                    >
                                        <Image 
                                        src='/close.svg' 
                                        alt='close icon' 
                                        width={20}
                                        height={20}
                                        className='object-contain'/>
                                    </button>

                                    <div className='flex-1 flex flex-col gap-3'>
                                        <div className='relative h-40 w-full bg-pattern bg-cover bg-center rounded-lg'>
                                        <Image src='/hero.png' alt='Car model' fill priority className='object-contain'/>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className='h-24 flex-1 relative w-full rounded-lg bg-primary-blue-100 '>
                                            <Image src='/hero.png' alt='Car model' fill priority className='object-contain'/>
                                            </div>
                                            <div className='h-24 flex-1 relative w-full rounded-lg bg-primary-blue-100 '>
                                            <Image src='/hero.png' alt='Car model' fill priority className='object-contain'/>
                                            </div>
                                            <div className='h-24 flex-1 relative w-full rounded-lg bg-primary-blue-100 '>
                                            <Image src='/hero.png' alt='Car model' fill priority className='object-contain'/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex-1 flex flex-col gap-2'>
                                        <h2 className='text-xl capitalize font-semibold'>
                                            {car.make} {car.model}
                                        </h2>

                                        <div className='mt-3 flex flex-wrap gap-4'>
                                            {Object.entries(car).map(([key,value]) => (
                                                <div className='flex justify-between w-full gap-5 text-right' key={key}>
                                                    <h4 className='text-grey capitalize '>{key.split('_').join(' ')}</h4>
                                                    <p className='font-semibold text-black-100'>{value}</p>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default CarDetails