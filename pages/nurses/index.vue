<script lang="ts" setup>
import {nursesStore} from "../../store/nurses"
import type {Doctors, Nurses} from "@/types/types"
import doctors from "~/services/doctors";
import { useNurses } from "~/composables/useState";
useHead({
  title:'Doctors',
  meta:[
    {
      name:'description',
      content:'doctors page'
    }
  ]
})
const nursesState = useNurses()
const router = useRouter()
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
if(nursesState.value.length === 0){

  const { data: doctors, refresh, pending } = await useAsyncData<Doctors[]>('nurses', () =>
  $fetch(`https://doctobot.onrender.com/doctobot/nurses`, {
    params: {
      page: page.value,
    },
    headers: {
      Authorization: token
    }
  }),
  {watch: [page]}
)
nursesState.value = doctors.value?.data
}
const {deleteNurses} = nursesStore()
const showModal = ref(false)
const selectedNurses = ref<Nurses>()
const editNurses = (val:Nurses)=>{
  selectedNurses.value = val
  showModal.value = true
}
const showConfirmModal =  ref(false)

const deleteNursesFun = (val:Nurses)=>{
  selectedNurses.value = val
  showConfirmModal.value = true
}
const deleteNursesConfirm = ()=>{
  deleteNurses(selectedNurses.value?._id).then(()=>{
    refreshNuxtData('nurses')
  })
}
</script>
<template>
  <div>
    <AppConfirmModal :show="showConfirmModal" @close="showConfirmModal = false" @cancel="showConfirmModal = false" @delete="deleteNursesConfirm" cateInfo="Nurses info" />
  <NursesModifyNursesModal :nurses="selectedNurses" :show="showModal" @close="showModal = false" />

    <SystemTable @add="addDoctor" class="shadow-md shadow-gray-200">
      <template #grid-header>
        <tr>
          <SystemTableThGrid
           >Name</SystemTableThGrid>
          <SystemTableThGrid>Address</SystemTableThGrid>
          <SystemTableThGrid>Status</SystemTableThGrid>
          <SystemTableThGrid>Shift</SystemTableThGrid>
          <SystemTableThGrid scope="col" class="text-center">
            #
          </SystemTableThGrid>
        </tr>
      </template>
      <tr v-for="nurses in nursesState" :key="nurses._id">
        <SystemTableThGrid>
          <div class="flex items-center">
            <div class="h-11 w-11 flex-shrink-0">
              <img class="h-11 w-11 rounded-full object-contain" :src="nurses?.image" alt="" />
            </div>
            <div class="ml-4">
              <div class="font-medium text-gray-900 flex gap-2">{{ nurses.name }}
                <a :href="`https://wa.me/${nurses.contactNumber}`" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"><path fill="#1c8b1c" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/></svg>
                </a>

              </div>
              <div class="mt-1 text-gray-500">{{ nurses.email }}</div>
            </div>
          </div>
        </SystemTableThGrid>
        <SystemTableThGrid >
          <div class="text-gray-900">{{ nurses.address }}</div>
        </SystemTableThGrid>
        <SystemTableThGrid >
          <span
            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-green-600/20" :class="[nurses.isAvailable ? 'text-green-700':'text-red-600']">{{nurses.isAvailable ? 'Active' : 'noActive'}}</span>
        </SystemTableThGrid>
        <SystemTableThGrid >{{ nurses.shift }}</SystemTableThGrid>
        <SystemTableThGrid
          class="relative flex gap-4 justify-end whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <button @click="editNurses(nurses)" type="button" class="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button @click="deleteNursesFun(nurses)" type="button" class="text-red-600 hover:text-red-900">Remove</button>
        </SystemTableThGrid>
      </tr>
    </SystemTable>
  </div>
</template>
<style></style>