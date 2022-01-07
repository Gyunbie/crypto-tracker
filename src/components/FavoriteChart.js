import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function FavoriteChart({ data }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    events: [],
    elements: {
      point: { radius: 0 },
    },
    layout: {
      padding: {
        left: -10,
        bottom: -10,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} height={40} width={100} />
    </div>
  );
}

export default FavoriteChart;
