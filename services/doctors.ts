import DataServices from "./Common/DataServices"
import type {Pagination,Doctors} from "@/types/types"

export default{
    getAllDoctors(){
        return DataServices().get<Pagination<Doctors>>('/doctors')
    }
}