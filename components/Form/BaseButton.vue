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
  <button class=" rounded-full flex  justify-center items-center" :class="[customeBg ? customeBg : 'bg-primary text-white' , processing ? 'disab':'']" v-bind="$attrs" :disabled="processing">
    <TheLoader v-if="processing" />
    <slot/>
  </button>
</template>


<style>

</style>