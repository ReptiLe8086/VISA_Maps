import React, {useEffect, useRef, useState} from 'react';
import getCountriesNames from '../../utils/get-countries-names';
import { getCountryStatus } from '../../utils/get-country-status';
import './CountriesStatus.css';

const Icon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};

export default function CountriesStatus(props: {selected: string; destination: string; setDestination: (country: string) => void}) {
    const [showMenu, setShowMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    const countries = getCountriesNames();
    const destCountries: string[] = [];
    for(let country of countries) {
        if(country !== props.selected){
            destCountries.push(country + ':' + getCountryStatus(props.selected, country));
        }
    }

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener('click', handler);
        return () => {
            window.removeEventListener('click', handler);
        };
    });

    const handleInputClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (props.destination !== '') {
            return props.destination;
        }
        return 'Find destination status';
    };

    const onItemClick = (countryName: string) => {
        props.setDestination(countryName);
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return destCountries;
        }
        return destCountries.filter((country) => country.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
    };

    return (
        <div className="container">
            <div onClick={handleInputClick} className="input">
                <div className="selected-value">{getDisplay()}</div>
                <div className="tools">
                    <div className="tool">
                        <Icon />
                    </div>
                </div>
            </div>
            {showMenu ? (
                <div className="menu">
                    <div className="box">
                        <input type="text" onChange={onSearch} value={searchValue} ref={searchRef} />
                    </div>
                    {getOptions().map((country) => (
                        <div onClick={() => onItemClick(country)} key={country} className="item">
                            {country}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
