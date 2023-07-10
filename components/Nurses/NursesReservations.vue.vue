<script lang="ts" setup>
import { storeToRefs } from "pinia"
import {nursesStore} from "../../store/nurses"
import {  TrashIcon } from "@heroicons/vue/24/outline";
const {getNursersReservations, deleteReservation} = nursesStore()
const {reservations} = storeToRefs(nursesStore())
const processing = ref(false)
onMounted(async()=>{
  if(reservations.value.length === 0){
    processing.value = true
    getNursersReservations().then((res)=>{
      console.log(res)
    }).finally(()=>{
    processing.value = false
    })
  }
})
const confirmModal = ref(false)
const selectedReservstionUuid = ref('')
const removeReservations = (uuid:string)=>{
  confirmModal.value = true
  selectedReservstionUuid.value = uuid
}
const deleteNursesConfirm = async()=>{
  processing.value = true
  deleteReservation(selectedReservstionUuid.value).then(()=>{
    reservations.value = reservations.value.filter((item)=> item._id !== selectedReservstionUuid.value)
  }).finally(()=>{
  processing.value = false
  confirmModal.value = false

  })
}
</script>

<template>
  <div>
    <AppConfirmModal :show="confirmModal" :processing="processing" @close="confirmModal = false" @cancel="confirmModal = false" @delete="deleteNursesConfirm" cateInfo="Doctor info" />
    <over-lay-loader v-if="processing" />
    <h1 class="text-2xl mt-8 mb-6 dark:text-white light:text-black">Number of <span class="font-bold">nurses</span> reservation: {{reservations.length}}</h1>
    <div class="grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
      <div class="border border-zinc-300 py-2 relative px-6 rounded-lg flex flex-col gap-1" v-for="reservation in reservations" :key="reservation._id">
        <TrashIcon class="w-6 h-6 text-red-600 cursor-pointer absolute top-3 right-3" @click="removeReservations(reservation._id)" />
        <h4 class="text-base font-semibold dark:text-white light:text-black"> weekday: <span
          class="light:text-zinc-500 dark:text-neutral-400 text-sm  ">{{ reservation.weekday ? reservation.weekday : 'Not Avaliable'}}</span></h4>
  <div class="">
      <h4 class="text-base font-semibold dark:text-white light:text-black"> month: <span class="text-zinc-500 dark:text-neutral-400 text-sm">{{ reservation.month ?
          reservation.month : 'Not Avaliable' }}</span></h4>
  </div>
  <div class="">
      <h4 class="text-base font-semibold dark:text-white light:text-black"> day: <span class="text-zinc-500 dark:text-neutral-400 text-sm">{{ reservation.day ?
          reservation.day : 'Not Avaliable' }}</span></h4>
  </div>
  <div class="">
      <h4 class="text-base font-semibold dark:text-white light:text-black"> total paid: <span
              class="text-zinc-500 dark:text-neutral-400 text-sm">{{ reservation.startAt ? reservation.startAt : 'Not Avaliable'}}</span></h4>
  </div>
  <div class="">
      <h4 class="text-base font-semibold dark:text-white light:text-black"> total paid: <span
              class="text-zinc-500 dark:text-neutral-400 text-sm">{{ reservation.endAt ? reservation.endAt : 'Not Avaliable'}}</span></h4>
  </div>
      </div>
    </div>
  </div>
</template>


<style>

</style>