import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Импортируем Chart.js

export const ChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null); // Создаем ref для canvas
  useEffect(() => {
    // Инициализация диаграммы
    const canvas = chartRef.current; // Получаем элемент canvas через ref

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const myChart = new Chart(ctx, {
          type: "pie", // Тип диаграммы (pie, bar, line и т.д.)
          data: {
            labels: ["Easy", "Medium", "Hard"],
            datasets: [
              {
                label: "My Dataset",
                data: [12, 19, 3],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Level Pie Chart",
              },
            },
          },
        });

        // Очистка функции для уничтожения диаграммы при размонтировании компонента
        return () => {
          myChart.destroy();
        };
      }
    }
  }, []);

  return (
    <div className="mb-8 h-[400px]">
      <canvas ref={chartRef} style={{'width': '400px', 'height': '400px'}}></canvas>
    </div>
  );
};