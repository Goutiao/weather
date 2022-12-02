import { defineStore } from 'pinia'


export const useAreaStore = defineStore('area', {
    state: () => ({
        areaPosiList: [''],
        isShowSearch: false,
        once: true,
        isAdd:false
    }),
    getters: {},
    actions: {
        deleteCity(index:number){
            this.areaPosiList.splice(index,1)
        },
        initAreaPosition(areacode:string) {
            if (this.once) {
                this.areaPosiList.splice(0,1,areacode)
                this.once =false
           }
        },
        addCityPosition(areacode: string) {
      
            this.areaPosiList.push(areacode)
            this.isAdd=!this.isAdd
         
        },
        isShow() {
            this.isShowSearch = !this.isShowSearch;
        },
        disapear() {
            this.isShowSearch = !this.isShowSearch;
            
        }
    }
})