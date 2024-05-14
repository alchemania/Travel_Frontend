export const Port = 8000

//上线后修改
const deploy = false
let ACCESS_POINT: string;
if (deploy) {
    ACCESS_POINT = "47.110.236.51"
} else {
    ACCESS_POINT = "localhost"
}


export const API = `http://${ACCESS_POINT}:${Port}/api`
export const WS_BASE = `http://${ACCESS_POINT}:${Port}`

export const api_sh_visitors_rawdata = (freq: string, ys: number, ms: number, ds: number, ye: number, me: number, de: number) => {
    const TEMPLATE = `${API}/data/sh/visitors/raw`
    return `${TEMPLATE}/${freq}/${ys}-${ms}-${ds}/${ye}-${me}-${de}`
}


export const api_sh_visitors_sum = (year: number, month: number | null, day: number | null) => {
    const TEMPLATE = `${API}/data/sh/visitors/sum`
    if (month == null && day == null)
        return `${TEMPLATE}/y/${year}/01/01`
    else if (day == null)
        return `${TEMPLATE}/m/${year}/${month}/01`
    else
        return `${TEMPLATE}/d/${year}/${month}/${day}`
}

export const api_sh_visitors_sumdiv = (year: number, month: number) => {
    const TEMPLATE = `${API}/data/sh/visitors/sumdiv`
    return `${TEMPLATE}/${year}/${month}`
}

export const api_sh_visitors_yoy = (year: number, month: number | null, day: number | null) => {
    const TEMPLATE = `${API}/data/sh/visitors/yoy`
    if (month == null && day == null)
        return `${TEMPLATE}/y/${year}/01/01`
    else if (day == null)
        return `${TEMPLATE}/m/${year}/${month}/01`
    else
        return `${TEMPLATE}/d/${year}/${month}/${day}`
}

export const api_sh_hotel_rawdata = (freq: string, ys: number, ms: number, ds: number, ye: number, me: number, de: number) => {
    const TEMPLATE = `${API}/data/sh/hotel/raw`
    return `${TEMPLATE}/${freq}/${ys}-${ms}-${ds}/${ye}-${me}-${de}`
}

export const api_sh_hotel_yoy = (year: number, month: number | null, day: number | null) => {
    const TEMPLATE = `${API}/data/sh/hotel/yoy`
    if (month == null && day == null)
        return `${TEMPLATE}/y/${year}/01/01`
    else if (day == null)
        return `${TEMPLATE}/m/${year}/${month}/01`
    else
        return `${TEMPLATE}/d/${year}/${month}/${day}`
}

export const api_sh_visitors_by_country_statistics = `${API}/data/sh/visitorsbycountry/stats`

export const api_sh_data_stats = `${API}/data/sh/stats`

