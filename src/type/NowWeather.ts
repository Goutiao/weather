export interface RealtimeInt  {
    text: string,
    code: string,
    temp: number,
}
export interface locationInt  {
    areacode: string,
    name:string   
}

export class RealtimeInitData {
    realtime: RealtimeInt={
        text: '',
        code: '',
        temp: 1,
    }
    location: locationInt = {
        areacode: '',
        name:''  
    }
}