//对api接口进行统一的管理
//1.导入二次封装的axios实例instance
import internal from "stream";
import instance from "./index";
import service from "./location"
//该接口获取当前地区的温度
export function getNowTemp(data:string) {
    return instance({
        url: '/456456/weather/v001/now',
        method: 'GET',
        params: {
            areacode:data
        }
    })
}
//获取搜索城市的天气
export function getCityGeo(data:string) {
    return instance({
        url: '/456456/function/v001/city',
        method: 'GET',
        params: {
            location:data,
            items: 20,
            area: "china",
            withPoi: false,
        },
    })
}
//获取城市十五天的详细天气
export function getWeekWeather(data:string,days:string) {
    return instance({
        url: '/456456/weather/v001/day',
        method: 'GET',
        params: {
            areacode:data,
            days:days
        },
    })
}

export function getIp(IP: string) {
    return instance({
        url: '/ipguishu/ip/geo/v1/district',
        method: 'GET',
        params: {
            ip:IP
        }
    })
}

export function getAir(areacode: string) {
    return instance({
        url: '/34324/air/v001/aqi',
        method: 'GET',
        params: {
            areacode:areacode
        } 
    })
}

export function getHours(areacode: string) {
    return instance({
        url: '/456456/weather/v001/hour',
        method: 'GET',
        params: {
            areacode: areacode,
            int:24
        } 
    })
}
