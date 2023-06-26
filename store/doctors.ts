import {defineStore} from "pinia"
import doctorsServices from "../services/doctors"
import type {Pagination,Doctors} from "@/types/types"

export const doctorsAuth = defineStore({
    id:'doctors',
    state:()=>({
    
    }),
    actions:{
        async getDoctors(): Promise<Pagination<Doctors>>{
            return doctorsServices.getAllDoctors().then((res)=>{
                console.log(res)
                return res
            })
        },
        async createDoctor(payload: Doctors){
            return doctorsServices.createDoctors(payload).then((res)=>{
                return res
            }) 
        },
        async deleteDoctors(doctorUuid: string){
            return doctorsServices.deleteDoctors(doctorUuid).then((res)=>{
                return res
            }) 
        },
        async updateDoctors(payload:Doctors){
            return doctorsServices.updateDoctors(payload).then((res)=>{
                return res
            })
        }
    }
})