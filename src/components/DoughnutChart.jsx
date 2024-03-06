import React from 'react'
import { Chart } from 'chart.js/auto'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const DoughnutChart = ({income, expense}) => {
    const [userIncome, setIncome] = useState(0);
    const [userExpense, setExpense] = useState(0);


    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
        setIncome(income);
        setExpense(expense);

        if(chartInstance.current){
            chartInstance.current.destroy();
        }
        
        const myChartRef = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: [
                    "Income",
                    "Expense"
                    
                ],
                datasets:[{
                    data: [userIncome, userExpense],
                    backgroundColor: [
                        'rgb(54, 162, 253',
                        'rgb(255, 99, 132',
                        
                    ],
                }]
            },
        });

        return() => {
            if(chartInstance.current){
                chartInstance.current.destroy();
            }
        }
    }, [expense, income, userIncome])
  return (
    <div>
        <canvas ref={chartRef} style={{width: "400px", height: "400px"}} />
    </div>
  )
}