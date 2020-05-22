import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
import countries_data from '../../countries-json-data/countries.json';
import Country from "./Country/Country";

import "./Countries.scss";
import {CountriesModel} from "../../models/country-model";
import {connect} from "react-redux";
import {getSelectedWeather} from "../../redux/actions/weather";

const Countries: FunctionComponent<any> = (props) => {

    const {getSelectedWeather} = props;

    const [countries, setCountries] = useState<CountriesModel[]>([]);
    const [activeCountry, setActiveCountry] = useState('');

    useEffect(() => {
        setCountries(countries_data as CountriesModel[]);
    }, [])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.currentTarget.value;
        setActiveCountry('');
        if (searchValue) {
            setCountries(countries.filter(country => {
                return country.name.toLowerCase().includes(searchValue.toLowerCase());
            }));
        } else {
            setCountries(countries_data as CountriesModel[]);
        }
    }

    const handleClick = (country: CountriesModel) => (event: React.MouseEvent<HTMLElement>) => {
        setActiveCountry(country.name);
        getSelectedWeather(country.latlng);
    }

    return (
        <div className="countries-container">
            <div>
                <div className="search-container">
                    <input placeholder="Search your's country..." className="search-input" type="text"
                           onInput={handleSearch}/>
                </div>
            </div>

            <div className="countries-list">
                {countries.map((country, index) => (
                    <div onClick={handleClick(country)} key={index}>
                        <Country country={country} activeItem={activeCountry}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default connect(null, {
    getSelectedWeather
})(Countries);
