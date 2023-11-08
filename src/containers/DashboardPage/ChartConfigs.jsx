import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement
);

export const mainChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
      legend: {
          display: false
      },
      title: {
          display: true
      }
  },
  scales: {
      y: {
          beginAtZero: true,
          position: 'left',
          ticks: {
              maxTicksLimit: 6,
          }
      },
      x: {
          grid: {
              display: true
          },
          ticks: {
              maxTicksLimit: 18,
              align: 'inner'
          }
      }
  },
  point: true,
  elements: {
      point: {
          pointStyle: true
      },
      line: {
          borderColor: 'rgb(95, 158, 199)',
          fill: true,
          borderWidth: 3
      }
  }
};

const satkerAplikasi = [
  'Ditjen Renhan', 
  'Biro Ortala', 
  'Biro Turdang', 
  'Biro Umum', 
  'Biro Hukum',
  'Itjen Kemhan',
  'Ditjen Strahan Kemhan',
  'Ditjen Pothan Kemhan',
  'Ditjen Kuathan Kemhan',
  'Ditjen Baranahan Kemhan',
  'Unhan Kemhan',
  'Biro TU dan Protokol',
  'Biro Kepegawaian',
  'Pusat Kelaikan',
  'Badiklat Kemhan',
  'Bainstrahan Kemhan',
  'Pusrehab Kemhan',
  'Pusdatin Kemhan',
];

const satkerData = [
  'Bainstrahan',
  'Baranahan',
  'Biro Humas',
  'Biro Turdan',
  'Ditjen Kuathan',
  'Ditjen Pothan',
  'Ditjen Strahan',
  'Inspektorat Jendral',
  'Pusdatin',
  'Puslaik',
  'Pusrehab'
];

const aplikasi = [
  24,
  19,
  1,
  17,
  1,
  3,
  12,
  12,
  18,
  6,
  7,
  17,
  6,
  7,
  27,
  16,
  2,
  19,

];

const data = [
  5,
  3,
  8,
  1,
  28,
  5,
  2,
  4,
  2,
  1,
  2,
];

const itemTotal = [
  213,
  35,
  61
  ]

const itemData = [
  'Aplikasi',
  'Data',
  'Hardware'
]

export const getMainChartData = () => {
  return {
      labels: satkerAplikasi,
      datasets: [
          {

              label: 'Value',
              data: aplikasi,
              backgroundColor: 'rgba(31, 33, 88, 0.8)',
              animation: true
          },
      ],
  };
}

export const getSecondChartData = () => {
  return {
      labels: satkerData,
      datasets: [
          {

              label: 'Value',
              data: data,
              backgroundColor: 'rgba(34, 113, 15, 0.6)',
              animation: true
          },
      ],
  };
}

export const getHardwareChartData = () => {
  return {
      labels: satkerData,
      datasets: [
          {

              label: 'Value',
              data: data,
              backgroundColor: 'rgba(34, 113, 15, 0.6)',
              animation: false
          },
      ],
  };
}

export const getEmptyData = () => {
  return {
    labels: itemData,
    datasets: [
        {

            label: 'Value',
            data: itemTotal,
            backgroundColor: 'rgba(34, 113, 15, 0.6)',
            animation: false
        },
    ],
  };
}