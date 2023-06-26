<template>
    <div>
      <Bar :data="chartData" :options="chartOptions" />
      
    </div>
  </template>
  <script setup>
  import { Bar, Line  } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
  import { ref } from 'vue';
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
  
  const chartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May','Jun','Jul'],
    datasets: [
      {
        label: 'Number of reservations in month',
        backgroundColor: '#77CEFF',
        data: [40, 20, 12, 50, 10,25,20],
      },
    ],
  });
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
  });
  </script>
  