  
  <script setup lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi"

  const props = defineProps({
    btnText:{
      type: String,
      default:'Add user'
    },
    tableInfo : {
      type: Array as PropType<{}[] | undefined> 
    }
  })
  const emits = defineEmits(['view','delete','add'])
  const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
  ]
const text = ref([
  {
    name:'doctors',
    add:'/doctors/createDoctors',
    textContent:'A list of all the doctors in your account including their name, title, email and role.'
  },
  {
    name:'nurses',
    add:'/nurses/createNurses',

    textContent:'A list of all the nurses in your account including their name, title, email and role.'
  },
  {
    name:'users',
    add:'/users/createUsers',

    textContent:'A list of all the users in your account including their name, title, email and role.'
  },
])
const router = useRoute()
const checkText = computed(()=>{
    return text.value.find((item)=> item.name === router.name)
})
  </script>
<template>
    <div class="px-4 sm:px-6 lg:px-8 bg-white py-8 rounded-2xl">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">{{`${$route.name.charAt(0).toUpperCase()}${$route.name.slice(1)}`}}</h1>
          <p class="mt-2 text-sm text-gray-700">{{checkText.textContent}}</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <router-link :to="{path:checkText.add}"  class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{`Add ${$route.name}`}}</router-link>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300 mt-4">
              <thead class="px-4 border-t border-t-gray-300">
                <slot name="grid-header" />
               
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <slot />
              </tbody> 
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
