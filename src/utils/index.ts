/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 * @returns {String}
 */
export const formatTime = (
    time: string | number | Date,
    fmt: string
): string => {
    if (!time) return ''
    const date = new Date(time)
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    }
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                // @ts-ignore: Unreachable code error
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return fmt
}


export const hot_to_string = (value: number):string => {
    if (value == -3) return "远小于"
    else if (value == -2) return "小于"
    else if (value == -1) return "略小于"
    else if (value == 0) return "接近"
    else if (value == 1) return "略大于"
    else if (value == 2) return "大于"
    else if (value == 3) return "远大于"
}