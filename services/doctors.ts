import DataServices from "./Common/DataServices"
import type { Pagination, Doctors } from "@/types/types"
const headers =  {
    'Content-Type': 'multipart/form-data',
  }
export default {
    getAllDoctors() {
        return DataServices().get<Pagination<Doctors>>('/doctors')
    },
    deleteDoctors(doctorUuid:string){
        return DataServices().default(`/doctors/${doctorUuid}`)
    },
    createDoctors(payload: Doctors) {
        return DataServices(headers).post('/doctors', {
            body: payload,
        })
    },
    updateDoctors(payload: Doctors, uuid: string) {
        return DataServices(headers).put(`/doctors/${uuid}`, {
            body: payload,
        })
    },
}