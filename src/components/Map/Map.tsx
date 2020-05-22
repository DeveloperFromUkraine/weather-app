import React, {FunctionComponent, useEffect, useState} from 'react';
import mapboxgl from "mapbox-gl";
import {connect} from "react-redux";

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2ZWxvcGVyZnJvbXVrcmFpbmUiLCJhIjoiY2thZWQxNnRzMGlhdDJ0bWJuYzFmeWZ1ayJ9.u1BgvIkxyQFHDyjWB8_Guw';

const Map: FunctionComponent = (props) => {

    const {country_info}: any = props; // We could implement interface for country_info and don't use any.
    let mapRef: HTMLDivElement | string = '';

    const initialWeather = localStorage.getItem('country_info');
    const [countryWeather, setCountryWeather] = useState<any>();

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [
                countryWeather?.coord?.lon ? countryWeather?.coord?.lon : 32,
                countryWeather?.coord?.lat ? countryWeather?.coord?.lat : 49,
            ],
            zoom: 3
        });
        map.resize();

        if (!isEmpty(country_info) || !isEmpty(JSON.parse(initialWeather as string))) {
            map.on('render', () => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([
                        countryWeather?.coord?.lon ? countryWeather?.coord?.lon : 32,
                        countryWeather?.coord?.lat ? countryWeather?.coord?.lat : 49,
                    ])
                    .setPopup(new mapboxgl.Popup().setHTML(`
                    <div>
                        <p>temp: ${countryWeather?.main?.temp}</p>
                        <p>feelsLike: ${countryWeather?.main?.feels_like}</p>
                        <p>tempMin/MAX: ${countryWeather?.main?.temp_max} / ${countryWeather?.main?.temp_min}</p>
                        <p>humidity: ${countryWeather?.main?.humidity}</p>
                    </div>
                `)) // add popup
                    .addTo(map);
                marker.togglePopup();
            });
        }

        // Remove listener on componentDidUnmount.
        return () => {
            map.remove();
        }
    }, [mapRef, countryWeather, initialWeather, country_info]);

    useEffect(() => {
        if (!isEmpty(country_info)) {
            localStorage.setItem('country_info', JSON.stringify(country_info));
            setCountryWeather(country_info);
        } else if (initialWeather != null) {
            setCountryWeather(JSON.parse(initialWeather));
        }
    }, [country_info, initialWeather]);

    return (
        <div>
            <div className="map-container" ref={(el: HTMLDivElement) => mapRef = el}/>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        country_info: state.weather.data,
    }
}
export default connect(mapStateToProps, null)(Map);

function isEmpty(obj: Object) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
