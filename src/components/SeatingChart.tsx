import * as React from "react";
import { useState } from "react";
import Typography from "@mui/joy/Typography";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from 'uuid';
import Slider from "@mui/joy/Slider";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Option from '@mui/joy/Option';
import List, { ListProps } from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Textarea from '@mui/joy/Textarea';

import { Box, Chip } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';

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
  {
    value: 1200,
    label: "1200",
  },
];

class Item {
  id: string;
  shape: string;
  name: string;
  xValue: number;
  yValue: number;
  widthValue: number;
  heightValue: number;

  constructor(id: string,
    shape: string,
    name: string,
    xValue: number,
    yValue: number,
    widthValue: number,
    heightValue: number) {
    this.id = id;
    this.shape = shape;
    this.name = name;
    this.xValue = xValue;
    this.yValue = yValue;
    this.widthValue = widthValue;
    this.heightValue = heightValue;
  }

  getShape() {
    return this.shape;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getXValue() {
    return this.xValue;
  }
  getYValue() {
    return this.yValue;
  }
  getWidthValue() {
    return this.widthValue;
  }
  getHeightValue() {
    return this.heightValue;
  }

  setShape(newShape: string) {
    this.shape = newShape;
  }

  setId() {
    return this.id;
  }
  setName(newName: string) {
    this.name = newName;
  }
  setXValue(newXValue: number) {
    this.xValue = newXValue;
  }
  setYValue(newYValue: number) {
    this.yValue = newYValue;
  }
  setWidthValue(newWidthValue: number) {
    this.widthValue = newWidthValue;
  }
  setHeightValue(newHeightValue: number) {
    this.heightValue = newHeightValue;
  }
}

class Desk extends Item {
  accomidations: string[];
  constructor(id: string,
    shape: string,
    name: string,
    xValue: number,
    yValue: number,
    widthValue: number,
    heightValue: number,
    accomidations: string[]) {
    super(id, shape, name, xValue, yValue, widthValue, heightValue);
    this.accomidations = accomidations;
  }

  setAccomidations(newAccomidations: string[]) {
    this.accomidations = newAccomidations;
  }

  getAccomidations() {
    return this.accomidations;
  }

}


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
  const [objToAdd, setObjToAdd] = useState("placeholder");
  const [objWidth, setObjWidth] = useState(50);
  const [objHeight, setObjHeight] = useState(50);
  const [objX, setObjX] = useState(100);
  const [objY, setObjY] = useState(100);
  const [objShapeToAdd, setObjShapeToAdd] = useState("rectangle");
  const [objLabel, setObjLabel] = useState("Label");
  const [objAccomidations, setObjAccomidations] = useState([]);
  const [currItem, setCurrItem] = useState();
  const [currDesk, setCurrDesk] = useState();
  const [open, setOpen] = React.useState<boolean>(false);
  const [studentsToAdd, setStudentsToAdd] = useState('');


  const updateHeight = (e: any) => {
    setHeight(e.target.value);
  };
  const updateWidth = (e: any) => {
    setWidth(e.target.value);
  };
  const updateObjHeight = (e: any) => {
    setObjHeight(parseInt(e.target.value, 10) || 50);
  };
  const updateObjWidth = (e: any) => {
    setObjWidth(parseInt(e.target.value, 10) || 50);
  };

  const updateObjShape = (e: any) => {
    setObjShapeToAdd(e.target.value);
  };

  const updateObjAccomidations = (e: any) => {
    setObjAccomidations(e.target.value);
  };
  const updateObjLabel = (e: any) => {
    setObjLabel(e.target.value);
  };
  const updateObjX = (e: any) => {
    setObjX(parseInt(e.target.value, 10) || 50);
  };
  const updateObjY = (e: any) => {
    setObjY(parseInt(e.target.value, 10) || 50);
  };

