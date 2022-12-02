export interface cityGeoInt {
    areacode: string,
    name: string,
    path: string,
    isAdd: boolean,
}

export class cityGeoInitData {
    areaList: cityGeoInt[] = [
        {
            areacode: '',
        name: '',
        path: '',
            isAdd: false,    
       }
    ]
}