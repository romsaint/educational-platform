import { useEffect } from 'react';
import ApexCharts from 'apexcharts'; // Импортируем ApexCharts

export const DateChartComponent = () => {
  useEffect(() => {
    const options = {
      chart: {
        type: 'line',
        height: 400,
        width: 400,
        id: 'line-chart', // Уникальный идентификатор для графика
      },
      series: [{
        name: 'Solved',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Очистка функции для уничтожения графика при размонтировании компонента
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div id="chart" style={{ width: '450px', height: '450px' }}></div>
  );
};