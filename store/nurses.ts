import {defineStore} from "pinia"
import Auth from "../services/nursesservicecs"
import type {Pagination,Nurses} from "@/types/types"

export const nursesStore = defineStore({
    id:'nurses',
    state:()=>({
    
    }),
    actions:{
        async createNurses(payload: Nurses){
            return Auth.createNurses(payload).then((res)=>{
                return res
            })
        },
        async deleteNurses(doctorUuid: string){
            return Auth.deleteNurses(doctorUuid).then((res)=>{
                return res
            }) 
        },
        async updateNurses(payload:Nurses){
            return Auth.updateNurses(payload).then((res)=>{
                return res
            })
        }
    }
})