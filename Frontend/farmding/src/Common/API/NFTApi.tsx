import apiInstance from "./index";
const api = apiInstance();

const registerNFT = async (
  fundingId: number,
  nftAddress: string,
  ownerNickname: string,
  ownerWalletAddress: string
) => {
  await api.post("/addNFT", {
    currentPrice: 0,
    fundingId: 1,
    nftAddress: nftAddress,
    onSale: false,
    ownerNickname: ownerNickname,
    ownerWalletAddress: ownerWalletAddress,
  });
};
const changeOnSale = async (nftId: string) => {
  await api.patch(`/updateIsOnSale/${nftId}`);
};
const changePrice = async (currentPrice: number, nftId: number) => {
  await api.patch(`/updateCurrentPrice`, {
    currentPrice: currentPrice,
    nftId: nftId,
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
export { registerNFT, changeOnSale, changePrice, getMyNfts, sellingNFTList };
