<script lang="ts" setup>
import {nursesStore} from "@/store/nurses"
import { useVuelidate } from "@vuelidate/core"
import { required, minLength, email } from "@vuelidate/validators"
import { toast } from 'vue3-toastify';
const formDataImage = reactive({
  image: null,
})
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

const processing = ref(true)
const {createNurses} = nursesStore()
const submitForm = () => {

  // $v.value.$touch()
  // if ($v.value.$invalid || processing.value)
  //   return
  createNurses(formData).then((res)=>{
        console.log(res)
  })
}
const getImage = (event)=>{
  formData.image = event.target.files[0]
}
</script>

<template>
  <div class="bg-white py-3 px-6 rounded-2xl">
    <div class="header">
      <h2 class="text-2xl mb-1 font-semibold">New Doctors</h2>
      <p class="text-sm text-zinc-500">Add new doctors with name, phone, email, password, city</p>
    </div>
    <div class="grid grid-cols-2 md:mt-16 mt-8 md:place-items-start">
      <AppChangeImg v-model="formDataImage.image" class="md:col-span-1 col-span-2" />
      <form @submit.prevent="submitForm" class="md:w-2/3 flex flex-col mt-8 md:mt-0 gap-6 md:col-span-1 col-span-2" >
        <div class="form-field pass">
          <input type="text" class="w-full" placeholder=" " v-model="formData.name" />
          <label>Name</label>
          <div class="input-errors" v-for="error of $v.name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-field ">
          <input type="text" class="w-full" placeholder=" " v-model="formData.shift" />
          <label>Shift</label>
          <div class="input-errors" v-for="error of $v.shift.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-field ">
          <input type="text" class="w-full" placeholder=" " v-model="formData.contactNumber" />
          <label>Contact Number</label>
          <div class="input-errors" v-for="error of $v.contactNumber.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-field">
          <input type="email" class="w-full" placeholder=" " v-model="formData.email" />
          <label>Email</label>
          <div class="input-errors" v-for="error of $v.email.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-field">
          <input type="text" class="w-full" placeholder=" " v-model="formData.address" />
          <label>Address</label>
          <div class="input-errors" v-for="error of $v.address.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-field ">
          <input type="number" class="w-full" placeholder=" " v-model="formData.price" />
          <label>Price</label>
          <div class="input-errors" v-for="error of $v.price.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-field ">
          <input type="number" class="w-full" placeholder=" " v-model="formData.rating" />
          <label>Rating</label>
          <div class="input-errors" v-for="error of $v.rating.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-field ">
          <input type="number" class="w-full" placeholder=" " v-model="formData.experienceYears" />
          <label>Experience Years</label>
          <div class="input-errors" v-for="error of $v.experienceYears.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-field ">
          <input type="number" class="w-full" placeholder=" " v-model="formData.age" />
          <label>Age</label>
          <div class="input-errors" v-for="error of $v.age.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="default_size">Doctor image</label>
          <input
            class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
            id="default_size" type="file" @change="getImage">
        </div>
        <FormBaseButton type="submit" custome-bg="bg-green-500" class="text-white w-1/4 ms-auto md:mt-6 rounded-none">Create
        </FormBaseButton>
      </form>
    </div>
  </div>
</template>
  
<style></style>