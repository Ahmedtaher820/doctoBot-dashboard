import { Login, User } from "~/types/types"
import DataServices from "./Common/DataServices"
export default{
    login(payload:Login){
        console.log(payload)
        return DataServices().post('/auth/login',{body:payload})
    },
    getLoggedUser(){
        return DataServices().get<User>('/users/getMe')
    },
    deleteAdmin(userId:string){
        return DataServices().default(`/users/deleteMe/${userId}`)
    },
    changeAdminPass(payload:{password:string}){
        return DataServices().put(`/users/changeMyPassword`,{
            body:payload
        })
    },
    changeAdminData(payload:Object){
        return DataServices().put<User>(`/users/updateMe`,{
            body: payload
        })
    }
}