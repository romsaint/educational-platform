import { useEffect } from "react";
import ApexCharts from "apexcharts"; // Импортируем ApexCharts

export const DateChartComponent = ({
  monthTasks,
}: {
  monthTasks: [{ [key: string]: any }] | null;
}) => {
  console.log(monthTasks)
  useEffect(() => {
    if (monthTasks) {
      const options = {
        chart: {
          type: "line",
          height: 400,
          width: 400,
          id: "line-chart", // Уникальный идентификатор для графика
        },
        series: [
          {
            name: "Solved",
            data: [...monthTasks?.map((val) => val.count)],
          },
        ],
        xaxis: {
          categories: [...monthTasks?.map((val) => val.created_day)],
        },
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      // Очистка функции для уничтожения графика при размонтировании компонента
      return () => {
        chart.destroy();
      };
    }
  }, [monthTasks]);

  return <div id="chart" style={{ width: "450px", height: "450px" }}></div>;
};
