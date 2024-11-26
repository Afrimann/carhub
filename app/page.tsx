'use client';

import { CarCard, CustomFilter, Hero, SearchBar } from '@/components';
import { UseFetch } from '@/components/UseFetch';
import { fuels, yearsOfProduction } from '@/constants';
import { CarProps } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const manufacturer = searchParams.get('manufacturer') || '';
  const model = searchParams.get('model') || '';

  const [filters, setFilters] = useState({
    manufacturer: manufacturer || '',
    model: model || '',
    fuel: '',
    year: 2024,
    limit: 30,
  });

  const handleFilterChange = (filterName: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const { data, loading, error } = UseFetch<CarProps[]>(
    'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
    filters
  );

  useEffect(() => {
    // Sync filters with query params on initial load
    setFilters((prev) => ({
      ...prev,
      manufacturer,
      model,
    }));
  }, [manufacturer, model]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter
              title="fuel"
              onChange={(value) => handleFilterChange('fuel', value)}
              option={fuels}
            />
            <CustomFilter
              title="year"
              onChange={(value) => handleFilterChange('year', Number(value))}
              option={yearsOfProduction}
            />
          </div>
        </div>

        {loading && !data && <p>Loading...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {data && Array.isArray(data) && data.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {data.map((car, index) => (
                <CarCard car={car} key={index} />
              ))}
            </div>
          </section>
        ) : (
          !loading && <p>No cars found. Please try again later.</p>
        )}
      </div>
    </main>
  );
}
