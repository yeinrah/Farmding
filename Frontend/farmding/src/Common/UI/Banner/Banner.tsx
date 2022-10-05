import styles from "./Banner.module.scss";
// interface eachFunding {
//   title: string;
//   farm: string;
//   likeCnt: number;
// }
interface BannerProps {
  imgSrc: string;
  isMain: boolean;
  // eachFunding: eachFunding;
}

const Banner = ({ imgSrc, isMain }: BannerProps) => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.banner}>
          <img src={imgSrc} alt="" />
        </div>
        {isMain && (
          <div className={styles.banner_txt}>
            <div>FARMDING</div>
            <h3>농가와 소비자가 상생하는 곳</h3>
            <a href="/tutorial">더 알아보기</a>
          </div>
        )}
      </div>
    </>
  );
};

export default Banner;
