<script lang="ts" setup>
defineProps({
    customeBg:{
        type:String,
        default:''
    },
    processing:{
      type: Boolean,
      default: false
    }
})
</script>

<template>
  <button class=" rounded-full py-2 flex justify-center items-center" :class="[customeBg ? customeBg : 'bg-primary text-white']" v-bind="$attrs">
    <TheLoader v-if="processing" />
    <slot/>
  </button>
</template>


<style>

</style>