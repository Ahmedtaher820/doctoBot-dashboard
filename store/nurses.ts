import {defineStore} from "pinia"
import Auth from "../services/nursesServicecs"
import type {Pagination,Nurses,Reservations} from "@/types/types"

export const nursesStore = defineStore({
    id:'nurses',
    state:()=>({
        reservations:[] as Reservations[]
    }),
    actions:{
        async getAllNurses(){
            return Auth.getAllNurses().then((res)=>{
                return res
            })
        },
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
        async updateNurses(payload:Nurses,uuid:string){
            return Auth.updateNurses(payload,uuid).then((res)=>{
                return res
            })
        },
        async getNursersReservations(): Promise<Reservations[]>{
            return Auth.getNursersReservations().then((res)=>{
                this.reservations = res?.data
                return res
            })
        },
        async deleteReservation(uuid:string){
            return Auth.deleteReservation(uuid).then((res)=>{
                return res
            })
        },
        
    }
})