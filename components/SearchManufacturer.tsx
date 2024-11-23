'use client'
import Image from 'next/image'
import { SearchManufacturerProps } from '@/types'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { manufacturers } from '@/constants'

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('')
  const filteredManufacturers = query === '' ? manufacturers : manufacturers.filter((item) => (
    item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
  ))
  return (
    <div>
      {/* prent element for the search function */}
      <Combobox
        value={manufacturer}
        onChange={setManufacturer}
      >
        <div className='relative w-full'>
          <ComboboxButton className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='Car Logo' />
          </ComboboxButton>
          {/* field for search query */}
          <ComboboxInput
            className='search-manufacturer__input'
            placeholder='Volkswagen'
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* animation set */}
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            {/* field for mapped from the set of manufacturers available */}
            <ComboboxOptions>
              {filteredManufacturers.length === 0 && query !== '' ? (
                <ComboboxOption
                  value={query}
                  className='search-manufacturer__option'
                >
                  {/* error message */}
                  Cannot find "{query}", try again

                </ComboboxOption>
              ) :
                // if filteredManufacturer !== 0 && query !== ''
                (filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    value={item}
                    className={({ active }) => `relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {/* display available options according to query */}
                          {item}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0  left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>

                          </span>
                        ) : null}
                      </>
                    )}
                  </ComboboxOption>
                )))
              }
            </ComboboxOptions>
          </Transition>
        </div>

      </Combobox>
    </div>
  )
}

export default SearchManufacturer