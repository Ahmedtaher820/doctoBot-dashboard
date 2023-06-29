import DataServices from "./Common/DataServices"
import type { Pagination, Doctors } from "@/types/types"

export default {
    getAllDoctors() {
        return DataServices().get<Pagination<Doctors>>('/doctors')
    },
    deleteDoctors(doctorUuid:string){
        return DataServices().default(`/doctors/${doctorUuid}`)
    },
    createDoctors(payload: Doctors) {
        return DataServices().post('/doctors', {
            body: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    updateDoctors(payload: Doctors, uuid: string) {
        return DataServices().put(`/doctors/${uuid}`, {
            body: payload,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}