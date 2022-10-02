import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { mainGreen } from "../../../Common/data/Style";

interface CustomBtnProps {
  customSx: object;
  btnWord: string;
  onclick: () => void;
}

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(mainGreen),
  backgroundColor: mainGreen,
  border: "3px solid #CAD6E2",
  "&:hover": {
    backgroundColor: "#3C7B60",
  },
}));

const CustomBtn = ({ customSx, btnWord, onclick }: CustomBtnProps) => {
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
