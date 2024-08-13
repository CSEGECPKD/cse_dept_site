"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PlacementGraph = () => {
  return (
    <div className="w-full flex justify-center overflow-hidden py-24">
      <div className="w-[85%] justify-center bg-[#E9E9E8] p-5">
      <h1 className="text-[#696969] font-bebas-neue font-normal leading-tight text-2xl sm:text-3xl md:text-[36px] lg:text-[46px] xl:text-[56px] ">
        YEAR WISE PLACEMENT OFFERS
      </h1>

        <div className="w-[526px] p-5 ">
          <Bar
            data={{
              labels: ["2007", "2008", "2009", "2010", 2011],
              datasets: [
                {
                  label: 'Placemnenet Offers',
                  data: [140, 120, 105, 90, 130],
                  backgroundColor: "#9E9E9E",
                },
              ],
            }}
            height={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  min: 60,
                  ticks: {
                    stepSize: 20,
                  },
                  grid: {
                    display: false,
                  },
                },
                x: {
                  beginAtZero: true,
                  grid: {
                    display: false,
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlacementGraph;
