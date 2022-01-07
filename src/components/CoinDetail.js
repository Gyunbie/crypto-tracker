import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import DetailChart from "./DetailChart";

function CoinDetail() {
  const coin = useParams();
  const [chartData, setChartData] = useState({ datasets: [] });
  const [coinData, setCoinData] = useState({});
  const [newsData, setNewsData] = useState({ data: [] });

  const fetch_from_gecko = useCallback(
    (days) => {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
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
    },
    [coin.id]
  );

  useEffect(() => {
    fetch_from_gecko(1);

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      )
      .then((res) => {
        setCoinData(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(
        `https://cryptonews-api.com/api/v1?tickers=${coinData.symbol?.toUpperCase()}&items=20&token=bh8fu4a4o5sjyrpykry81sie461yskvsvjhphhub`
      )
      .then((res) => {
        setNewsData(res.data);
      })
      .catch((error) => console.log(error));
  }, [coin.id, coinData.symbol, fetch_from_gecko]);

  return (
    <div className="py-10 px-3 md:p-10 relative">
      <Link
        to="/"
        className="absolute top-3 left-3 bg-green-300 p-3 rounded-md font-bold decoration-transparent hover:scale-105 duration-150 ease-out"
      >
        HOME PAGE
      </Link>
      <div className="md:w-4/5 mx-auto mb-5 mt-10 lg:mt-0">
        <div className="md:flex mb-3 items-end">
          <div className="flex items-center">
            <img
              src={coinData.image?.small}
              className="h-6 w-6 sm:h-8 sm:w-8 lg:h-[50px] lg:w-[50px] mb-0.5 mr-2"
              alt=""
            />
            <h1 className="text-3xl lg:text-6xl font-bold mr-0.5">
              {coinData.name}
            </h1>
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-500">
              {coinData.symbol?.toUpperCase()}
            </h1>
            <div className="flex-grow">
              <h1 className="text-3xl lg:text-6xl font-bold text-right mr-1">
                ${coinData.market_data?.current_price?.usd}
              </h1>
            </div>
          </div>
          <div className="flex md:flex-col justify-end ml-1">
            <h1 className="lg:text-xl font-bold text-green-500 pr-2 sm:pr-0">
              24H High - ${coinData.market_data?.high_24h?.usd}
            </h1>
            <h1 className="lg:text-xl font-bold text-red-500">
              24H Low - ${coinData.market_data?.low_24h?.usd}
            </h1>
          </div>
        </div>
        <p
          className="ml-1 text-justify"
          dangerouslySetInnerHTML={{ __html: coinData.description?.en }}
        ></p>
      </div>

      <div className="md:w-4/5 mx-auto flex flex-col">
        <DetailChart data={chartData} />

        <div className="text-right mt-1">
          <button
            onClick={() => fetch_from_gecko(1)}
            className="w-10 p-2 bg-blue-500 rounded-lg text-white font-bold ml-3"
          >
            1D
          </button>
          <button
            onClick={() => fetch_from_gecko(7)}
            className="w-10 p-2 bg-blue-500 rounded-lg text-white font-bold ml-3"
          >
            7D
          </button>
          <button
            onClick={() => fetch_from_gecko(30)}
            className="w-10 p-2 bg-blue-500 rounded-lg text-white font-bold ml-3"
          >
            1M
          </button>
          <button
            onClick={() => fetch_from_gecko(365)}
            className="w-10 p-2 bg-blue-500 rounded-lg text-white font-bold ml-3"
          >
            1Y
          </button>
        </div>
      </div>
      <div className="md:w-4/5 mx-auto border border-gray-300 p-1 pb-0 mt-3 mb-1">
        {newsData.data.map((news, index) => {
          return (
            <a
              href={news.news_url}
              target="_blank"
              rel="noreferrer"
              key={index}
            >
              <div className="pl-1 min-h-[90px] border border-gray-500 mb-1 relative hover:text-blue-400 hover:border-blue-400 duration-150 ease-out">
                <div className="text-xs absolute bottom-0 right-1 text-right">
                  <h1>{news.date}</h1>
                  <h1 className="hidden lg:inline">{news.source_name}</h1>
                </div>
                <div className="flex items-end">
                  <h1 className="mr-1 font-bold">{news.title}</h1>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default CoinDetail;
