<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { doctorsAuth } from "../../store/doctors"
import { TrashIcon } from "@heroicons/vue/24/outline";
import type { Doctors } from "@/types/types"
const { getDoctorReservations, deleteReservation, getDoctors } = doctorsAuth()
const { reservations, doctors } = storeToRefs(doctorsAuth())
const processing = ref(false)
onMounted(async () => {
    if (reservations.value.length === 0) {
        processing.value = true
        getDoctorReservations().then((res) => {
            console.log(res)
        }).finally(() => {
            processing.value = false
        })
    }
})
const confirmModal = ref(false)
const selectedReservstionUuid = ref('')
const removeReservations = (uuid: string) => {
    confirmModal.value = true
    selectedReservstionUuid.value = uuid
}
const deleteNursesConfirm = async () => {
    processing.value = true
    deleteReservation(selectedReservstionUuid.value).then(() => {
        reservations.value = reservations.value.filter((item) => item._id !== selectedReservstionUuid.value)
    }).finally(() => {
        processing.value = false
        confirmModal.value = false

    })
}
const selectDoctors = ref<Doctors | null>()
const showDoctor = async(uuid: string) => {
    console.log(uuid)
    if (doctors.value.length === 0) {
        await getDoctors().then(() => {
            console.log(doctors.value)
            console.log(selectDoctors.value)
            selectDoctors.value = doctors.value.find((item) => item._id == uuid)
        })
    } else {
        selectDoctors.value = doctors.value.find((item) => item._id == uuid)
        console.log(doctors.value)
    }
}
</script>

<template>
    <div>
        <AppConfirmModal :show="confirmModal" :processing="processing" @close="confirmModal = false"
            @cancel="confirmModal = false" @delete="deleteNursesConfirm" cateInfo="Doctor info" />
        <over-lay-loader v-if="processing" />
        <h1 class="text-2xl mt-8 mb-6">Number of <span class="font-bold">doctors</span> reservation: {{ reservations.length }}
        </h1>
        <div class="grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
            <div class="border border-zinc-300 py-2 relative px-6 rounded-lg flex flex-col gap-1"
                v-for="reservation in reservations" :key="reservation._id">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mb-2" viewBox="0 0 15 15">
                    <path fill="#888888"
                        d="M5.5 7A2.5 2.5 0 0 1 3 4.5v-2a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v2a3.49 3.49 0 0 0 1.51 2.87A4.41 4.41 0 0 1 5 10.5a3.5 3.5 0 1 0 7 0v-.57a2 2 0 1 0-1 0v.57a2.5 2.5 0 0 1-5 0a4.41 4.41 0 0 1 1.5-3.13A3.49 3.49 0 0 0 9 4.5v-2A1.5 1.5 0 0 0 7.5 1H7a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v2A2.5 2.5 0 0 1 5.5 7m6 2a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" />
                </svg> -->
                <TrashIcon class="w-6 h-6 text-red-600 cursor-pointer absolute top-3 right-3"
                    @click="removeReservations(reservation._id)" />
                <h4 class="text-base font-semibold"> place: <span
                        class="text-zinc-500 text-sm  ">{{ reservation.reservationPlace ? reservation.reservationPlace : 'Not Avaliable'}}</span></h4>
                <div class="">
                    <h4 class="text-base font-semibold"> phone: <span class="text-zinc-500 text-sm">{{ reservation.phone ?
                        reservation.phone : 'Not Avaliable' }}</span></h4>
                </div>
                <div class="">
                    <h4 class="text-base font-semibold"> paid At: <span class="text-zinc-500 text-sm">{{ reservation.paidAt ?
                        reservation.paidAt : 'Not Avaliable' }}</span></h4>
                </div>
                <div class="">
                    <h4 class="text-base font-semibold"> total paid: <span
                            class="text-zinc-500 text-sm">{{ reservation.totalPaid ? reservation.totalPaid : 'Not Avaliable'}}</span></h4>
                </div>
                <div class="">
                    <h4 class="text-base font-semibold"> is paid? : <span class=" text-sm"
                            :class="[reservation.isPaid ? 'bg-green-400 text-white py-0.5 px-2 rounded-md' : 'bg-red-400 text-white py-1 px-2 rounded-md']">{{ reservation.isPaid
                                ? 'confirm' : 'not paied' }}</span></h4>
                </div>
                
        </div>
    </div>
</div></template>


<style></style>