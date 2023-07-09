<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon, CogIcon  } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/20/solid'

// const colorMode = useColorMode()
const nav = ref([
  {
    path: '/',
    name: 'Home',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26">
  <g id="vuesax_bold_home-2" data-name="vuesax/bold/home-2" transform="translate(-605 -176)">
    <g id="home-2" transform="translate(605 176)">
      <path id="Vector" d="M19.552,5.219,13.313.853A5.256,5.256,0,0,0,7.366.994L1.939,5.229A5.581,5.581,0,0,0,0,9.172v7.474a5.016,5.016,0,0,0,5,5.015H16.681a5.007,5.007,0,0,0,5-5V9.313A5.528,5.528,0,0,0,19.552,5.219Zm-7.9,12.11a.812.812,0,0,1-1.625,0v-3.25a.812.812,0,1,1,1.625,0Z" transform="translate(2.157 2.17)" fill="#fff"/>
      <path id="Vector-2" data-name="Vector" d="M0,0H26V26H0Z" transform="translate(26 26) rotate(180)" fill="none" opacity="0"/>
      </g>
      </g>
      </svg>
      
      `
    },
  {
    path: '/doctors',
    name: 'Doctors',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26">
  <g id="vuesax_linear_profile-2user" data-name="vuesax/linear/profile-2user" transform="translate(-172 -252)">
    <g id="profile-2user" transform="translate(172 252)">
      <path id="Vector" d="M4.983,9.609a1.969,1.969,0,0,0-.358,0,4.815,4.815,0,1,1,.358,0Z" transform="translate(4.94 2.167)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-2" data-name="Vector" d="M.141,0A3.789,3.789,0,0,1,3.932,3.792,3.8,3.8,0,0,1,.282,7.583a1.224,1.224,0,0,0-.282,0" transform="translate(17.637 4.333)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-3" data-name="Vector" d="M1.966,1.487C-.655,3.242-.655,6.1,1.966,7.846a10.58,10.58,0,0,0,10.844,0c2.622-1.755,2.622-4.615,0-6.359A10.63,10.63,0,0,0,1.966,1.487Z" transform="translate(2.54 14.286)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-4" data-name="Vector" d="M0,6.5a5.24,5.24,0,0,0,2.123-.943,2.744,2.744,0,0,0,0-4.626A5.388,5.388,0,0,0,.033,0" transform="translate(19.868 15.167)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-5" data-name="Vector" d="M0,0H26V26H0Z" transform="translate(26 26) rotate(180)" fill="none" opacity="0"/>
      </g>
      </g>
      </svg>
      
      `
  },
  {
    path: '/nurses',
    name: 'Nurses',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26">
      <g id="vuesax_linear_hospital" data-name="vuesax/linear/hospital" transform="translate(-748 -188)">
    <g id="hospital" transform="translate(748 188)">
      <path id="Vector" d="M0,0H21.667" transform="translate(2.167 23.833)" fill="#a5a5a5" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-2" data-name="Vector" d="M15.167,0H4.333C1.083,0,0,1.939,0,4.333V21.667H19.5V4.333C19.5,1.939,18.417,0,15.167,0Z" transform="translate(3.25 2.167)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-3" data-name="Vector" d="M5.492,0H1.018A1.024,1.024,0,0,0,0,1.018V7.583H6.5V1.018A1,1,0,0,0,5.492,0Z" transform="translate(9.739 16.25)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <g id="Group" transform="translate(10.292 6.5)">
        <path id="Vector-4" data-name="Vector" d="M0,0V5.417" transform="translate(2.708)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        <path id="Vector-5" data-name="Vector" d="M0,0H5.417" transform="translate(0 2.708)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </g>
        <path id="Vector-6" data-name="Vector" d="M0,0H26V26H0Z" fill="none" opacity="0"/>
        </g>
        </g>
        </svg>
        
        
        `
      },
      {
    path: '/reservations',
    name: 'Reservations',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26">
      <g id="vuesax_linear_hospital" data-name="vuesax/linear/hospital" transform="translate(-748 -188)">
    <g id="hospital" transform="translate(748 188)">
      <path id="Vector" d="M0,0H21.667" transform="translate(2.167 23.833)" fill="#a5a5a5" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-2" data-name="Vector" d="M15.167,0H4.333C1.083,0,0,1.939,0,4.333V21.667H19.5V4.333C19.5,1.939,18.417,0,15.167,0Z" transform="translate(3.25 2.167)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <path id="Vector-3" data-name="Vector" d="M5.492,0H1.018A1.024,1.024,0,0,0,0,1.018V7.583H6.5V1.018A1,1,0,0,0,5.492,0Z" transform="translate(9.739 16.25)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
      <g id="Group" transform="translate(10.292 6.5)">
        <path id="Vector-4" data-name="Vector" d="M0,0V5.417" transform="translate(2.708)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        <path id="Vector-5" data-name="Vector" d="M0,0H5.417" transform="translate(0 2.708)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </g>
        <path id="Vector-6" data-name="Vector" d="M0,0H26V26H0Z" fill="none" opacity="0"/>
        </g>
        </g>
        </svg>
        
        
        `
      },
])
const logout = ()=>{
  localStorage.clear()
  navigateTo('/login')
}
</script>
<template>
  <Disclosure as="nav" class="shadow " v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex flex-1 md:flex-none">
          <div class="-ml-2 mr-2 flex-1 flex items-center justify-between">
            <!-- Mobile menu button -->
            <div class="flex flex-shrink-0 items-center">
              <router-link to="/" class="logo">
                <img class="block h-8 w-auto lg:hidden" src="/logo.svg" alt="Your Company" />
                <img class="hidden h-8 w-auto lg:block" src="/logo.svg" alt="Your Company" />
              </router-link>
            </div>
            <DisclosureButton class="block lg:hidden items-center justify-center rounded-md p-2 text-gray-400  hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
        <div class="hidden md:ml-6 md:flex  flex-1 mx-auto justify-center">
          <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
          <router-link class="flex items-center gap-2 py-2 px-6  dark:text-white" :class="{'router-link-exact-active router-link-active': (($route.name === 'doctors' || $route.name === 'doctors-slug' || $route.name === 'doctors-createDoctors') && link.path === '/doctors') || (($route.name === 'nurses' || $route.name === 'nurses-slug' || $route.name === 'nurses-createNurses') && link.path === '/nurses')}" v-for="(link,index) in nav" :key="index" :to="link.path">
            <!-- <span v-html="link.icon" /> -->
            <span @click="open = false">{{link.name}}</span>

          </router-link>
          <!-- <a href="#" class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium ">Dashboard</a>
          <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700"></a>
          <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700">Projects</a>
          <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium  hover:border-gray-300 hover:text-gray-700">Calendar</a> -->
        </div>
        <div class="flex items-center">
          <div class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <select v-model="$colorMode.preference">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  
                  <MenuItem v-slot="{ active }">
                    <span class="block px-4 py-2 text-base font-medium text-gray-500  sm:px-6" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                      <span class="block cursor-pointer" @click="navigateTo('/profile')">Profile</span>
                    </span>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <span  :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" to="/" class="block px-4 py-2 text-base font-medium text-gray-500  sm:px-6">
                      <span class="block cursor-pointer" @click="logout">Sign out</span>
                    </span>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <router-link class="flex items-center gap-2 py-2 px-6  dark:text-white" :class="{'router-link-exact-active router-link-active': (($route.name === 'doctors' || $route.name === 'doctors-slug' || $route.name === 'doctors-createDoctors') && link.path === '/doctors') || (($route.name === 'nurses' || $route.name === 'nurses-slug' || $route.name === 'nurses-createNurses') && link.path === '/nurses')}" v-for="(link,index) in nav" :key="index" :to="link.path">
          <!-- <span v-html="link.icon" /> -->
          <span>{{link.name}}</span>

        </router-link>
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4 sm:px-6">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">Tom Cook</div>
            <div class="text-sm font-medium text-gray-500">tom@example.com</div>
          </div>
          <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1">
          
          <DisclosureButton as="a" href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Settings</DisclosureButton>
          <DisclosureButton to="/" class="block px-4 py-2 text-base font-medium text-gray-500  hover:bg-gray-100 hover:text-gray-800 w-full text-left sm:px-6">
            <span @click="logout">Sign out</span>
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>


<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
  @apply dark:bg-slate-900
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
.router-link-active,.router-link-exact-active{
  @apply bg-primary text-white dark:text-white
}
.router-link-active.logo,
.router-link-exact-active.logo{
  @apply bg-white border-none
}
</style>