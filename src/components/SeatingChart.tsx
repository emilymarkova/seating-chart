import * as React from "react";
import { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Box from "@mui/joy/Box";
import FormHelperText from "@mui/joy/FormHelperText";
import { createRoot } from "react-dom/client";
import { Rnd } from "react-rnd";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Slider from "@mui/joy/Slider";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
} as const;

const marks = [
  {
    value: 100,
    label: "100",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 900,
    label: "900",
  },
];

type Item = {
  name: string;
  xValue: number;
  yValue: number;
  widthValue: number;
  heightValue: number;
};

type Desk = {
  name: string;
  specialAccommodations: string[];
  xValue: number;
  yValue: number;
  widthValue: number;
  heightValue: number;
};

function valueText(value: number) {
  return `${value}`;
}

export default function SeatingChart() {
  const [itemWidth, setWidth] = useState(100);
  const [itemHeight, setHeight] = useState(100);
  const initialItems: Item[] = [];
  const [items, setItems] = useState(initialItems);
  const initialDesks: Desk[] = [];
  const [desks, setDesks] = useState(initialDesks);
  /*
	item = 
	{
	name,
	specialAccomidations,
	x,
	y,
	width,
	height
	}
	setItems([...items, {name:"Student name", specialAccommodations, xValue, yValue:, widthValue:20, heightValue: 20}])
	*/
  const updateHeight = (e: any) => {
    setHeight(e.target.value);
  };
  const updateWidth = (e: any) => {
    setWidth(e.target.value);
  };

  const addItem = (e: any) => {
    let item: Item = {
      name: "Item",
      xValue: 50,
      yValue: 50,
      widthValue: 20,
      heightValue: 20,
    };
    setItems([...items, item]);
  };

  const addDesk = (e: any) => {
    let desk: Desk = {
      name: "Student",
      specialAccommodations: [],
      xValue: 50,
      yValue: 50,
      widthValue: 20,
      heightValue: 20,
    };
    setItems([...desks, desk]);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "right",
        display: "flex",
        backgroundColor: "pink",
        margin: "0px",
        padding: "0px",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "red",
            width: itemWidth,
            height: itemHeight,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: "400px",
          height: "100%",
          backgroundColor: "yellow",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ margin: "5px" }}>Width : </Typography>
        <Slider
          sx={{ width: "300px", margin: "5px", marginLeft: "15px" }}
          aria-label="Custom marks"
          defaultValue={200}
          getAriaValueText={valueText}
          step={50}
          min={100}
          max={900}
          color="neutral"
          valueLabelDisplay="auto"
          onChange={updateWidth}
          marks={marks}
        />
        <Typography sx={{ margin: "5px" }}>Height : </Typography>
        <Slider
          sx={{ width: "300px", margin: "5px", marginLeft: "15px" }}
          aria-label="Custom marks"
          defaultValue={200}
          getAriaValueText={valueText}
          step={50}
          min={100}
          max={900}
          color="neutral"
          valueLabelDisplay="auto"
          marks={marks}
          onChange={updateHeight}
        />
        <Button variant="solid" sx={{ marginTop: "30px" }} onClick={addItem}>
          Add Item
        </Button>
        <Box>
					<Typography sx={{ margin: "15px" }} level='title-lg'>Item:</Typography>
					<Box
                sx={{
							margin: "5px",
							display: "flex",
									
                  justifyContent: "center",
							alignItems: "center",
									
                }}
              >
                <Typography sx={{ textSize: "10px", margin:"15px" }}>Label :</Typography>
						<Input sx={{ fieldSizing: "content", width:"250px"}} placeholder="Label" />
              </Box>
          <Typography level="body-md" sx={{marginBottom:"10px"}} >Positions (Horizontal and Vertical):</Typography>
          <Stack spacing={1.5} sx={{ minWidth: 300, marginBottom:"20px" }}>
            <Box
              sx={{
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "90px",
              }}
            >
              <Input
                type="number"
                defaultValue={50}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
              />
              <Input
                type="number"
                defaultValue={50}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
              />
            </Box>
					</Stack>
					<Typography level="body-md" sx={{marginBottom:"10px"}}>Dimensions (Width and Height):</Typography>
          <Stack spacing={1.5} sx={{ minWidth: 300, marginBottom:"20px" }}>
            <Box
              sx={{
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "90px",
              }}
            >
              <Input
                type="number"
                defaultValue={50}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
              />
              <Input
                type="number"
                defaultValue={50}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
      {items.map((element: Item) => {
        return (
          <Rnd
            style={style}
            bounds="parent"
            default={{
              x: 50,
              y: 50,
              width: 200,
              height: 200,
            }}
          >
            Rndhjjbuyb
          </Rnd>
        );
      })}
    </Box>
  );
}
