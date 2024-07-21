import { useParams } from "react-router-dom";
import { createBid, getAuctionById } from "../api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
const AuctionDetails = () => {
  type AuctionData = {
    domainName: string;
    price: number;
    minBidPrice: number;
    description: string;
    userId: string;
    createdDate: string;
    bidData: {
      auctionId: string;
      bidPrice: string;
      userId: string;
      _id: string;
    }[];
  };

  const [auctionData, setAuctionData] = useState<AuctionData | null>();
  const params = useParams();

  const form = useForm();
  const { register, reset, handleSubmit } = form;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getAuctionByIdHandler = async (id: string) => {
    const res = await getAuctionById(id);
    if (res?.status === 200) {
      setAuctionData(res.data);
    }
  };

  useEffect(() => {
    getAuctionByIdHandler(params._id || "");
  }, []);

  const createBidHandler = async (data: any) => {
    const res = await createBid({
      ...data,
      userId: user?._id,
      auctionId: params._id,
    });
    if (res.status === 200) {
      getAuctionByIdHandler(params._id || "");
      reset();
    }
  };
  return (
    <div className="flex gap-5 mx-10 mt-6">
      <div className="flex-1">
        {auctionData ? (
          <div className="flex flex-col  bg-green-200 rounded-lg p-2 justify-between cursor-pointer">
            <div>
              <div className="flex justify-between font-bold">
                <h3>{auctionData.domainName}</h3>
                <div className="flex flex-col text-sm flex-wrap">
                  <span>Price: {auctionData.price}$</span>
                  <span>Min Bid: {auctionData.minBidPrice}$</span>
                </div>
              </div>
              <span className="text-sm">{auctionData.description} </span>
              <div className="flex justify-between">
                <span className="italic">Posted by: {auctionData.userId}</span>
                <span className="italic">
                  Date: {format(auctionData.createdDate, "yyyy-MM-dd")}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}

        <div className="flex flex-col rounded-lg gap-3 mt-10">
          <span className="font-bold">Place Your Bid</span>
          <form onSubmit={handleSubmit(createBidHandler)}>
            <input
              type="number"
              placeholder="Enter bid price"
              className="border-2 p-2 rounded-md"
              {...register("bidPrice")}
              required
            />
            <div className="flex justify-between">
              <button
                className="p-3 bg-green-500 rounded-lg font-bold"
                type="submit"
              >
                Place Bid
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="px-5 flex flex-col gap-2 flex-1">
        <h1 className="text-lg font-bold">Bids</h1>
        {auctionData?.bidData.map((bid) => (
          <div className="flex flex-col  rounded-lg p-2 justify-between bg-red-100">
            <h1>Name : {bid?.userId}</h1>
            <span>Price : {bid?.bidPrice}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionDetails;