  const addItem = () => {
    console.log("id for adding :" , uuidv4());
    setItems([...items, new Item(uuidv4(),
      objShapeToAdd,
      objLabel,
      objX,
      objY,
      objWidth,
      objHeight,)]);
  };

  const addDesk = () => {
    const accomidationElement = document.getElementById('specialAccommodations');
    console.log("id for adding :" , uuidv4());
    let accomidations: string[];
    if (accomidationElement) {
      accomidations = Array.from(accomidationElement.querySelectorAll('[aria-selected="true"]')).map((option) => option.getAttribute('data-value')).filter((value): value is string => value !== null);
    } else {
      accomidations = [];
    }


    setDesks((prevDesks: Desk[]) => [...prevDesks, new Desk(uuidv4(), objShapeToAdd, objLabel, objX, objY, objWidth, objHeight, objAccomidations)]);
  };

  const clearItems = () => {
    let clear = window.confirm("Are you sure you want to delete ALL items?");
    if (clear) {
      setItems([]);
    }
  }

  const clearDesks = () => {
    let clear = window.confirm("Are you sure you want to delete ALL desks?");
    if (clear) {
      setDesks([]);
    }
  }
  const setItemData = (item: Item) => {
    // console.log("setting data");
    // alert("calling item data");
    setObjToAdd("placeholder");
    setObjShapeToAdd(item.getShape());
    setObjLabel(item.getName());
    setObjX(item.getXValue());
    setObjY(item.getYValue());
    // alert(item.getWidthValue());
    setObjWidth(item.getWidthValue());
    setObjHeight(item.getHeightValue());
  }

  const setDeskData = (desk: Desk) => {
    // console.log("setting data");
    // alert("calling desk data");
    setObjToAdd("desk");
    setObjShapeToAdd(desk.getShape());
    setObjLabel(desk.getName());
    setObjX(desk.getXValue());
    setObjY(desk.getYValue());
    setObjWidth(desk.getWidthValue());
    setObjHeight(desk.getHeightValue());
    // setObjAccomidations(desk.getAccomidations() || []);
  }

  const setStudents = () => {
    let studentArr = studentsToAdd.split('\n');
    if (studentArr.length > desks.length) {
      let desksToAdd: Desk[] = [];
      let numberOfDesksToAdd = studentArr.length - desks.length;;


      for (let i = 0; i < numberOfDesksToAdd; i++) {
        desksToAdd.push(new Desk(uuidv4(), objShapeToAdd, "student", objX, objY, objWidth, objHeight, []));

      }
      setDesks((prevDesks: Desk[]) => [...prevDesks, ...desksToAdd]);//make sure there are no concurrent timing issues
    }


    setDesks((prevDesks: Desk[]) =>
      prevDesks.map((desk, i) => {
        console.log("mapping...");
        let deskCopy = new Desk(desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getAccomidations());
        if (i < studentArr.length) {
          console.log("just set : " + studentArr[i]);
          deskCopy.setName(studentArr[i]);
        } else {
          deskCopy.setName("");
        }
        return deskCopy;
      })
    );

  }

