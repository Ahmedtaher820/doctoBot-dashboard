<script lang="ts" setup>
import { authStore } from "../store/auth"
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { storeToRefs } from "pinia"
import type { User } from "@/types/types"
import { UserIcon, TrashIcon } from "@heroicons/vue/24/outline";
// const {nursesTableData} = storeToRefs(nursesStore())
const { user } = storeToRefs(authStore())
const { getLoggedUser, deleteAdmin, changeAdminData, changeAdminPass } = authStore()
const showModal = ref(false)
const formData = reactive<User>({
    name: '',
    email: '',
    role: '',
    phone: '',
})
const rules = {
    name: {
        required
    },
    role: {
        required
    },
    phone: {
        required
    },
    email: {
        required
    },
}
const v$ = useVuelidate(rules, formData)
const processing = ref(false)
const errHandle = ref<{}[]>([])
const submitData = () => {
    errHandle.value = []
    v$.value.$touch()
    if (v$.value.$invalid) {
        return
    }
    processing.value = true
    changeAdminData(formData).catch((err)=>{
        errHandle.value = err.errors
    }).finally(() => {
        processing.value = false

    })
}
const people = [
    { label: 'Male', value: 1 },
    { label: 'Female   ', value: 2 },
]
const passData = (user: User) => {
    formData.name = user.name
    formData.phone = user.phone
    formData.email = user.email
    formData.role = user.role
}
onMounted(async () => {
    if (user.value.name.length !== 0) {
        passData(user.value)
    } else {
        processing.value = true
        await getLoggedUser().then(() => {
            passData(user.value)
        }).finally(() => {
            processing.value = false
        })
    }
})
const showConfModal = ref(false)
const deleteUser = () => {
    deleteAdmin(user.value?._id)
}
const changePassModal = ref(false)

const formData2 = reactive({
    password: ''
})
const passRules = {
    password: {
        required,
        minLenght:minLength(8)
    }
}
const vPassword = useVuelidate(passRules, formData2)
const updatePass = () => {
    vPassword.value.$touch()
    if (vPassword.value.$invalid) {
        return
    }
    processing.value = true
    changeAdminPass(formData2).then((res)=>{
        navigateTo('/login')
    }
    ).finally(()=>{
        processing.value = false
    })
}
</script>
<template>
    <AppConfirmModal :show="showConfModal" :processing="processing" @close="showConfModal = false" @delete="deleteUser"
        cateInfo="User Account" />
    <over-lay-loader v-if="processing" />
    <div class="py-6 px-8 bg-white rounded-lg md:w-2/3 mx-auto">
        <div class="flex justify-between items-center">
            <AppModal @close="changePassModal = false" :show="changePassModal" title="Update Password">
                <form @submit.prevent="updatePass">

                    <div class="form-field ">
                        <input type="password" class="w-full dark:text-white text-black" placeholder=" "
                        v-model="formData2.password" />
                        <label class="dark:text-white text-black">New Password</label>
                    <div class="input-errors" v-for="error of vPassword.password.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <FormBaseButton type="submit" :processing="processing" @click="changePassModal = true"
                class="mt-6 px-6 py-2 hover:bg-primary-600 duration-300 transition-all">Update Password
            </FormBaseButton>
        </form>
            </AppModal>
            <FormBaseButton type="button" @click="changePassModal = true"
                class=" px-6 py-2 hover:bg-primary-600 duration-300 transition-all">Update Password
            </FormBaseButton>
            <TrashIcon class="w-6 h-6 text-red-600 cursor-pointer" @click="showConfModal = true" />
        </div>
        <form @submit.prevent="submitData" class="px-4 edit-form  py-6 rounded-md">
            <div class="w-12 h-12 mb-8 mx-auto">
                <UserIcon />
            </div>
            <div class="grid md:grid-cols-2 grid-cols-1 gap-8">
                <div class="form-field ">
                    <input type="text" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.name" />
                    <label class="dark:text-white text-black">Name</label>
                    <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-field ">
                    <input type="text" class="w-full dark:text-white text-black" placeholder=" " v-model="formData.phone" />
                    <label class="dark:text-white text-black">Contact Number</label>
                    <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-field ">
                    <input type="email" class="w-full dark:text-white text-black" placeholder=" "
                        v-model="formData.email" />
                    <label class="dark:text-white text-black">Email</label>
                    <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-field ">
                    <input type="text" class="w-full dark:text-white disabled:bg-zinc-100 mt-1 text-black" placeholder=" "
                        v-model="formData.role" disabled />
                    <label class="dark:text-white text-black">Role</label>
                </div>
            </div>
            <p v-for="err in errHandle" class="text-red-600 my-1" :key="err">
                *{{ err.msg }}*
            </p>
            <FormBaseButton type="submit" class="mt-8 ms-auto px-6 py-2 hover:bg-primary-600 duration-300 transition-all">
                Update
            </FormBaseButton>
        </form>
    </div>
</template>
  
  
<style></style>