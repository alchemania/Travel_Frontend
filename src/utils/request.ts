export const Port = 8000
// export const BASE_URL_API = `http://localhost:${Port}/api`
//上线后修改
const WEB_LOC = "47.110.236.51"
export const BASE_URL = `http://${WEB_LOC}:${Port}`
export const BASE_URL_API = `${BASE_URL}/api`


export const api_nmainland_all = `${BASE_URL_API}/data/nmainland/all`

export const api_nmainland_sum = (year, month) => {
    if (month == null) return `${BASE_URL_API}/data/nmainland/sum/${year}`
    else return `${BASE_URL_API}/data/nmainland/sum/${year}/${month}`
}

export const api_nmainland_per = (year, month) => {
    if (month == null) return `${BASE_URL_API}/data/nmainland/per/${year}`
    else return `${BASE_URL_API}/data/nmainland/per/${year}/${month}`
}

export const api_hotel_all = `${BASE_URL_API}/data/hotel/all`

export const api_hotel_rate = `${BASE_URL_API}/data/hotel/per`

export const api_country_rate = `${BASE_URL_API}/data/country/rate`

// aborted
export const api_weather = `${BASE_URL_API}/data/weather`

export const BASE_URL_ML = `${BASE_URL}/ml`

export const ml_get_all = `${BASE_URL_ML}/all`

export const ml_insight_forecast = `${BASE_URL_ML}/pred/is`

export const ml_re_forecast = `${BASE_URL_ML}/pred/re`

export const ml_model_retrain = `${BASE_URL_ML}/train/re`