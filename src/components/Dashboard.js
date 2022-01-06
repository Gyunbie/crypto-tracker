import axios from "axios";
import { useState, useEffect } from "react";
import FavoriteItem from "./FavoriteItem";
import DashboardListItem from "./DashboardListItem";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //   const [newsData, setNewsData] = useState({ articles: [] });
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
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <div className="grid grid-cols-3 max-w-[1200px] mx-auto">
        {/* Favorited Coins */}
        <div className="col-span-3 md:col-span-2 max-h-[500px] overflow-x-hidden overflow-y-scroll">
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
        {/* <div className="col-span-3 md:col-span-1 max-h-[500px] overflow-x-hidden overflow-y-scroll">
          {newsData.articles.map((news, index) => {
            return (
              <Link to={news.url} key={index}>
                <div className="pl-1 min-h-[80px] border border-gray-500 mb-1 relative hover:text-blue-400 hover:border-blue-400 duration-150 ease-out">
                  <div className="absolute bottom-0 right-2 text-right">
                    <h1>{news.publishedAt.split("T")[0]}</h1>
                    <h1 className="hidden lg:inline">
                      {news.author?.split(",")[0]}
                    </h1>
                  </div>
                  <div className="flex items-end">
                    <h1 className="mr-1 font-bold">{news.title}</h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div> */}

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
