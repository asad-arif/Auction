import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAuctions } from "../api";
import { format } from "date-fns";

const Home = () => {
  interface AuctionItem {
    _id: string;
    domainName: string;
    description: string;
    minBidPrice: string;
    price: string;
    userId: string;
    duration: string;
    createdDate: string;
    __v: number;
  }

  type AuctionItems = AuctionItem[];

  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("");
  const [auctions, setAuctions] = useState<AuctionItems>();

  useEffect(() => {
    (async () => {
      const res = await getAllAuctions();
      setAuctions(res.data);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(e.target.value);
  };

  const filteredPrice: AuctionItem[] = auctions ? [...auctions] : [];
  const filteredTime: AuctionItem[] = auctions ? [...auctions] : [];
  filteredPrice.sort((a, b) => Number(b.price) - Number(a.price));
  filteredTime.sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  const data =
    filterBy === "price"
      ? filteredPrice
      : filterBy === "createdDate"
      ? filteredTime
      : auctions;

  return (
    <div className="px-5 my-5">
      <div className="flex gap-1">
        <span className="font-">Sort By:</span>
        <label htmlFor="createdDate">
          Date
          <input
            type="radio"
            id="createdDate"
            name="filter"
            value={"createdDate"}
            checked={filterBy === "createdDate"}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            checked={filterBy === "price"}
            type="radio"
            id="price"
            name="filter"
            value={"price"}
            onChange={handleChange}
          />
        </label>
        {filterBy && (
          <span
            className="text-red-500 underline cursor-pointer"
            onClick={() => setFilterBy("")}
          >
            reset
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2">
        {(data || []).map((auction: any) => (
          <div
            onClick={() => {
              navigate(`/auction-details/${auction._id}`);
            }}
            className="flex flex-col bg-green-200 rounded-lg p-2 justify-between cursor-pointer"
            key={auction._id}
          >
            <div className="flex justify-between font-bold">
              <h3>{auction.domainName}</h3>
              <div className="flex flex-col text-sm flex-wrap">
                <span>Price: ${auction.price}</span>
                <span>Min Bid: ${auction.minBidPrice}</span>
              </div>
            </div>
            <span className="text-sm">{auction.description} </span>
            <div className="flex justify-between">
              <span className="italic">Posted by: {auction.userId?.name}</span>
              <span className="italic">
                Date: {format(auction.createdDate, "yyyy-MM-dd")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
