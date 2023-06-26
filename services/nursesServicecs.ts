import DataServices from "./Common/DataServices"
import type { Pagination, Nurses } from "@/types/types"

export default {
  createNurses(payload: Nurses) {
    return DataServices().post('/nurses', {
      body: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  updateNurses(payload: Nurses) {
    return DataServices().put('/nurses', {
      body: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  deleteNurses(nursesUuid: string) {
    return DataServices().default(`/nurses/${nursesUuid}`)
  },
}