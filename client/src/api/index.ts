import axios from "axios";

// const baseUrl = process.env.REACT_APP_API_URL;

export const signup = async (body: never) => {
  const res = await axios.post(`${baseUrl}/users/signup`, body);
  return res;
};

export const login = async (body: never) => {
  const res = await axios.post(`${baseUrl}/users/login`, body);
  return res;
};

export const createAuction = async (body: never) => {
  const res = await axios.post(`${baseUrl}/create-auction`, body);
  return res;
};

export const getAllAuctions = async () => {
  const res = await axios.get(`${baseUrl}/auctions/get-all-auctions`);
  return res;
};

export const getAuctionsByUserId = async (id: never) => {
  const res = await axios.get(
    `${baseUrl}/auctions/get-auctions-by-userId/${id}`
  );
  return res;
};

export const getAuctionById = async (id: string) => {
  const res = await axios.get(`${baseUrl}/auctions/get-auction-by-id/${id}`);
  return res;
};

export const deleteAuction = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/auctions/delete-auction/${id}`);
  return res;
};

export const createBid = async (body: never) => {
  const res = await axios.post(`${baseUrl}/bids/create-bid`, body);
  return res;
};

export const editUser = async (id: string, body: never) => {
  const res = await axios.put(`${baseUrl}/users/edit-user/${id}`, body);
  return res;
};
