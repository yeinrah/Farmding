import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.banner}>
          <img src="/Assets/farm1.jpg" alt="" />
        </div>
        <div className={styles.banner_txt}>
          <h1>Farmding</h1>
          <h4>농가와 소비자가 상생하는 곳</h4>
          <a href="#">더 알아보기</a>
        </div>
      </div>
    </>
  );
};

export default Banner;