  const addObj = (e: any) => {
    // alert(objToAdd);
    if (objToAdd === "placeholder") {
      addItem();
    } else {
      addDesk();
    }
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue != null) {
      setObjToAdd(newValue);

    }
  };

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
        <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          Import Students
        </Button>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
            sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              sx={{ fontWeight: 'lg', mb: 1 }}
            >
              Import Students
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              Please keep in mind that importing students will override current students. Proceed with caution.
            </Typography>

            <Stack spacing={1}>
              <Textarea
                placeholder="Enter students here, seperated by new lines."
                minRows={3}
                maxRows={6}
                variant="outlined"
                onChange={(event) => {
                  setStudentsToAdd(event.target.value);
                }}
                required
                id="student_input"
              />
              <Button type="submit" onClick={() => { setStudents(); setOpen(false) }}>Submit</Button>
            </Stack>
          </Sheet>
        </Modal>
        <Typography sx={{ margin: "5px" }}>Width : </Typography>
        <Slider
          sx={{ width: "300px", margin: "5px", marginLeft: "15px" }}
          aria-label="Custom marks"
          defaultValue={200}
          getAriaValueText={valueText}
          step={50}
          min={100}
          max={1200}
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
          max={1200}
          color="neutral"
          valueLabelDisplay="auto"
          marks={marks}
          onChange={updateHeight}
        />

        <Box sx={{ minWidth: 240 }}>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: "100%"
            }}
          >
          </Box>
          <RadioGroup
            aria-labelledby="example-payment-channel-label"
            overlay
            name="example-payment-channel"
            defaultValue="placeholder"
            sx={{ alignItems: 'center', justifyContent: "center" }}
          >
            <List
              component="div"
              variant="outlined"
              orientation={"horizontal"}
              sx={{ border: "none" }}
            >
              {['placeholder', 'desk'].map((value, index) => (
                <React.Fragment key={value}>
                  <ListItem>
                    <Radio id={value} value={value} label={value} onClick={() => { setObjToAdd(value) }} />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </RadioGroup>
        </Box>
        <Box
          sx={{ backgroundColor: "green" }}>
          <Box
            sx={{
              margin: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RadioGroup
              aria-labelledby="example-payment-channel-label"
              overlay
              name="example-payment-channel"
              defaultValue="placeholder"
              sx={{ alignItems: 'center', justifyContent: "center" }}
            >
              <List
                component="div"
                variant="outlined"
                orientation={"horizontal"}
                sx={{ border: "none" }}
              >
                {['circle', 'rectangle'].map((value, index) => (
                  <React.Fragment key={value}>
                    <ListItem>
                      <Radio id={value} value={value} label={value} onClick={() => { setObjShapeToAdd(value) }} />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </RadioGroup>
            {objToAdd === "desk"
              ? <Box sx={{ display: "inline-block", margin: "10px" }}>
                <Typography sx={{ textSize: "9px", marginBottom: "10px" }}>
                  Special Accomidations :
                </Typography>
                <Select
                  multiple
                  sx={{ maxWidth: "100%" }}
                  defaultValue={['plan504', 'fs']}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', gap: '0.25rem', margin: "0px" }}>
                      {selected.map((selectedOption) => (
                        <Chip variant="soft" color="primary">
                          {selectedOption.label}
                        </Chip>
                      ))}
                    </Box>
                  )}
                  slotProps={{
                    listbox: {
                      sx: {
                        minWidth: '150px',
                        maxWidth: "100%"
                      },
                    },
                  }}
                  id="specialAccomidations"
                >
                  <Option value="plan504">504 Plan</Option>
                  <Option value="esl">English as a Second Language</Option>
                  <Option value="fs">Front Seat</Option>
                </Select></Box>
              : <Box></Box>
            }
            <Typography sx={{ textSize: "9px", marginBottom: "10px" }}>
              Label :
            </Typography>
            <Input
              sx={{ fieldSizing: "content", width: "250px" }}
              value={objLabel}
              placeholder="Label"
              onChange={updateObjLabel}
            />
          </Box>
          <Typography level="body-md" sx={{ marginBottom: "9px" }}>
            Positions (Horizontal and Vertical):
          </Typography>
          <Stack spacing={1.5} sx={{ minWidth: 300, marginBottom: "20px" }}>
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
                // defaultValue={50}
                value={objX}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
                onChange={updateObjX}
              />
              <Input
                type="number"
                // defaultValue={50}
                value={objY}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
                onChange={updateObjY}
              />
            </Box>
          </Stack>
          <Typography level="body-md" sx={{ marginBottom: "9px" }}>
            Dimensions (Width and Height):
          </Typography>
          <Stack spacing={1.5} sx={{ minWidth: 300, marginBottom: "20px" }}>
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
                // defaultValue={50}
                value={objWidth}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
                onChange={updateObjWidth}
              />
              <Input
                type="number"
                // defaultValue={50}
                value={objHeight}
                slotProps={{
                  input: {
                    ref: inputRef,
                    min: 1,
                    max: 900,
                    step: 1,
                  },
                }}
                onChange={updateObjHeight}
              />
            </Box>
          </Stack>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button variant="solid" onClick={addObj} sx={{ width: "50px" }}>
            Add
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-between", margin: "15px", width: "100%" }}>
            <Button variant="solid" onClick={clearItems} sx={{ width: "175px", marginLeft: "15px" }}>
              Clear Placeholders
            </Button>
            <Button variant="solid" onClick={clearDesks} sx={{ width: "175px", marginRight: "15px" }}>
              Clear Desks
            </Button>
          </Box>
        </Box>
      </Box>
      {/* .slice().reverse() */}
      {desks.map((element: Desk, indexCurr: number) => {
        return (
          <Rnd
            key={element.id}
            bounds="parent"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "solid 1px #ddd",
              background: "#f0f0f0", borderRadius: element.shape === 'rectangle' ? '0px' : '200px'
            }}
            size={{ width: element.widthValue, height: element.heightValue }}
            position={{ x: element.xValue, y: element.yValue }}
            onClick={(e:any) => { console.log("Mouse down event triggered");
            // e.preventDefault();
            // e.stopPropagation();
              setDeskData(element);
              // alert("hello");
              // console.log("clicked");
            }}
  

            onDragStop={(e, d) => {
              setDeskData(element);
              setDesks((prevDesks: Desk[]) =>
                prevDesks.map((desk: Desk) =>
                  desk.id === element.id
                    ? new Desk(desk.getId(), desk.getShape(), desk.getName(), d.x, d.y, desk.getWidthValue(), desk.getHeightValue(), desk.getAccomidations())
                    : desk
                )
              );
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setDeskData(element);
              setDesks((prevDesks: Desk[]) =>
                prevDesks.map((desk: Desk) =>
                  desk.id === element.id
                    ? new Desk(desk.getId(), desk.getShape(), desk.getName(), position.x, position.y, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10), desk.getAccomidations())
                    : desk
                )
              );
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "black" }}>{element.name}</Typography>
          </Rnd>
        );
      })}
      {/* .slice().reverse() */}
      {items.map((element: Item, indexCurr: number) => {
        console.log("rendering : ", element.id);
        // setItemData(element);
        return (
          // <Box sx={{ margin: "0px", padding: "0px" }} key={`box-${element.id}`}
            <Rnd
            key={element.id}
         
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "solid 1px #ddd",
                background: "#f0f0f0", borderRadius: element.shape === 'rectangle' ? '0px' : '200px'
              }}
              bounds="parent"
              size={{ width: element.widthValue, height: element.heightValue }}
            position={{ x: element.xValue, y: element.yValue }}
            onClick={(e:any) => { console.log("Mouse down event triggered");
            // e.preventDefault();
            // e.stopPropagation();
              setItemData(element);
              // alert("hello");
            console.log("clicked");}}

            onDragStop={(e, d) => {
              setItemData(element);
                setItems((prevItems: Item[]) =>
                  prevItems.map((item: Item) =>
                    item.id === element.id
                      ? new Item(item.getId(), item.getShape(), item.getName(), d.x, d.y, item.getWidthValue(), item.getHeightValue())
                      : item
                  )
                );
              }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setItemData(element);
                setItems((prevItems: Item[]) =>
                  prevItems.map((item: Item) =>
                    item.id === element.id
                      ? new Item(item.getId(), item.getShape(), item.getName(), position.x, position.y, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10))
                      : item
                  )
                );
              }}
              
            >
              <Typography sx={{ fontSize: "12px", color: "black" }}>{element.name}</Typography>
            </Rnd>
          // </Box>
        );
      })}
    </Box>
  );
}
