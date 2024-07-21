import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createAuction,
  deleteAuction,
  getAuctionsByUserId,
} from "../api/index";

import { format } from "date-fns";

const Dashboard = () => {
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

  const form = useForm();
  const { register, reset, handleSubmit } = form;
  const [isCreate, setIsCreate] = useState(false);

  const navigate = useNavigate();

  const [userAuctions, setUserAuctions] = useState();
  const [filterBy, setFilterBy] = useState("");

  const getAllAuctionsByUserId = async () => {
    const res = await getAuctionsByUserId(user?._id);
    if (res?.status === 200) {
      setUserAuctions(res?.data);
      console.log(res);
    }
  };

  useEffect(() => {
    getAllAuctionsByUserId();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const createAuctionHandler = async (data: any) => {
    const res = await createAuction({ userId: user?._id, ...data });
    if (res.status === 200) {
      reset();
      getAllAuctionsByUserId();
      setIsCreate(false);
    }
  };

  const deleteAuctionHandler = async (id: String) => {
    const res = await deleteAuction(id);
    if (res.status === 200) {
      getAllAuctionsByUserId();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(e.target.value);
  };

  const filteredPrice: AuctionItem[] = userAuctions ? [...userAuctions] : [];
  const filteredTime: AuctionItem[] = userAuctions ? [...userAuctions] : [];
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
      : userAuctions;

  return (
    <div className="px-5">
      <div className="flex justify-between py-1">
        <h1 className=" text-2xl font-bold">My Auctions</h1>
        <button
          className="p-2 bg-green-500 rounded-lg font-bold"
          onClick={() => setIsCreate(true)}
        >
          Create Auction
        </button>
      </div>
      <div className="flex gap-5 flex-wrap">
        {isCreate ? (
          <div className="bg-slate-300 rounded-lg gap-2 w-[400px] mx-auto">
            <form
              onSubmit={handleSubmit(createAuctionHandler)}
              className="bg-slate-100 flex flex-col rounded-lg gap-1 p-3"
            >
              <span className="font-bold text-lg text-green-500">
                Create Auction
              </span>
              <label className="flex flex-col font-medium">
                Name:
                <input
                  type="text"
                  placeholder="Enter domain name"
                  {...register("domainName")}
                  className="border-2 p-2 rounded-md"
                  required
                />
              </label>

              <label className="flex flex-col font-medium">
                Price:
                <input
                  type="number"
                  {...register("price")}
                  placeholder="Enter price"
                  className="border-2 p-2 rounded-md"
                  required
                />
              </label>

              <label className="flex flex-col font-medium">
                Minimum bid price:
                <input
                  type="number"
                  {...register("minBidPrice")}
                  placeholder="Minimum bid price"
                  className="border-2  p-2 rounded-md"
                  required
                />
              </label>

              <label className="flex flex-col font-medium">
                Duration:
                <input
                  type="number"
                  {...register("duration")}
                  placeholder="Auction duration in days"
                  className="border-2  p-2 rounded-md"
                />
              </label>

              <label className="flex flex-col font-medium">
                Duration:
                <input
                  type="text"
                  {...register("description")}
                  placeholder="Description..."
                  className="border-2  p-2 rounded-md"
                />
              </label>

              <div className="flex justify-between">
                <button
                  className="p-3 bg-red-200 rounded-lg font-bold"
                  onClick={() => setIsCreate(false)}
                >
                  Cancel
                </button>
                <button
                  className="p-3 bg-green-500 rounded-lg font-bold"
                  type="submit"
                >
                  Create Auction
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1">
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
                <div className="flex flex-col  bg-green-200 rounded-lg p-2 justify-between cursor-pointer">
                  <div
                    onClick={() => {
                      navigate(`/auction-details/${auction._id}`);
                    }}
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
                      <span className="italic">
                        Posted by: {auction.userId?.name}
                      </span>
                      <span className="italic">
                        Date: {format(auction.createdDate, "yyyy-MM-dd")}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button className="bg-yellow-200 p-1 rounded">Edit</button>
                    <button
                      className="bg-red-200 p-1 rounded"
                      onClick={() => deleteAuctionHandler(auction?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
