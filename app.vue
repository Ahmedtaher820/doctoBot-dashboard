
<script setup>
useHead({
  titleTemplate: (titleChunk) =>{
    return titleChunk? `${titleChunk} - DoctoBot` : 'DoctoBot'
  }
})

</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<style>


</style>