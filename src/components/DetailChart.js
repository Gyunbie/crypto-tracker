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

function DetailChart({ data }) {
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
    elements: {
      point: { radius: 0 },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Line data={data} options={options} height={40} width={150} />
    </div>
  );
}

export default DetailChart;
