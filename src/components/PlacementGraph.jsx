"use client";
import React, { useState, useEffect } from "react";
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
import { FaSquareFull } from "react-icons/fa6";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const PlacementGraph = () => {
  const [chartWidth, setChartWidth] = useState(526);
  const [chartHeight, setChartHeight] = useState(400);
  const [cardWidth, setCardWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setChartWidth(300);
        setChartHeight(300);
        setCardWidth("90%");
      } else if (window.innerWidth < 768) {
        setChartWidth(400);
        setChartHeight(350);
        setCardWidth("90%");
      } else if (window.innerWidth < 1024) {
        setChartWidth(500);
        setChartHeight(400);
        setCardWidth("85%");
      } else {
        setChartWidth(526);
        setChartHeight(400);
        setCardWidth("85%");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex justify-center overflow-hidden my-16">
      <div
        style={{ width: cardWidth }}
        className="flex flex-col justify-center bg-[#E9E9E8] p-3 sm:p-5"
      >
        <div className="flex items-center mb-5">
          <FaSquareFull className="text-[3px] md:text-[4px] lg:text-[5px] mr-1 md:mr-2 text-[#696969]" />
          <h1
            className="text-black py-3 sm:py-5 font-bebas-neue font-normal leading-tight text-[1.5rem]"
            style={{
              fontFamily: "Bebas Neue",
              fontWeight: 400,
              lineHeight: "1.2",
            }}
          >
            YEAR WISE PLACEMENT OFFERS
          </h1>
        </div>

        <div className="w-full flex justify-center items-center my-5">
          <div style={{ width: chartWidth, height: chartHeight }}>
            <Bar
              data={{
                labels: ["2007", "2008", "2009", "2010", "2011"],
                datasets: [
                  {
                    label: "Placement Offers",
                    data: [140, 120, 105, 90, 130],
                    backgroundColor: "#9E9E9E",
                  },
                ],
              }}
              options={{
                responsive: true,
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
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementGraph;
