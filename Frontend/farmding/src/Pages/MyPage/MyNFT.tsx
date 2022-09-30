import { Box } from "@mui/material";
import { useEffect } from "react";
import styles from "./MyNFT.module.scss";
import MyNFTItem from "./MyNFTItem";
const MyNFT = (props: any) => {
  return (
    <>
      <div className={styles.NFTsBox}>
        {props.nfts &&
          props.nfts.map((item: any, index: number) => (
            <div
              onClick={() => {
                console.log(props.nfts[index]);
              }}
            >
              <MyNFTItem
                MyNFTInfo={item}
                getInfoNFT={props.getInfoNFT}
                key={index}
              />
            </div>
          ))}
      </div>
    </>
  );
};
export default MyNFT;
