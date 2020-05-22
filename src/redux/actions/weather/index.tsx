import axios from 'axios';
import {appId, baseUrl} from "../../../api/baseUrl";
import {API_GET_WEATHER_SELECTED_COUNTRY, API_GET_WEATHER_SELECTED_COUNTRY_ERROR} from "../../../constants/actions";

export const getSelectedWeather = (coords: Array<any>) => (dispatch: any) => {
    apiGetWeather(coords)
        .then(res => {
            dispatch({type: API_GET_WEATHER_SELECTED_COUNTRY, payload: res.data});
        }).catch(err => {
            dispatch({type: API_GET_WEATHER_SELECTED_COUNTRY_ERROR, payload: err.error});
    })
}

const apiGetWeather = (coords: Array<any>) => {
    return axios.get(`${baseUrl}`, {
        params: {
            lat: coords[0],
            lon: coords[1],
            appid: appId
        }
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}
