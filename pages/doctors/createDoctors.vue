<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core"
import { required, minLength, email } from "@vuelidate/validators"
const formDataImage = reactive({
  image: null,
})
const formData = reactive({
   name: '',
   email: '',
   contactNumber: '',
   specialiaty:'',
   address:'',
   educationYears:'',
   experienceYears:'',
   age:'',
   whatsapp:'',
   image:null,
   rating:''
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
  educationYears:{
    required,

  },
  experienceYears:{
    required,
    
  },
  address: {
    required
  },
  contactNumber: {
    required
  },
  age:{
    required
  },
   whatsapp:{
    required
   },
   rating:{
    required
   }
}
const $v = useVuelidate(rules, formData)
const processing = ref(true)
const submitForm = () => {
  $v.value.$touch()
  if($v.value.$invalid || processing.value)
    return

}
</script>

<template>
  <div class="bg-white py-3 px-6 rounded-2xl">
    <div class="header">
      <h2 class="text-2xl mb-1 font-semibold">New Doctors</h2>
      <p class="text-sm text-zinc-500">Add new doctors with name, phone, email, password, city</p>
    </div>
    <div class="grid grid-cols-2 md:mt-16 mt-8 place-items-start">
      <AppChangeImg v-model="formDataImage.image" />
      <form @submit.prevent="submitForm" class="w-2/3 flex flex-col gap-6">
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
        <FormBaseButton type="submit" custome-bg="bg-green-500" class="text-white w-1/4 ms-auto mt-6 rounded-none">Create</FormBaseButton>
      </form>
    </div>
  </div>
</template>
  
<style></style>