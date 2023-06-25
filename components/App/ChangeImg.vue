<script lang="ts" setup>
import { TrashIcon } from "@heroicons/vue/24/outline"
import { PropType } from "nuxt/dist/app/compat/capi"
import { emit } from "process"
const props = defineProps({
    link:{
        type: String,
        default: ''
    },
    modelValue:{
        type: File as PropType<File | null>
    }
})
const emits = defineEmits(['update:modelValue'])
const file = ref()
const formData = reactive({
    image:null
})
const changeImage = ()=>{
    file.value.click()
}
// @ts-ignore
const changeFile = (event)=>{
    formData.image = event.target.files[0]
    emits('update:modelValue' , event.target.files[0])
}
</script>
<template>
    <div class="flex items-center gap-6">
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="users image" class="w-32 h-32 rounded-full object-contain">
        <div class="flex flex-col gap-3">
            <button class="bg-primary py-2 px-4 border-none text-white text-sm" @click="changeImage">Change photo</button>
            <input type="file" class="hidden" ref="file" @change="changeFile($event)">
            <button class="bg-white py-2 px-4 border text-zinc-500 text-sm flex items-center gap-2"><TrashIcon class="w-4 h-4 text-red-600" /> <span>Delete</span></button>
        </div>
    </div>
</template>