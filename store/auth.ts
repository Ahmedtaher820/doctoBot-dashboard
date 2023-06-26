import { defineStore } from 'pinia';
import type {Login} from "@/types/types"
import DataServices from "@/services/authServices"
export const authStore = defineStore({
    id:'auth',
    actions:{
        async login(payload:Login){
            return DataServices.login(payload).then((res)=>{
                return res
            })
        }
    }
})