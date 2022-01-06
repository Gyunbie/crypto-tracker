import FavoriteChart from "./FavoriteChart";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function FavoriteItem({
  coin,
  image,
  symbol,
  chg_24h,
  vol_24h,
  price,
  favorites,
  setFavorites,
}) {
  const [chartData, setChartData] = useState({ datasets: [] });

  // Favoriting logic
  const handleFavoriteClick = () => {
    const prev_favorites = [...favorites];

    if (prev_favorites.includes(coin)) {
      setFavorites(prev_favorites.filter((arr_coin) => arr_coin !== coin));
    } else {
      prev_favorites.push(coin);
      setFavorites(prev_favorites);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1`
      )
      .then((res) => {
        const data = res.data;

        setChartData({
          labels: data.prices.map((step) => {
            const time = new Date(step[0]);

            return time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }),
          datasets: [
            {
              data: data.prices.map((step) => step[1]),
              borderColor: "#00b300",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mb-1 shadow-sm sm:min-w-[410px] lg:min-w-[620px] relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={`p-2 mx-[-6px] my-[-6px] h-8 w-8 absolute top-0 right-0 cursor-pointer duration-100 ${
          favorites.includes(coin) ? "fill-yellow-500" : "hover:fill-yellow-500"
        }`}
        onClick={() => handleFavoriteClick()}
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>

      <Link
        to={`coins/${coin.id}`}
        className="flex items-center bg-gray-300 p-2"
      >
        <div className="border border-gray-500 rounded-lg p-1 mr-2 min-w-[86px]">
          <div className="flex items-center">
            <img src={image} alt="" className="hidden sm:block h-6 w-6 mr-1" />
            <p className="font-bold text-gray-500 mx-auto">{symbol}</p>
          </div>
        </div>

        <div className="hidden lg:inline-block mr-2 min-w-[240px]">
          <p className="whitespace-nowrap">
            <b>Change (24h): </b>
            {+chg_24h.toFixed(8)}
          </p>
          <p className="whitespace-nowrap">
            <b>Volume (24h): </b>
            {+vol_24h.toFixed(2)}
          </p>
        </div>

        <div className="mr-2 flex-grow">
          <h1 className="md:text-lg font-semibold min-w-[80px]">
            ${+price.toFixed(8)}
          </h1>
        </div>

        <div className="border border-gray-500 rounded-md text-right flex-grow max-w-[100px]">
          <FavoriteChart data={chartData} />
        </div>
      </Link>
    </div>
  );
}

export default FavoriteItem;
