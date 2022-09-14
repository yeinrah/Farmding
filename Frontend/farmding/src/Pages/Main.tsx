import styles from "./Main.module.scss";
import Banner from "../Common/UI/Banner/Banner";
import SearchBar from "../Common/UI/SearchBar/SearchBar";
import ProjectItemList from "./Funding/FundingProject/ProjectItemList";
const Main = () => {
  return (
    <>
      <Banner imgSrc={"/Assets/farm1.jpg"} isMain={true} />
      <div className={styles.searchBar}>
        <SearchBar placeHolder={"어떤 과일을 드시고 싶으세요?"} />
      </div>
      <ProjectItemList />
    </>
  );
};
export default Main;
