import styles from "./Main.module.scss";
import Banner from "../Common/UI/Banner/Banner";
import SearchBar from "../Common/UI/SearchBar/SearchBar";
import ProjectItemList from "./Funding/FundingProject/ProjectItemList";
const Main = () => {
  return (
    <>
      <Banner imgSrc={"/Assets/farm1.jpg"} isMain={true} />
      <ProjectItemList />
    </>
  );
};
export default Main;
