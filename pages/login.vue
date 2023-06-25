
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
// import { authStore } from "../store/Auth"
// const { userLogin } = authStore()
definePageMeta({
    layout:'auth'
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
const router = useRouter()
const processing = ref(false)
const errHandle = ref<{value:'',msg:''}[]>()
const handleSubmit = () => {
    // v$.value.$touch()
    // if (v$.value.$invalid)
    //     return
    // processing.value = true    
    // userLogin(formdata).then(()=>{
    //     router.push({path:'/'})
    // }).catch((err)=>{
    //     console.log(err)
    //     // errHandle.value = err.response.data.errors
    // }).finally(()=>{
    //     processing.value = false
    // })
}
</script>

<template>
    <div>
        <overlay-loader v-if="processing" />
    <AppAuth>
        <template #left-part>
            <div class="flex flex-col justify-start items-start md:px-16">
                <div class="logo py-3 px-6 second-bg"></div>
                <h2 class="text-3xl my-6 font-bold">Sign in to your account</h2>
                <form class="w-full flex flex-col gap-5" @submit.prevent="handleSubmit">
                    <div class="form-field pass">
                        <input type="email" class="w-full" placeholder=" " v-model="formdata.email" />
                        <label>Email</label>
                        <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>

                    </div>
                    <div class="form-field pass">
                        <input type="password" class="w-full" placeholder=" " v-model="formdata.password" />
                        <label>Password</label>
                        <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <err-msg :errors="errHandle" />
                    <div class="grid">
                        <router-link to="/forgetPassword" class="mb-2 underline">
                            Forgot your password?
                        </router-link>
                        <FormBaseButton type="submit" class="hover:bg-primary-600 duration-200 transition-all">
                            Login
                        </FormBaseButton>
                        <!-- <base-button type="submit"
                            class="mt-4 relative text-black hover:shadow-md duration-200 transition-all flex items-center"
                            custome-bg="bg-white ">
                            <span class="flex-1">
                                Create With Google
                            </span>

                            <img src="/icons/google.png" class="right-4 absolute top-1" alt="">
                        </base-button>
                        <base-button type="submit"
                            class="mt-4  md:w-80 text-black hover:shadow-md duration-200 transition-all flex items-center"
                            custome-bg="bg-white relative">
                            <span class="flex-1">
                                Create An Twitter
                            </span>
                            <img src="/icons/twitter.png" class="right-4 absolute top-1" alt="">

                        </base-button> -->
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