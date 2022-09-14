import styles from "./Banner.module.scss";
interface BannerProps {
  imgSrc: string;
  isMain: boolean;
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
            <h1>Farmding</h1>
            <h4>농가와 소비자가 상생하는 곳</h4>
            <a href="#">더 알아보기</a>
          </div>
        )}
      </div>
    </>
  );
};

export default Banner;