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
    <h1 class="text-2xl mt-8 mb-6">Number of <span class="font-bold">nurses</span> reservation: {{reservations.length}}</h1>
    <div class="grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
      <div class="border border-zinc-300 py-2 relative px-6 rounded-lg flex flex-col gap-1" v-for="reservation in reservations" :key="reservation._id">
        <TrashIcon class="w-6 h-6 text-red-600 cursor-pointer absolute top-3 right-3" @click="removeReservations(reservation._id)" />
        <h4 class="text-base font-semibold"> place: <span class="text-zinc-500 text-sm  ">{{reservation.reservationPlace  ? reservation.reservationPlace : 'Not Avaliable'}}</span></h4>
        <div class="">
          <h4 class="text-base font-semibold"> phone: <span class="text-zinc-500 text-sm">{{reservation.phone  ? reservation.phone : 'Not Avaliable'}}</span></h4>
        </div>
        <div class="">
          <h4 class="text-base font-semibold"> paid At: <span class="text-zinc-500 text-sm">{{reservation.paidAt  ? reservation.paidAt : 'Not Avaliable'}}</span></h4>
        </div>
        <div class="">
          <h4 class="text-base font-semibold"> total paid: <span class="text-zinc-500 text-sm">{{reservation.totalPaid  ? reservation.totalPaid : 'Not Avaliable'}}</span></h4>
        </div>
        <div class="">
          <h4 class="text-base font-semibold"> is paid? : <span class=" text-sm" :class="[reservation.isPaid ? 'bg-green-400 text-white py-0.5 px-2 rounded-md' : 'bg-red-400 text-white py-1 px-2 rounded-md']">{{reservation.isPaid ? 'confirm' : 'not paied' }}</span></h4>
        </div>
      </div>
    </div>
  </div>
</template>


<style>

</style>