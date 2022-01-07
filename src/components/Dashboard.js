import axios from "axios";
import { useState, useEffect } from "react";
import FavoriteItem from "./FavoriteItem";
import DashboardListItem from "./DashboardListItem";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [newsData, setNewsData] = useState({ data: [] });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));

    if (localStorage.getItem("favorites"))
      setFavorites(JSON.parse(localStorage.getItem("favorites")));

    let date = new Date(Date.now() - 604800000);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    date = date.toISOString().split("T")[0];
    axios
      .get(
        `https://cryptonews-api.com/api/v1/category?section=general&items=50&token=1q9x3jni8lpdqdccemi5t6hd1jt7in3bzdwykhce`
      )
      .then((res) => {
        setNewsData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <div className="grid grid-cols-3 max-w-[1200px] mx-auto">
        {/* Favorited Coins */}
        <div className="col-span-3 md:col-span-2 max-h-[200px] overflow-x-hidden overflow-y-scroll m-1 p-1 border border-gray-300">
          {favorites.map((fav) => {
            return (
              <FavoriteItem
                key={fav.id}
                coin={fav}
                image={fav.image}
                symbol={fav.symbol.toUpperCase()}
                chg_24h={fav.price_change_24h}
                vol_24h={fav.market_cap_change_24h}
                price={fav.current_price}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            );
          })}
        </div>

        {/* Crypto News */}
        {/* TODO: Componentize */}
        <div className="col-span-3 md:col-span-1 max-h-[260px] sm:max-h-[500px] overflow-x-hidden overflow-y-scroll m-1 p-1 border border-gray-300">
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

        <input
          className="col-span-3 mt-3 p-2 mb-2 w-4/5 sm:w-4/5 md:1/4 mx-auto border-none outline-none ring-2 ring-blue-300 focus:ring-black rounded-lg duration-150"
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search a coin..."
        />

        {/* All Coins */}
        <div className="col-span-3">
          <div className="flex p-2">
            <h1 className="font-bold md:min-w-[273px] mr-1">COIN</h1>
            <h1 className="hidden md:inline font-bold md:min-w-[150px] mr-2">
              CHANGE (24H)
            </h1>
            <h1 className="hidden md:inline font-bold md:min-w-[97px] mr-2">
              VOLUME (24H)
            </h1>
            <h1 className="font-bold flex-grow text-right">PRICE</h1>
          </div>
          {coins.map((coin) => {
            if (coin.name.toLowerCase().includes(searchInput.toLowerCase()))
              return (
                <DashboardListItem
                  key={coin.id}
                  coin={coin}
                  image={coin.image}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  chg_24h={coin.price_change_24h}
                  vol_24h={coin.market_cap_change_24h}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              );

            return false;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
