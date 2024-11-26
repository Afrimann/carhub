import { useState, useEffect } from 'react';

export function UseFetch<T>(baseURL: string, filters: Record<string, string | number>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Dynamically generate the URL with filters
    const generateAPIUrl = () => {
        const params = new URLSearchParams(
            Object.entries(filters)
                .filter(([_, value]) => value !== '') // Exclude empty values
                .map(([key, value]) => [key, String(value)]) // Convert values to strings
        );
        return `${baseURL}?${params.toString()}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = generateAPIUrl(); // Generate the URL dynamically
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-rapidapi-key': 'c62040f6e5msh345ec0879945e94p16cabfjsn73cf77c80b8c',
                        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result: T = await response.json();
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseURL, filters]); // Re-fetch whenever `baseURL` or `filters` changes

    return { data, loading, error };
}
