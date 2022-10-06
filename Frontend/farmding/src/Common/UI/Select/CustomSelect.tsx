import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { truncate } from "fs";

interface CustomSelectProps {
  endNumber: number;
  onSelectChange: (selectAmount: number) => void;
}

const CustomSelect = ({
  endNumber,
  onSelectChange = () => {},
}: CustomSelectProps) => {
  const [quantity, setQuantity] = useState(1);
  const quantities = Array.from({ length: endNumber }, (v, i) => i + 1);
  onSelectChange(quantity);

  const handleChange = (event: SelectChangeEvent) => {
    setQuantity(parseInt(event.target.value));
    // onSelectChange(parseInt(event.target.value));
  };

  return (
    <FormControl size="small" sx={{ width: 60 }}>
      <InputLabel id="select-label">수량</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={quantity.toString()}
        label="quantity"
        onChange={handleChange}
      >
        {quantities.map((num, i) => (
          <MenuItem value={num}>{num}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
