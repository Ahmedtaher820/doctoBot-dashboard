import type {Doctors,Nurses,User} from "@/types/types"
export const useDoctors = () => useState('doctors' , ()=> [] as Doctors[])
export const useNurses = ()=> useState('nurses', ()=> [] as Nurses[])
export const UseProfile = ()=> useState('me',()=>[] as User[])