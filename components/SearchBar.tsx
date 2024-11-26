'use client'

import Image from "next/image"
import SearchManufacturer from "./SearchManufacturer"
import { useState } from "react"
import React from "react"
import { useRouter } from "next/navigation"

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const router = useRouter()

    const SearchButton = ({ otherclasses }: { otherclasses: string }) => (

        <button
            type="submit"
            className={`-ml-12 z-10 ${otherclasses}`}
        >
            <Image
                src='/magnifying-glass.svg'
                alt="search"
                width={40}
                height={40}
                className="object-contain"
            />
        </button>

    )


    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search)

        model ? searchParams.set('model', model) : searchParams.delete('model')
        manufacturer ? searchParams.set('manufacturer', manufacturer) : searchParams.delete('manufacturer')

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`

        router.push(newPathName)
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

       if (manufacturer === '') {
        return alert('Please select a manufacturer')
       }
       if (model === '') {
        return alert('Please choose a model')
       }
        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setManufacturer={setManufacturer}
                />

                <SearchButton otherclasses="sm:hidden" />
            </div>
            <div className="searchbar__item">
                <Image src='/model-icon.png' alt="car model" width={25} height={25} className="absolute w-[20px] h-[20px]  ml-4" />
                <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Tiguan" className="searchbar__input" />
                <SearchButton otherclasses="sm:hidden" />
                <SearchButton otherclasses="max-sm:hidden" />
            </div>
        </form>
    )
}

export default SearchBar