<script setup lang="ts">
const doctor= defineAsyncComponent(()=>import('../components/Doctors/Reservations.vue'))
const nurses= defineAsyncComponent(()=>import('../components/Nurses/NursesReservations.vue'))
const Tabs = ref([
    {
        name:'Doctors Reservations',
        component: doctor
    },
    {
        name:'Nurses Reservations',
        component: nurses
    }
    ])
    const activeIndex = ref(0)
    const activeTabIndex = computed(()=>{
        return Tabs.value.find((tab,index)=> index === activeIndex.value) || Tabs.value[0]
    })
    const selectActiveIndex = (index:number)=>{
      console.log(index)
        activeIndex.value = index
    }
</script>
<template>
    <div>
        <div>
            <div class="sm:hidden">
              <label for="tabs" class="sr-only">Select a tab</label>
              <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
              <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option v-for="(tab,index) in Tabs" :key="tab.name" @click="selectActiveIndex(index)">{{ tab.name }}</option>
              </select>
            </div>
            <div class="hidden sm:block">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                  <a v-for="(tab,index) in Tabs" :key="tab.name"  :class="[index === activeIndex ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer']" @click.prevent="selectActiveIndex(index)" :aria-current="index === activeIndex ? 'page' : undefined">{{ tab.name }}</a>
                </nav>
              </div>
            </div>
          </div>
        
        <keep-alive>
          <transition>
            <component :is="activeTabIndex.component" />
          </transition>
        </keep-alive>
    </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active{
  transition: all .5s ease-in;
}
.v-enter-from,
.v-leave-to{
  opacity: 0;
  transform: translateX(-10px);
}
</style>