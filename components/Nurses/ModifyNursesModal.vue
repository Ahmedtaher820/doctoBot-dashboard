
<script lang="ts" setup>
import { Nurses } from "~/types/types"
import { useVuelidate } from "@vuelidate/core"
import { required, minLength, email } from "@vuelidate/validators"
import { toast } from 'vue3-toastify'
import { nursesStore } from "@/store/nurses"
const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    },
    nurses: {
        type: Object as PropType<Nurses | undefined>
    }
})
const emits = defineEmits(['close'])

const formData = reactive({
    name: '',
    email: '',
    contactNumber: '',
    shift: '',
    address: '',
    experienceYears: '',
    age: '',
    whatsapp: '',
    image: null,
    rating: '',
    price: '',
})
const rules = {
    name: {
        required,
        minLength: minLength(3)
    },
    email: {
        required,
        email,
    },
    shift: {
        required,
    },
    experienceYears: {
        required,

    },
    address: {
        required
    },
    contactNumber: {
        required
    },
    age: {
        required
    },
    whatsapp: {
        required
    },
    rating: {
        required
    }, price: {
        required
    }
}
const $v = useVuelidate(rules, formData)
const imgUrl = ref('')
const { nurses } = toRefs(props)
watch(() => nurses?.value, (val: Nurses) => {
    formData.name = nurses?.value?.name || ''
    formData.shift = nurses?.value?.shift || ''
    formData.contactNumber = nurses?.value?.contactNumber || ''
    formData.email = nurses?.value?.email || ''
    formData.address = nurses?.value?.address || ''
    formData.price = nurses?.value?.price || '100'
    formData.rating = nurses?.value?.rating || ''
    formData.experienceYears = nurses?.value?.experienceYears || ''
    formData.age = nurses?.value?.age || ''
    imgUrl.value = nurses?.value?.image || ''
})
const showModal = ref(true)
const processing = ref(false)
const { updateNurses } = nursesStore()
const submitForm = () => {
    $v.value.$touch()
    if ($v.value.$invalid || processing.value)
        return
    updateNurses(formData).then((res) => {
        console.log(res)
    })
}
const getImage = (event) => {
    formData.image = event.target.files[0]
}
</script>
<template>
    <AppModal :show="showModal" @close="$emit('close')" title="Update Nurses">
        <form @submit.prevent="submitForm" class=" flex flex-col mt-8 md:mt-0 gap-6 md:col-span-1 col-span-2">
            <div class="form-field pass">
                <input type="text" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.name" />
                <label class="dark:text-white text-black">Name</label>
                <div class="input-errors" v-for="error of $v.name.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>

            <div class="form-field ">
                <input type="text" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.shift" />
                <label class="dark:text-white text-black">Shift</label>
                <div class="input-errors" v-for="error of $v.shift.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>

            <div class="form-field ">
                <input type="text" class="w-full dark:text-white text-black" placeholder=" "
                    v-model="formData.contactNumber" />
                <label class="dark:text-white text-black">Contact Number</label>
                <div class="input-errors" v-for="error of $v.contactNumber.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>

            <div class="form-field">
                <input type="email" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.email" />
                <label class="dark:text-white text-black">Email</label>
                <div class="input-errors" v-for="error of $v.email.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>

            <div class="form-field">
                <input type="text" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.address" />
                <label class="dark:text-white text-black">Address</label>
                <div class="input-errors" v-for="error of $v.address.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="form-field ">
                <input type="number" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.price" />
                <label class="dark:text-white text-black">Price</label>
                <div class="input-errors" v-for="error of $v.price.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="form-field ">
                <input type="number" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.rating" />
                <label class="dark:text-white text-black">Rating</label>
                <div class="input-errors" v-for="error of $v.rating.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>

            <div class="form-field ">
                <input type="number" class="w-full dark:text-white text-black" placeholder=" "
                    v-model="formData.experienceYears" />
                <label class="dark:text-white text-black">Experience Years</label>
                <div class="input-errors" v-for="error of $v.experienceYears.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>

            <div class="form-field ">
                <input type="number" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.age" />
                <label class="dark:text-white text-black">Age</label>
                <div class="input-errors" v-for="error of $v.age.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="default_size">Doctor
                    image</label>
                <div
                    class="relative flex items-center  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-1">

                    <input
                        class="block  w-full  text-sm text-gray-900 cursor-pointer  dark:text-gray-400 focus:outline-none  p-2"
                        id="default_size" type="file" @change="getImage">
                    <img class="w-16 h-16 rounded-full " :src="imgUrl" alt="">
                </div>
            </div>
            <FormBaseButton type="submit" custome-bg="bg-green-500" class="text-white w-1/4 ms-auto md:mt-6 rounded-none">
                Create
            </FormBaseButton>
        </form>
    </AppModal>
</template>