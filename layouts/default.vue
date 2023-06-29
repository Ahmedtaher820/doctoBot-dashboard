
<script setup>
</script>
<template>
    <div>
        <app-navigation />
        <div class="md:px-16 px-8  pt-8 pb-4 content    bg-bodyColorLight dark:bg-bodyColorDark" style="background-color: ">
            <NuxtLoadingIndicator />
            <slot />
        </div>
    </div>
</template>
<style>
.content{
    min-height: calc(100vh - 64px);
}
</style>