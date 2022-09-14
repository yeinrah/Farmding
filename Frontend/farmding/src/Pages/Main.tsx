import styles from "./Main.module.scss";
import Banner from "../Common/UI/Banner/Banner";
import SearchBar from "../Common/UI/SearchBar/SearchBar";
import ProjectItemList from "./Funding/FundingProject/ProjectItemList";
const Main = () => {
  return (
    <>
      <Banner />
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <ProjectItemList />
    </>
  );
};
export default Main;
