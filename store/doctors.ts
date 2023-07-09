import {defineStore} from "pinia"
import doctorsServices from "../services/doctors"
import type {Pagination,Doctors,Reservations} from "@/types/types"

export const doctorsAuth = defineStore({
    id:'doctors',
    state:()=>({
        reservations:[] as Reservations[],
        doctors: [] as Doctors[]
    
    }),
    actions:{
        async getDoctors(): Promise<Pagination<Doctors>>{
            return doctorsServices.getAllDoctors().then((res)=>{
                this.doctors = res.data
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
        async updateDoctors(payload:Doctors,uuid: string){
            return doctorsServices.updateDoctors(payload,uuid).then((res)=>{
                return res
            })
        },
        async getDoctorReservations(): Promise<any>{
            return doctorsServices.getDoctorReservations().then((res)=>{
                this.reservations = res?.data
            })
        },
        async deleteReservation(uuid:string){
            return doctorsServices.deleteReservation(uuid).then((res)=>{
                return res
            })
        },
    }
})