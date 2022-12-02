export interface airInt {
    aqi: number,
    aqi_level: string
}

export class airInitData{
    air: airInt = {
        aqi: 1,
        aqi_level:''
    }
}