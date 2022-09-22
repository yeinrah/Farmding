import { styled } from "@mui/material/styles";
import { alpha, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface SearchBarProps {
  placeHolder: string;
}
const SearchBar = ({ placeHolder }: SearchBarProps) => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "500px",
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    height: "70px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "700px",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    display: "flex",
    justifyContent: "center",
    fontSize: "22px",
    width: "100%",
    paddingTop: "12px",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "600px",
      },
    },
  }));
  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeHolder}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </div>
  );
};
export default SearchBar;
