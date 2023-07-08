<script lang="ts" setup>
import {doctorsAuth} from "../../store/doctors"
import type {Doctors} from "@/types/types"
import { useDoctors } from "~/composables/useState"
import { toast } from 'vue3-toastify';
import { UserCircleIcon  } from '@heroicons/vue/24/outline'

useHead({
  title:'Doctors',
  meta:[
    {
      name:'description',
      content:'doctors page'
    }
  ]
})
const router = useRouter()
const doctorsState = useDoctors()
const processing = ref(false)
const addDoctor = (type:string)=>{
  router.push({path:'/doctors/createDoctors'})
}
const page = ref(1)
const config = useRuntimeConfig()
const token = ref('')
if(process.client){
  token.value = localStorage.getItem('admin-token')

}
const headers = {
    Authorization: token
}
  const { data: doctors, refresh, pending } = await useAsyncData<Doctors[]>('doctors', () =>
  $fetch(`https://doctobot.onrender.com/doctobot/doctors`, {
    params: {
      page: page.value,
    },
    headers: {
      Authorization: token
    }
  }),
  {watch: [page]}
  )
  doctorsState.value = doctors.value?.data

const showModal = ref(false)
const selectedDoctors = ref<Doctors>()
const editDoc = (info: Doctors)=>{
  showModal.value = true
  selectedDoctors.value = info
}
const {deleteDoctors, getDoctors} = doctorsAuth()
const showConfirmModal = ref(false)
const deleteDoc = (info: Doctors)=>{
 selectedDoctors.value = info
 showConfirmModal.value = true
}
const deleteNursesConfirm = ()=>{
  processing.value = true
  deleteDoctors(selectedDoctors.value?._id).then(()=>{
    doctorsState.value = doctorsState.value.filter((item) => item._id !== selectedDoctors.value?._id )
  }).then(()=>{
    toast.success('Item deleted successfully')
  }).finally(()=>{
    showConfirmModal.value = false
    processing.value = false
  })
}
onMounted(()=>{
  getDoctors()
})
const updated  = async()=>{
  processing.value = true
  getDoctors().then((res)=>{

    doctorsState.value = res.data
  }).finally(()=>{
    processing.value = false

  })
}
</script>
<template>
  <div>
    <AppConfirmModal :show="showConfirmModal" :processing="processing" @close="showConfirmModal = false" @cancel="showConfirmModal = false" @delete="deleteNursesConfirm" cateInfo="Doctor info" />
  <DoctorsModifyDoctorsModal :doctors="selectedDoctors" @updated="updated" :show="showModal" @close="showModal = false" />
    <over-lay-loader v-if="processing" />
    <SystemTable @add="addDoctor" class="shadow-md shadow-gray-200">
      <template #grid-header>
        <tr>
          <SystemTableThGrid
           >Name</SystemTableThGrid>
          <SystemTableThGrid>Address</SystemTableThGrid>
          <SystemTableThGrid>Status</SystemTableThGrid>
          <SystemTableThGrid>Specialiaty</SystemTableThGrid>
          <SystemTableThGrid scope="col" class="text-center">
            #
          </SystemTableThGrid>
        </tr>
      </template>
      <tr v-for="doctor in doctorsState" :key="doctor._id">
        <SystemTableThGrid>
          <div class="flex items-center">
            <div class="h-11 w-11 flex-shrink-0">
              <img v-if="doctor?.image !== '{}'" class="h-11 w-11 rounded-full object-contain" loading="lazy" :src="doctor?.image" alt="" />
              <UserCircleIcon v-else class="w-12 h-12"  />
            </div>
            <div class="ml-4">
              <div class="font-medium text-gray-900 flex gap-2">{{ doctor.name }}
                <a :href="`https://wa.me/${doctor.contactNumber}`" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"><path fill="#1c8b1c" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/></svg>
                </a>
              </div>
              <div class="mt-1 text-gray-500">{{ doctor.email }}</div>
            </div>
          </div>
        </SystemTableThGrid>
        <SystemTableThGrid >
          <div class="text-gray-900">{{ doctor.address }}</div>
        </SystemTableThGrid>
        <SystemTableThGrid >
          <span
            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-green-600/20" :class="[doctor.isAvailable ? 'text-green-700':'text-red-600']">{{doctor.isAvailable ? 'Active' : 'noActive'}}</span>
        </SystemTableThGrid>
        <SystemTableThGrid >{{ doctor.specialiaty }}</SystemTableThGrid>
        <td
          class="relative flex gap-4 justify-end whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <button @click="editDoc(doctor)" type="button" class="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button @click="deleteDoc(doctor)" type="button" class="text-red-600 hover:text-red-900">Remove</button>
        </td>
      </tr>
    </SystemTable>
  </div>
</template>
<style></style>