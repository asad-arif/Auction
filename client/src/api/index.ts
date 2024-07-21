import axios from "axios";

const baseUrl = "http://localhost:7000";

export const signup = async (body: any) => {
  const res = await axios.post(`${baseUrl}/signup`, body);
  return res;
};

export const login = async (body: any) => {
  const res = await axios.post(`${baseUrl}/login`, body);
  return res;
};

export const createAuction = async (body: any) => {
  const res = await axios.post(`${baseUrl}/create-auction`, body);
  return res;
};

export const getAllAuctions = async () => {
  const res = await axios.get(`${baseUrl}/get-all-auctions`);
  return res;
};

export const getAuctionsByUserId = async (id: string) => {
  const res = await axios.get(`${baseUrl}/get-auctions-by-userId/${id}`);
  return res;
};

export const getAuctionById = async (id: string) => {
  const res = await axios.get(`${baseUrl}/get-auction-by-id/${id}`);
  return res;
};

export const deleteAuction = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/delete-auction/${id}`);
  return res;
};

export const createBid = async (body: any) => {
  const res = await axios.post(`${baseUrl}/create-bid`, body);
  return res;
};

export const editUser = async (id: string, body: any) => {
  const res = await axios.put(`${baseUrl}/edit-user/${id}`, body);
  return res;
};
