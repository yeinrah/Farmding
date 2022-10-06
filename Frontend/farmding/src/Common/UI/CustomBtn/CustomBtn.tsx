import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { mainGreen, mainPink } from "../../../Common/data/Style";

interface CustomBtnProps {
  customSx: object;
  btnWord: string;
  bgColor: string;
  onclick: () => void;
}

const CustomBtn = ({ customSx, btnWord, bgColor, onclick }: CustomBtnProps) => {
  const btnColor = bgColor === "mainGreen" ? mainGreen : mainPink;
  const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(btnColor),
    backgroundColor: btnColor,
    border: btnColor === mainGreen ? "3px solid #CAD6E2" : "1px solid #CAD6E2",
    "&:hover": {
      backgroundColor: btnColor === mainGreen ? "#3C7B60" : "#FF5A73",
      // backgroundColor: "#3C7B60",
    },
  }));
  return (
    <>
      <CustomButton
        variant="contained"
        onClick={onclick}
        sx={{
          ...customSx,
          fontWeight: "bold",
          color: "white",
          borderRadius: "15px",
        }}
      >
        {btnWord}
      </CustomButton>
    </>
  );
};

export default CustomBtn;
