import {defineStore} from "pinia"
import Auth from "../services/doctors"
import type {Pagination,Doctors} from "@/types/types"

export const authStore = defineStore({
    id:'auth',
    state:()=>({
    
    }),
    actions:{
        async getDoctors(): Promise<Pagination<Doctors>>{
            return Auth.getAllDoctors().then((res)=>{
                console.log(res)
                return res
            })
        }
    }
})