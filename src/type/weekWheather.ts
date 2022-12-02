export interface WeekWeatherInt {
    "text_day": string,  		
    "code_day": string, 		
    "text_night":string,  		
    "code_night":string,  	
    "high": number,  			
    "low":number,  			
    "date": string,  	
    "week": string,  
    "wc_day": string,
    "wd_night": string,
    "wc_night": string,
    "weeklist":Array<string>
}
export interface dateInt {
datelist:string[] 		
}
export interface LocatInt {
    areacode: string,
    country: string,
    name: string,
    path: string
}

export class WeekWeaInitData {
    daily : WeekWeatherInt[]=[]
    weeklist: dateInt[] = []
    location: LocatInt = {
        areacode: '',
        country: '',
        name: '',
        path: ''
    }
}