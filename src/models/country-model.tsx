export interface CountriesModel {
    timezones: [],
    latlng: Array<number>,
    name: string,
    country_code: string
    capital: string
}

export interface CountryModel {
    country: CountriesModel,
    activeItem: string,
}
