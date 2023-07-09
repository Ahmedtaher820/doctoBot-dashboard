import DataServices from "./Common/DataServices"
import type { Pagination, Nurses, Reservations } from "@/types/types"
const headers = {
  'Content-Type': 'multipart/form-data',
}
export default {

  getAllNurses() {
    return DataServices(headers).get('/nurses')
  },
  createNurses(payload: Nurses) {
    return DataServices(headers).post('/nurses', {
      body: payload,
    })
  },
  updateNurses(payload: Nurses, uuid: string) {
    return DataServices(headers).put('/nurses/' + uuid, {
      body: payload,
    })
  },
  deleteNurses(nursesUuid: string) {
    return DataServices().default(`/nurses/${nursesUuid}`)
  },
  getNursersReservations() {
    return DataServices().get<Reservations[]>(`/reservations/nurses`)
  },
  deleteReservation(uuid: string) {
    return DataServices().default(`/reservations/nurses/${uuid}`)
  },
}