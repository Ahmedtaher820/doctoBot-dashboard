
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { authStore } from "../store/auth"
import { toast } from 'vue3-toastify';
const { login } = authStore()
definePageMeta({
    layout: 'auth'
})
const formdata = reactive({
    email: '',
    password: ''
})
const rules = {
    email: {
        required,
        email,
    },
    password: {
        required,
        minLength: minLength(8)
    }
}
const v$ = useVuelidate(rules, formdata)
const processing = ref(false)
const errHandle = ref<{ value: '', status: '' }[]>([])
const errAdmin = ref('')
const handleSubmit = async () => {
    errAdmin.value = ''
    v$.value.$touch()
    if (v$.value.$invalid)
        return
    processing.value = true
    
    login(formdata).then((res)=>{
        localStorage.setItem('admin-token',JSON.stringify(res.token))
        if(res.data.role !== 'admin'){
            errAdmin.value = 'You don\'t have permission to login as admin'
            return
        }
        navigateTo('/')
    }).catch((err)=>{
        toast.error(err.message)
    }).finally(()=>{
        processing.value = false
    })
}
</script>

<template>
    <div>
        <AppAuth>
            <template #left-part>
                <div class="flex flex-col justify-start items-start md:px-16">
                    <div class="logo py-3 px-6 second-bg"></div>
                    <h2 class="text-3xl my-6 font-bold dark:text-white text-black">Sign in to your account</h2>
                    <form class="w-full flex flex-col gap-5" @submit.prevent="handleSubmit">
                        <div class="form-field pass">
                            <input type="email" class="w-full dark:text-white text-black" placeholder=" "
                                v-model="formdata.email" />
                            <label class="dark:text-white text-black">Email</label>
                            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>

                        </div>
                        <div class="form-field pass">
                            <input type="password" class="w-full dark:text-white text-black" placeholder=" "
                                v-model="formdata.password" />
                            <label class="dark:text-white text-black ">Password</label>
                            <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                        <err-msg :errors="errHandle" />
                        <p class="error-msg">
                            {{ errAdmin }}
                        </p>
                        <div class="grid">
                            <FormBaseButton :processing="processing" :disabled="processing" :class="{'cursor-none': processing}" type="submit"
                                class="hover:bg-primary-600 duration-200 font-semibold transition-all py-2">
                                Login
                            </FormBaseButton>
                        </div>

                    </form>
                </div>
            </template>
            <template #right-part>
                <div class="right-bg  py-4">
                    <div class="img-content rounded-md overflow-hidden bg-white">
                        <img src="/icons/MaskGroup6.svg" class="w-full h-full border rounded-md" alt="">
                    </div>
                </div>
            </template>
        </AppAuth>
    </div>
</template>

<style>
.img-content,
.right-bg {
    height: calc(100vh - 32px);
    min-width: 800px
}
</style>