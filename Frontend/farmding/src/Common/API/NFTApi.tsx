import apiInstance from "./index";
const api = apiInstance();

const registerNFT = async (
  nftAddress: string,
  ownerWalletAddress: string,
  ownerNickname: string
) => {
  await api.post("/~~~~~", {
    nft_address: nftAddress,
    owner_wallet_address: ownerWalletAddress,
    owner_nickname: ownerNickname,
  });
};
const getMyNfts = async (walletAddress: string) => {
  let result = await api.get("/~~~~~~");
  return result;
};
export { registerNFT, getMyNfts };
