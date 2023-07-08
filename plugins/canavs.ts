import CanvasJSChart from 'canvasjs/vue-charts';
export default defineNuxtPlugin((nuxtapp)=>{
    nuxtapp.vueApp.use(CanvasJSChart)
})