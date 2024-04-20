export const Port = 8000

//上线后修改
const deploy = false
let ACCESS_POINT: string;
if (deploy) {
    ACCESS_POINT = "47.110.236.51"
} else {
    ACCESS_POINT = "localhost"
}

export const BASE_URL_API = `http://${ACCESS_POINT}:${Port}/api`


export const api_sh_visitors_all = `${BASE_URL_API}/data/sh/visitors/all`

export const api_sh_visitors_sum = (year: number, month: number | null, day: number | null) => {
    const TEMPLATE = `${BASE_URL_API}/data/sh/visitors/sum`
    console.log(year, month, day)
    if (month == null && day == null)
        return `${TEMPLATE}/y/${year}/01/01`
    else if (day == null)
        return `${TEMPLATE}/m/${year}/${month}/01`
    else
        return `${TEMPLATE}/d/${year}/${month}/${day}`
}

export const api_sh_visitors_yoy = (year: number, month: number | null, day: number | null) => {
    const TEMPLATE = `${BASE_URL_API}/data/sh/visitors/yoy`
    if (month == null && day == null)
        return `${TEMPLATE}/y/${year}/01/01`
    else if (day == null)
        return `${TEMPLATE}/m/${year}/${month}/01`
    else
        return `${TEMPLATE}/d/${year}/${month}/${day}`
}

export const api_hotel_all = `${BASE_URL_API}/data/hotel/all`

export const api_hotel_rate = `${BASE_URL_API}/data/hotel/per`

export const api_country_rate = `${BASE_URL_API}/data/country/rate`

// aborted
export const BASE_URL_ML = `${BASE_URL_API}/ml`

export const ml_get_all = `${BASE_URL_ML}/all`

export const ml_insight_forecast = `${BASE_URL_ML}/pred/is`

export const ml_re_forecast = `${BASE_URL_ML}/pred/re`

export const ml_model_retrain = `${BASE_URL_ML}/train/re`