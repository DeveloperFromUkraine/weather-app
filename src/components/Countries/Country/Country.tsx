import React, {FunctionComponent, useEffect, useState} from 'react';
import classNames from "classnames";
import {CountriesModel, CountryModel} from "../../../models/country-model";


import "./Country.scss";

const Country: FunctionComponent<CountryModel> = ({country, activeItem}) => {
    const [countryItem, setCountry] = useState<CountriesModel>();

    useEffect(() => {
        setCountry(country);
    }, [country])

    return (
        <>
            {
                <div className={classNames("country-item", activeItem === countryItem?.name && "active")}>
                    <p className="country-item-name">{countryItem?.name}</p>
                    <div className="county-item-geo-position">
                        <span>Lat: {countryItem?.latlng[0]}</span>
                        <span>Lng: {countryItem?.latlng[1]}</span>
                    </div>
                </div>
            }
        </>
    );
};

export default Country;
