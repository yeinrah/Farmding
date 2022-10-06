import apiInstance from "./index";
const api = apiInstance();

const registerNFT = async (
  fundingId: number,
  nftAddress: string,
  ownerNickname: string,
  ownerWalletAddress: string,
  count: number
) => {
  await api.post("/addNFT", {
    currentPrice: 0,
    fundingId: 1,
    nftAddress: nftAddress,
    onSale: false,
    ownerNickname: ownerNickname,
    ownerWalletAddress: ownerWalletAddress,
    count: count,
  });
};
const changeOnSale = async (count: number) => {
  await api.patch(`/updateIsOnSale/${count}`);
};
const changePrice = async (currentPrice: number, count: number) => {
  await api.patch(`/updateCurrentPrice`, {
    currentPrice: currentPrice,
    count: count,
  });
};
const getMyNfts = async (walletAddress: string) => {
  let result = await api.get(`/user/mypage/mynft/${walletAddress}`);
  return result;
};
const sellingNFTList = async () => {
  let result = await api.get(`/findAllByIsOnSale`);
  return result;
};
const updateNFTOwner = async (
  count: number,
  ownerNickname: string,
  ownerWalletAddress: string
) => {
  await api.patch(`/updateOwnerOfNft`, {
    count: count,
    ownerNickname: ownerNickname,
    ownerWalletAddress: ownerWalletAddress,
  });
};
const countNFT = async () => {
  const result = await api.get(`/countNft`);
  return result;
};
export {
  registerNFT,
  changeOnSale,
  changePrice,
  getMyNfts,
  sellingNFTList,
  updateNFTOwner,
  countNFT,
};
