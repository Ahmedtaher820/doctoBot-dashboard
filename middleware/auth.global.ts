export default defineNuxtRouteMiddleware((to)=>{

    if(process.server) return true
    const token = localStorage.getItem('admin-token')
    console.log(token)
    if(!token && to.name !== 'login') return navigateTo('/login')
    if(token && to.name === 'login') return navigateTo('/')
})