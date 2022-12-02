export interface waterInt {
    aqi: number,
    aqi_level: string
}

export class waterInitData{
    water: waterInt = {
        aqi: 1,
        aqi_level:''
    }
}