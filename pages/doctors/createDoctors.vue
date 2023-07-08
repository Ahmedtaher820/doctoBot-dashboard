<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core"
import { required, minLength, email } from "@vuelidate/validators"
import { toast } from 'vue3-toastify'
import {doctorsAuth} from "@/store/doctors"

import { useDoctors } from "~/composables/useState"
const doctorsState = useDoctors()

const formDataImage = reactive({
  image: null,
})
const formData = reactive({
  name: 'ahmed',
  email: 'et89@gmail.com',
  contactNumber: '01008203698',
  specialiaty: 'Cardiology',
  address: 'kfs',
  educationYears: '20',
  experienceYears: '20',
  age: '12',
  whatsapp: '0108203698',
  image: null,
  rating: '3',
  price: '3',

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
  specialiaty: {
    required,
  },
  educationYears: {
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

const processing = ref(false)
const {createDoctor} = doctorsAuth()
const errHandle = reactive<{[key: string]: string[]}>({})
const category = ref('')
const token = ref('')
if(process.client){
  token.value = JSON.parse(localStorage.getItem('admin-token'))
}
const submitForm = async() => {
  console.log(token.value)
  category.value = ''
  for (const prop in errHandle)
    delete errHandle[prop]
  if(formData.specialiaty.toLowerCase() !== ('cardiology' || 'dermatology' || 'endocrinology' || 'gastroenterology' || 'neurology' || 'pediatrics' || 'psychiatry' || 'surgery')){
      category.value = `specialiaty: ${formData.specialiaty} is not a valid value for specialiaty.`
      return
    }
  // $v.value.$touch()
  if ($v.value.$invalid || processing.value)
    return
  // processing.value = true  
  // const rawResponse = await fetch('https://doctobot.onrender.com/doctobot/doctors',{
    //   method:'POST',
    //   headers: {
      //     Authorization: `Bearer ${token.value}`
      //   },
      //   body:JSON.stringify(formData)
      // })
      // const content = await rawResponse.json();
      console.log(formData)
  createDoctor(formData).then((res)=>{
    console.log(res.data)
    doctorsState.value.push(res.data)
    category.value = ''
    toast.success('Item created successfully')
    navigateTo('/doctors')
  }).catch((err)=>{
    errHandle['message'] = err.message
    console.log(errHandle.message)
  }).finally(()=>{
  processing.value = false  

  })
}
const getImage = (event)=>{
  const imageFormat = new FormData()
  // formData.image = `${event.target.files[0]}`
  formData.image = `{}`
}
const showModal = ref(true)
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
          <input type="text" class="w-full" placeholder=" " v-model="formData.specialiaty" />
          <label>specialiaty</label>
          <div class="input-errors" v-for="error of $v.specialiaty.$errors" :key="error.$uid">
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
          <input type="number"  class="w-full" placeholder=" " v-model="formData.rating" />
          <label>Rating</label>
          <div class="input-errors" v-for="error of $v.rating.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-field ">
          <input type="number" class="w-full" placeholder=" " v-model="formData.educationYears" />
          <label>Education Years</label>
          <div class="input-errors" v-for="error of $v.educationYears.$errors" :key="error.$uid">
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
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
            accept="image/*"
        maxlength="1"

            id="default_size" type="file" @change="getImage">
        </div>
        <p class="error-msg" v-if="errHandle?.message?.length > 0">
          {{ errHandle?.message }}
        </p>
        <p class="error-msg" v-if="category.length > 0">
          {{ category }}
        </p>
        <FormBaseButton type="submit"  :processing="processing" custome-bg="bg-green-500" class="text-white py-2 w-1/4 ms-auto md:mt-6 disabled:bg-green-400 rounded-none">Create
        </FormBaseButton>
      </form>
    </div>
  </div>
</template>
  
<style></style>