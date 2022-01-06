import { Link } from "react-router-dom";

function DashboardListItem({
  coin,
  image,
  name,
  symbol,
  chg_24h,
  vol_24h,
  price,
  favorites,
  setFavorites,
}) {
  const handleFavoriteClick = () => {
    const prev_favorites = [...favorites];

    if (prev_favorites.includes(coin)) {
      setFavorites(prev_favorites.filter((arr_coin) => arr_coin !== coin));
    } else {
      prev_favorites.push(coin);
      setFavorites(prev_favorites);
    }
  };

  return (
    <div className="flex items-center bg-gray-300 p-2 min-w-[320px] sm:min-w-[600px] mb-0.5 relative">
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
        className="flex items-center mr-1 min-w-[205px] md:min-w-[273px]"
      >
        <img src={image} alt="" className="h-4 w-4 md:h-8 md:w-8 mr-1" />
        <p className="md:text-lg font-bold text-gray-500 mr-1">
          {symbol.toUpperCase()}
        </p>
        <h1 className="md:text-lg font-bold mr-0.5 md:mr-1">{name}</h1>
      </Link>

      <p className="hidden md:inline min-w-[150px] whitespace-nowrap mr-2">
        ${+chg_24h.toFixed(8)}
      </p>

      <p className="hidden md:inline min-w-[97px] whitespace-nowrap mr-2">
        {+vol_24h.toFixed(2)}
      </p>

      <div className="mr-2 flex-grow">
        <h1 className="md:text-lg font-semibold text-right">
          ${+price.toFixed(8)}
        </h1>
      </div>
    </div>
  );
}

export default DashboardListItem;
