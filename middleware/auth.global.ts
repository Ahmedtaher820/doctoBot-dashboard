export default defineNuxtRouteMiddleware((to)=>{
    if(process.server) return true
    // const token = localStorage.getItem('token')
    // console.log(token)
    // if(!token && to.name !== 'login') return navigateTo('/login')

})