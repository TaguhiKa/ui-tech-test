import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react'
import findCountries, { Country } from '../../country-service';

function CountryField() {
    const [countryList, setCountryList] = useState<Country[]>([]);
    const [query, setQuery] = useState('')
    useEffect(() => {
        findCountries('')
        .then((result: Country[]) => {
            setCountryList(result);
        })
        .catch((error) => {
            console.error("An error occurred:", error);
        });
    }, []);
    
    const filteredCountryList =
    query === ''
        ? countryList
        : countryList.filter((country) => {
            return country.name.common.toLowerCase().includes(query.toLowerCase())
        })

    return (
        <Combobox value={countryList} onChange={setCountryList}>
            <Combobox.Input onChange={(event) => setQuery(event.target.value)} className={"rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"}/>
            <Combobox.Options>
                {filteredCountryList.map((country: Country) => (
                <Combobox.Option key={country.name.common} value={country.name.common}>
                    {country.name.common} 
                </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )
}

export default CountryField;