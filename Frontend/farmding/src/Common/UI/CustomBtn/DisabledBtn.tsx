import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { mainGreen } from "../../data/Style";

interface DisabledBtnProps {
  customSx: object;
  btnWord: string;
}

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(mainGreen),
  backgroundColor: mainGreen,
}));

const DisabledBtn = ({ customSx, btnWord }: DisabledBtnProps) => {
  return (
    <>
      <CustomButton
        variant="contained"
        disabled
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

export default DisabledBtn;
