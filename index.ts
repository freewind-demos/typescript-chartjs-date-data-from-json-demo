import Chart from 'chart.js';
import {ChartDataSets} from "chart.js";

import _ from 'lodash';

import addressesByDateJson from './data/addresses-by-date.json';
import transactionsByDateJson from './data/transactions-by-date.json';

const dataFiles = [addressesByDateJson, transactionsByDateJson]

const labels: string[] = _.sortedUniq(dataFiles.flatMap(it => Object.keys(it.data)))

function calcDataSets(): ChartDataSets[] {
  return dataFiles.map<ChartDataSets>(dataFile => {
    return {
      label: dataFile.name,
      data: labels.map(it => (dataFile.data as any)[it]),
    }
  })
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: labels,
    datasets: calcDataSets()
  },

  // Configuration options go here
  options: {}
});

