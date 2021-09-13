import { calcDmgDealt } from "./dmgCalc.js";
import { bossesData } from "./bossesData.js";

const canvas = document.getElementById("chart").getContext("2d");
const chartSetup = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Changing Armor Break",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
      {
        label: "Changing Boss Damage",
        backgroundColor: "rgba(99, 99, 132, 0.2)",
        borderColor: "rgba(99, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: renamingTitle,
          label: renamingLabel,
        },
      },
    },
  },
};
const myChart = new Chart(canvas, chartSetup);

// Fixing tooltip functions
// 1-Fixing the title
function renamingTitle([chart]) {
  const values = chart.label.split(",");

  let txtAdded;
  if (chart.dataset.label === "Changing Armor Break" && chart.dataIndex !== 0) {
    return values[0];
  } else if (chart.dataIndex === 0) {
    return values;
  } else txtAdded = " BD";
  return values[1];
}
// 2-Fixing the description
function renamingLabel(chart) {
  return chart.formattedValue + " Damage dealt";
}

// Creating chart updater to associate with new user input
function updateChart(chart, newMergedLabel, newSelectedBoss) {
  // Change label with new values
  chart.data.labels = newMergedLabel;
  // Change data set 1
  chart.data.datasets[0].data = calcDmgDealt(
    bossesData[newSelectedBoss]
  ).changeAB;
  // Change data set 2
  chart.data.datasets[1].data = calcDmgDealt(
    bossesData[newSelectedBoss]
  ).changeBD;
  // Invoke the update
  chart.update();
}
// #region Code that might be useful in "OTHER" sites
// If we need to add scales use this inside the myChart above
// myChart.options.scales = {
//   x2: {
//     type: "linear",
//     display: true,
//     position: "right",
//     ticks: {
//       callback: function (value, indx, context) {
//         console.log(context);
//         return labelBD[indx];
//       },
//     },

//     // grid line settings
//     grid: {
//       drawOnChartArea: false, // only want the grid lines for one axis to show up
//     },
//   },
//   x1: {
//     type: "linear",
//     display: true,
//     position: "right",
//     ticks: {
//       callback: function (value, indx, context) {
//         console.log(context);
//         return labelAB[indx];
//       },
//     },
//     // grid line settings
//     grid: {
//       drawOnChartArea: true, // only want the grid lines for one axis to show up
//     },
//   },
// };
//#endregion

// Bind the myChart object to the function so the const waits for other 2 inputs only
const myChartUpdate = updateChart.bind(null, myChart);
export { myChartUpdate, chartSetup };
