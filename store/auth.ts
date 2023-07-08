import { defineStore } from 'pinia';
import type {Login,User} from "@/types/types"
import DataServices from "@/services/authServices"
export const authStore = defineStore({
    id:'auth',
    state:()=>({
        user:{
            name:'',
            email:'',
            phone:'',
            role:''
        } as User 
    }),
    actions:{
        async login(payload:Login){
            return DataServices.login(payload).then((res)=>{
                return res
            })
        },
        async getLoggedUser(){
            return DataServices.getLoggedUser().then((res)=>{
                this.user = res?.data
            })
        },
        async deleteAdmin(userId:string){
            return DataServices.deleteAdmin(userId)
        },
        async changeAdminPass(payload:{password:string}){
            return DataServices.changeAdminPass(payload).then((res)=>{
                return res
            })
        },
        async changeAdminData(payload:Object): Promise<User>{
            return DataServices.changeAdminData(payload).then(({data})=>{
                this.user = data
                return data
            })
        }
    }
})