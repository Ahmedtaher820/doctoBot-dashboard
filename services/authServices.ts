import { Login } from "~/types/types"
import DataServices from "./Common/DataServices"
export default{
    login(payload:Login){
        console.log(payload)
        return DataServices().post('/auth/login',{body:payload})
    }
}