import {API_GET_WEATHER_SELECTED_COUNTRY, API_GET_WEATHER_SELECTED_COUNTRY_ERROR} from "../../../constants/actions";

export const initialState = {
    data: [],
    error: {}
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case API_GET_WEATHER_SELECTED_COUNTRY:
            return {
                ...state,
                data: action.payload
            };
        case API_GET_WEATHER_SELECTED_COUNTRY_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}
