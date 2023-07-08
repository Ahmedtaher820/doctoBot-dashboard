import DataServices from "./Common/DataServices"
import type { Pagination, Nurses } from "@/types/types"
const headers =  {
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
  updateNurses(payload: Nurses,uuid:string) {
    return DataServices(headers).put('/nurses/'+uuid, {
      body: payload,
    })
  },
  deleteNurses(nursesUuid: string) {
    return DataServices().default(`/nurses/${nursesUuid}`)
  },
}