import type {Doctors,Nurses} from "@/types/types"
export const useDoctors = () => useState('doctors' , ()=> [] as Doctors[])
export const useNurses = ()=> useState('nurses', ()=> [] as Nurses[])