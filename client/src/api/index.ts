import axios from "axios";

export const signup = async (body: any) => {
  const res = await axios.post("http://localhost:7000/signup", body);
  return res;
};

export const login = async (body: any) => {
  const res = await axios.post("http://localhost:7000/login", body);
  return res;
};

export const createAuction = async (body: any) => {
  const res = await axios.post("http://localhost:7000/create-auction", body);
  return res;
};

export const getAllAuctions = async () => {
  const res = await axios.get("http://localhost:7000/get-all-auctions");
  return res;
};
export const getAuctionsByUserId = async (id: String) => {
  const res = await axios.get(
    `http://localhost:7000/get-auctions-by-userId/${id}`
  );
  return res;
};
export const getAuctionById = async (id: String) => {
  const res = await axios.get(`http://localhost:7000/get-auction-by-id/${id}`);
  return res;
};

export const deleteAuction = async (id: String) => {
  const res = await axios.delete(`http://localhost:7000/delete-auction/${id}`);
  return res;
};
export const createBid = async (body: any) => {
  const res = await axios.post(`http://localhost:7000/create-bid`, body);
  return res;
};

export const editUser = async (id: string, body: any) => {
  const res = await axios.put(`http://localhost:7000/edit-user/${id}`, body);
  return res;
};
