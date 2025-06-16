import { useReactToPrint } from "react-to-print";
import * as React from "react";
import { useState } from "react";
import Typography from "@mui/joy/Typography";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from 'uuid';
import IconButton from '@mui/material/IconButton';
import Slider from "@mui/joy/Slider";
import { useRef } from "react";
import Button from "@mui/joy/Button";
import { app } from "../firebase";
import Snackbar from '@mui/joy/Snackbar';
import Switch from '@mui/material/Switch';
// import { doc, setDoc, } from 'firebase/firestore';
import { getFirestore, getDoc, updateDoc, deleteDoc, setDoc, doc } from "firebase/firestore";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Tabs,
  TabList,
  Tab,
  ModalDialog,
  FormLabel,
} from '@mui/joy';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAuth } from "firebase/auth";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Navbar from './Navbar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Textarea from '@mui/joy/Textarea';
import { useEffect, useCallback } from 'react';
import { Box } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
// import { updateClassExpression, updateInferTypeNode } from "typescript";

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
  active: boolean;
  id: string;
  shape: string;
  name: string;
  xValue: number;
  yValue: number;
  widthValue: number;
  heightValue: number;

  constructor(
    active: boolean,
    id: string,
    shape: string,
    name: string,
    xValue: number,
    yValue: number,
    widthValue: number,
    heightValue: number,
    colorValue: string) {
    this.active = active;
    this.id = id;
    this.shape = shape;
    this.name = name;
    this.xValue = xValue;
    this.yValue = yValue;
    this.widthValue = widthValue;
    this.heightValue = heightValue;
    this.colorValue = colorValue;
  }

  getShape() {
    return this.shape;
  }
  getId() {
    return this.id;
  }
  getActive() {
    return this.active;
  }

  getColorValue() {
    return this.colorValue;
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


  setColorValue(newColorValue: string) {
    this.colorValue = newColorValue;
  }

  setActive(active: boolean) {
    this.active = active;
    console.log("setting : " + active);
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
  type: string;
  constructor(active: boolean, id: string,
    shape: string,
    name: string,
    xValue: number,
    yValue: number,
    widthValue: number,
    heightValue: number,
    colorValue: string,
    accomidations: string[], type: string) {
    super(active, id, shape, name, xValue, yValue, widthValue, heightValue, colorValue);
    this.accomidations = accomidations;
    this.type = type;
  }

  setAccomidations(newAccomidations: string[]) {
    this.accomidations = newAccomidations;
  }

  getAccomidations() {
    return this.accomidations;
  }

  setType(newType: string) {
    this.type = newType;
  }

  getType() {
    return this.type;
  }

}


function valueText(value: number) {
  return `${value}`;
}

export default function SeatingChart() {
  const [swapModeOn, setSwapModeOn] = useState(false);
  const [colorModeOn, setColorModeOn] = useState(false);
  const [noteBoxModeOn, setNoteBoxModeOn] = useState(false);
  const [colorToSet, setColorToSet] = useState("#000000");
  const [numbersModeOn, setNumbersModeOn] = useState(false);
  const [deskToSwap, setDeskToSwap] = useState<Desk | null>(null);
  const [itemWidth, setWidth] = useState(500);
  const [className, setClassName] = useState("");
  const initialClassNames: String[] = [];
  const [classNames, setClassNames] = useState(initialClassNames);
  const [itemHeight, setHeight] = useState(400);
  const [fontSize, setFontSize] = useState("12");
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const initialItems: Item[] = [];
  const [items, setItems] = useState(initialItems);
  const initialDesks: Desk[] = [];
  const [desks, setDesks] = useState(initialDesks);
  const [objToAdd, setObjToAdd] = useState("placeholder");
  const [objWidth, setObjWidth] = useState(50);
  const [objHeight, setObjHeight] = useState(50);
  const [objX, setObjX] = useState(50);
  const [objY, setObjY] = useState(50);
  const [objShapeToAdd, setObjShapeToAdd] = useState("rectangle");
  const [objLabel, setObjLabel] = useState("Label");
  const [objAccomidations, setObjAccomidations] = useState([]);
  const [currItem, setCurrItem] = useState<Item>();
  const [currDesk, setCurrDesk] = useState<Desk>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openNotes, setOpenNotes] = React.useState<boolean>(false);
  const [openSavedAlert, setOpenSavedAlert] = React.useState<boolean>(false);
  const [openAdvancedSettings, setOpenAdvancedSettings] = React.useState<boolean>(false);
  const [openSetUp, setOpenSetUp] = React.useState<boolean>(false);
  const [notes, setNotes] = React.useState("");
  const [studentsToAdd, setStudentsToAdd] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [copyIndex, setCopyIndex] = React.useState<number>(null);
  // const [newItem, setNewItem] = useState('');
  // const [openItemModal, setOpenItemModal] = useState(false);
  // const [classToCopy, setClassToCopy] = useState(-1);//index2

  const handleAddClass = async () => {
    if (newClassName.trim() !== '') {
      // const newClass = {
      //   id: classNames.length + 1,
      //   name: newClassName,
      // };
      if (classNames.includes(newClassName)) {
        alert("Whoops! That name is already in the list of classes!");
        return;
      }
      let updatedNames = [...classNames, newClassName.trim()];
      setClassNames(updatedNames);
      await saveEmpty(newClassName);
      //if duplicate
      setNewClassName('');
      setOpenModal(false);
      const db = getFirestore(app);
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const infoDocRef = doc(db, "users", uid, "classList", "info");
        const docSnap = await getDoc(infoDocRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          let classesArr = docData.classes.filter(classOfArr => classOfArr.trim() !== '');
          setClassNames(classesArr);

          // setSelectedTab(classesArr.length - 1);
          // setClassName(classesArr[classesArr.length - 1]);

          // updateInfoForCurrentClass();
        }
      }
    }
  };

  const handleCopyClass = async (index) => {
    // alert("index : " + index);
    let classNameToUse = newClassName.trim().replace(/[^a-zA-Z0-9_]/g, '_');
    if (classNameToUse.trim() !== '') {
      // const newClass = {
      //   id: classNames.length + 1,
      //   name: newClassName,
      // };
      if (classNames.includes(classNameToUse)) {
        alert("Whoops! That name is already in the list of classes!");
        return;
      }

      setClassNames([...classNames, classNameToUse]);
      // saveEmpty(newClassName); going to save anyway later
      //if duplicate
      // setNewClassName(''); //this was causing issues since it was clearing it
      // setOpenModal(false);


      const db = getFirestore(app);
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // alert("going to delete...");
        const uid = user.uid;
        let classToCopy = classNames[index];
        // const subcollectionRef = collection(db, "users", uid, className);
        try {
          // const res = await subcollectionRef.doc('info').delete();

          // alert("class to copy : " + classToCopy);
          const docRef = doc(db, "users", uid, classToCopy, "info");
          const classToCopySnap = await getDoc(docRef);

          // const newDocRef = doc(db, "users", uid, newClassName, "info");
          // await deleteDoc(docRef);    

          const infoDocRef = doc(db, "users", uid, "classList", "info");
          const classListSnap = await getDoc(infoDocRef);

          if (classToCopySnap.exists()) {
            // alert("it exists!");

            let docData = classToCopySnap.data();
            // alert("data : " + JSON.stringify(docData, null, 2));
            // alert("className : " + className);

            await setDoc(doc(db, "users", uid, classNameToUse, "info"), {
              createdAt: new Date(),
              notes: docData.notes || "",
              desks: docData.desks || [],
              fontSize: docData.fontSize || 12,
              items: docData.items || [],
              setUp: {
                width: docData.setUp.width || 500,
                height: docData.setUp.height || 400,
              }
            });
          } else {
            alert("oops! it seemed like we couldn't find records of this class :( 789")
          }

          if (classListSnap.exists()) {
            const docData = classListSnap.data();
            const classes = Array.isArray(docData.classes) ? docData.classes : [];
            const updatedClasses = [...classes, classNameToUse]; //push returns length
            // alert("classes : " + docData.classes);
            await updateDoc(infoDocRef, {
              classes: updatedClasses,
            });
            setClassNames(updatedClasses);
            // setClassName(classNames[0]);
            updateClassList();

            // setSelectedTab(updatedClasses.length - 1);
            // setClassName(classNameToUse);
            // updateInfoForCurrentClass();

            // alert("className : " + className);
            // alert("setting to 0; delete");
            // setSelectedTab(0);
            // updateInfoForCurrentClass();

          } else {
            alert("oops! it seemed like we couldn't find records of this class :( 456")
          }
        } catch (error) {
          alert("Error getting document:" + (error as Error).message);
        }


      }
      // Select the new tab
      // alert("setting to : " + classNames.length - 1);


    }
    setNewClassName('');
    setOpenModal(false);
    setCopyIndex(null);
  };

  const handleDeleteClass = async (index) => {
    // alert("index : " + index);
    let confirm = window.confirm("Are you sure you want to delete the class?");
    if (confirm) {
      if (classNames.length > 1) {
        const db = getFirestore(app);
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // alert("going to delete...");
          const uid = user.uid;
          // const subcollectionRef = collection(db, "users", uid, className);
          try {
            // const res = await subcollectionRef.doc('info').delete();
            let classToDelete = classNames[index];
            // alert("about to delete : " + classToDelete);
            const docRef = doc(db, "users", uid, classToDelete, "info");
            await deleteDoc(docRef);

            const infoDocRef = doc(db, "users", uid, "classList", "info");
            const docSnap = await getDoc(infoDocRef);

            if (docSnap.exists()) {
              const docData = docSnap.data();
              const classes = docData.classes;
              const updatedClasses = classes.filter(item => item !== classToDelete && item.trim() !== "")

              // alert("classes : " + docData.classes);
              await updateDoc(infoDocRef, {
                classes: updatedClasses,
              });
              await updateClassList();
              // await setClassNames(updatedClasses || []); // already udpated in update classList

              // const classesArr = await updateClassList();
              let indexToSelect = selectedTab;
              if (selectedTab < index) {
                //selecting the same thing; leave as is
              } else if (selectedTab >= index) {
                indexToSelect = selectedTab - 1;
              }

              // if (selectedTab >= classesArr.length) {
              //   indexToSelect = classesArr.length - 1;
              // }
              // alert("index is : " + indexToSelect);

              setSelectedTab(indexToSelect);
              // alert("classesArr : " + classesArr);
              // setClassName(classesArr[indexToSelect]);
              // alert("className : " + className);
              // updateInfoForCurrentClass();
              // alert("selected tab is : " + selectedTab);
              // updateInfoForCurrentClass();
              // setClassName(classNames[0]);
              // alert("className : " + className);
              // alert("setting to 0; delete");
              // setSelectedTab(0);
              // updateInfoForCurrentClass();

            } else {
              alert("oops! it seemed like we couldn't find records of this class :( 456")
            }
          } catch (error) {
            alert("Error getting document:" + (error as Error).message);
          }


        }

      }
    }
  };

  const updateClassList = async () => {
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      const infoDocRef = doc(db, "users", uid, "classList", "info");

      try {
        const docSnap = await getDoc(infoDocRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          let classesArr = docData.classes.filter(cls => cls.trim() !== '');
          // let safeIndex = Math.max(0, Math.min(index, classesArr.length - 1));

          await setClassNames(classesArr);
          // alert("classesArrwaef : " + JSON.stringify(classesArr, null, 2));
          // setSelectedTab(safeIndex);
          // setClassName(classesArr[safeIndex]);
          // updateInfoForCurrentClass();
          return classesArr;

        } else {
          alert("oops! it seemed like we couldn't find records of this class :( 123")
        }
      } catch (error) {
        console.error("Error getting document 1:", error.message);
      }
    }
  }


  const updateInfoForCurrentClass = useCallback(async () => {
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && className && className !== "") {
      const uid = user.uid;

      const newName = className.replace(/[^a-zA-Z0-9_]/g, '_');

      try {
        const infoDocRef = doc(db, "users", uid, newName, "info");
        const docSnap = await getDoc(infoDocRef);

        if (docSnap.exists()) {

          const docData = docSnap.data();
          setNotes(docData.notes || "");
          // setDesks(docData.desks || []);
          let serializedDesks = Array.isArray(docData.desks) ? docData.desks : [];
          let desks = [];

          serializedDesks.forEach((desk: any) => {
            desks.push(new Desk(false, desk.id, desk.shape, desk.name, desk.xValue, desk.yValue, desk.widthValue, desk.heightValue, desk.colorValue, desk.accomidations, desk.type));
          });
          setDesks(desks || []);
          let serializedItems = Array.isArray(docData.items) ? docData.items : [];
          let items = [];

          serializedItems.forEach((item: any) => {
            items.push(new Item(false, item.id, item.shape, item.name, item.xValue, item.yValue, item.widthValue, item.heightValue, item.colorValue));
          });
          setItems(items || []);

          // setItems(docData.items || []);
          setFontSize(docData.fontSize || 12);
          setWidth(docData.setUp.width || 500);
          setHeight(docData.setUp.height || 400);
          setNotes(docData.notes || "");
        } else {
          console.log("Hmm...couldn't find some records (error 1). This may or may not indicate an issue.")
        }
      } catch (error) {
        alert("Error getting document:" + (error as Error).message);
      }
    } else {
      console.log("Please select a class/user to view its details.");
    }
  }, [className]);


  useEffect(() => {
    const update = async () => {
      let classesArr = await updateClassList();
      // setClassName(classNames[0]);
      // alert("classesdas : " + JSON.stringify(classesArr[0], null, 2));

      // setSelectedTab(0);
      // alert("classesArr : " + JSON.stringify(classesArr, null, 2));
      await setClassName(classesArr[0]);
      setSelectedTab(0);
      // updateInfoForCurrentClass(); already done in useEffect
      // alert('updated');
      // if (className) {
      //   await updateInfoForCurrentClass();
      // }

    }
    update()
      .catch(console.error);
    // comment below to ignore the dependency warning!
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const update = async () => {
      // alert("new class name: " + className);
      if (className && className !== "") {
        await updateInfoForCurrentClass();
      }
    }
    update()
      .catch(console.error);
  }, [className, updateInfoForCurrentClass]);


  useEffect(() => {
    const update = async () => {

      setNotes("");;
      setObjAccomidations([]);
      setObjLabel("Label");
      setObjX(50);
      setObjY(50);
      setObjHeight(50);
      setObjWidth(50);
      setObjToAdd("placeholder");
      // setFontSize("12");
      setSwapModeOn(false);
      setOpenAdvancedSettings(false);
      setOpenNotes(false);
      setCurrItem(undefined);
      setCurrDesk(undefined);
      setDeskToSwap(null);
      setNumbersModeOn(false);
      setColorToSet("#000000");
      setNoteBoxModeOn(false);
      if (classNames[selectedTab] && className !== classNames[selectedTab]) {
        setClassName(classNames[selectedTab]);
      }
      // alert("className : " + className);
      updateInfoForCurrentClass();
      // setItemHeight(400);
      // setItemWidth(500);
      // setDesks([]);
      // setItems([]);

      // setOpen(false);


    }
    update()
      .catch(console.error);
    // eslint-disable-next-line
  }, [selectedTab]);

  useEffect((e: any) => {
    // console.log("running");
    // console.log(objAccomidations);
    function handleClick(e: any) {
      if (e.target && e.target === document.getElementById('tableArea')) {
        console.log("hmmmmmmm changing everything");
        setItems((prevItems: Item[]) =>
          prevItems.map((item: Item) => {
            return new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue());
          }));
        setDesks((prevDesks: Desk[]) =>
          prevDesks.map((desk, i) => {
            return new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
          }));
        setCurrItem(undefined);
        setCurrDesk(undefined);
        console.log(JSON.stringify(currDesk));
        console.log(JSON.stringify(currItem));
        //reset values
        setObjWidth(50);
        setObjHeight(50);
        setObjX(50);
        setObjY(50);
        setObjLabel("Label");
        setObjAccomidations([]);
      }
    }
    // }
    if (window.document.getElementById('tableArea')) {

      window.document.getElementById('tableArea')!.addEventListener('click', handleClick);
    }
    return () => {
      if (window.document.getElementById('tableArea') && handleClick) {
        window.document.getElementById('tableArea')!.removeEventListener('click', handleClick);
      }
    };
  }, [objAccomidations, currDesk, currItem, desks, items]);





  const updateHeight = (e: any) => {
    e.stopPropagation();
    setHeight(e.target.value);
  };
  const updateWidth = (e: any) => {
    e.stopPropagation();
    setWidth(e.target.value);
  };
  const updateObjHeight = (e: any) => {
    e.stopPropagation();
    setObjHeight(parseInt(e.target.value, 10) || 50);
    var newHeight = parseInt(e.target.value, 10) || 50;
    if (currDesk !== undefined) {
      const updatedDesk = new Desk(currDesk.getActive(), currDesk.getId(), currDesk.getShape(), currDesk.getName(), currDesk.getXValue(), currDesk.getYValue(), currDesk.getWidthValue(), newHeight, currDesk.getColorValue(), currDesk.getAccomidations(), currDesk.getType());
      setCurrDesk(updatedDesk);
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((desk) => (desk.id === currDesk.id ? updatedDesk : desk))
      );
    }
    else if (currItem !== undefined) {
      currItem.setHeightValue(e.target.value);
      const updatedItem = new Item(currItem.getActive(), currItem.getId(), currItem.getShape(), currItem.getName(), currItem.getXValue(), currItem.getYValue(), currItem.getWidthValue(), newHeight, currItem.getColorValue());
      setCurrItem(updatedItem);
      setItems((prevItems: Item[]) =>
        prevItems.map((item) => (item.id === currItem.id ? updatedItem : item))
      );
    }
  };
  const updateObjWidth = (e: any) => {
    e.stopPropagation();
    setObjWidth(parseInt(e.target.value, 10) || 50);
    var newWidth = parseInt(e.target.value, 10) || 50
    if (currDesk !== undefined) {
      const updatedDesk = new Desk(currDesk.getActive(), currDesk.getId(), currDesk.getShape(), currDesk.getName(), currDesk.getXValue(), currDesk.getYValue(), newWidth, currDesk.getHeightValue(), currDesk.getColorValue(), currDesk.getAccomidations(), currDesk.getType());
      setCurrDesk(updatedDesk);
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((desk) => (desk.id === currDesk.id ? updatedDesk : desk))
      );
    }
    else if (currItem !== undefined) {
      currItem.setWidthValue(e.target.value);
      const updatedItem = new Item(currItem.getActive(), currItem.getId(), currItem.getShape(), currItem.getName(), currItem.getXValue(), currItem.getYValue(), newWidth, currItem.getHeightValue(), currItem.getColorValue()
      );
      setCurrItem(updatedItem);
      setItems((prevItems: Item[]) =>
        prevItems.map((item) => (item.id === currItem.id ? updatedItem : item))
      );
    }
  };

  const updateObjShape = (e: any) => {
    e.stopPropagation();
    setObjShapeToAdd(e.target.value);
    var shape = e.target.value
    if (currDesk !== undefined) {
      const updatedDesk = new Desk(currDesk.getActive(), currDesk.getId(), shape, currDesk.getName(), currDesk.getXValue(), currDesk.getYValue(), currDesk.getWidthValue(), currDesk.getHeightValue(), currDesk.getColorValue(), currDesk.getAccomidations(), currDesk.getType());
      setCurrDesk(updatedDesk);
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((desk) => (desk.id === currDesk.id ? updatedDesk : desk))
      );
    }
    else if (currItem !== undefined) {
      currItem.setShape(e.target.value);
      const updatedItem = new Item(currItem.getActive(), currItem.getId(), shape, currItem.getName(), currItem.getXValue(), currItem.getYValue(), currItem.getWidthValue(), currItem.getHeightValue(), currItem.getColorValue()
      );
      setCurrItem(updatedItem);
      setItems((prevItems: Item[]) =>
        prevItems.map((item) => (item.id === currItem.id ? updatedItem : item))
      );
    }

  };

  const updateObjLabel = (e: any) => {
    e.stopPropagation();
    setObjLabel(e.target.value);
    var label = e.target.value;
    if (currDesk !== undefined) {
      const updatedDesk = new Desk(currDesk.getActive(), currDesk.getId(), currDesk.getShape(), label, currDesk.getXValue(), currDesk.getYValue(), currDesk.getWidthValue(), currDesk.getHeightValue(), currDesk.getColorValue(), currDesk.getAccomidations(), currDesk.getType());
      setCurrDesk(updatedDesk);
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((desk) => (desk.id === currDesk.id ? updatedDesk : desk))
      );
    }
    else if (currItem !== undefined) {
      currItem.setName(e.target.value);
      const updatedItem = new Item(currItem.getActive(), currItem.getId(), currItem.getShape(), label, currItem.getXValue(), currItem.getYValue(), currItem.getWidthValue(), currItem.getHeightValue(), currItem.getColorValue()
      );
      setCurrItem(updatedItem);
      setItems((prevItems: Item[]) =>
        prevItems.map((item) => (item.id === currItem.id ? updatedItem : item))
      );
    }
  };
  const updateObjX = (e: any) => {
    e.stopPropagation();
    const xValue = parseInt(e.target.value, 10) || 50;
    setObjX(xValue)
    if (currDesk !== undefined) {
      const updatedDesk = new Desk(currDesk.getActive(), currDesk.getId(), currDesk.getShape(), currDesk.getName(), xValue, currDesk.getYValue(), currDesk.getWidthValue(), currDesk.getHeightValue(), currDesk.getColorValue(), currDesk.getAccomidations(), currDesk.getType());
      setCurrDesk(updatedDesk);
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((desk) => (desk.id === currDesk.id ? updatedDesk : desk))
      );
    }
    else if (currItem !== undefined) {
      currItem.setXValue(e.target.value);
      const updatedItem = new Item(currItem.getActive(), currItem.getId(), currItem.getShape(), currItem.getName(), xValue, currItem.getYValue(), currItem.getWidthValue(), currItem.getHeightValue(), currItem.getColorValue()
      );
      setCurrItem(updatedItem);
      setItems((prevItems: Item[]) =>
        prevItems.map((item) => (item.id === currItem.id ? updatedItem : item))
      );
    }
  };
  const updateObjY = (e: any) => {
    e.stopPropagation();
    const yValue = parseInt(e.target.value, 10) || 50;
    setObjY(yValue);
    if (currDesk !== undefined) {
      const updatedDesk = new Desk(currDesk.getActive(), currDesk.getId(), currDesk.getShape(), currDesk.getName(), currDesk.getXValue(), yValue, currDesk.getWidthValue(), currDesk.getHeightValue(), currDesk.getColorValue(), currDesk.getAccomidations(), currDesk.getType());
      setCurrDesk(updatedDesk);
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((desk) => (desk.id === currDesk.id ? updatedDesk : desk))
      );
    }
    else if (currItem !== undefined) {
      currItem.setYValue(e.target.value);
      const updatedItem = new Item(currItem.getActive(), currItem.getId(), currItem.getShape(), currItem.getName(), currItem.getXValue(), yValue, currItem.getWidthValue(), currItem.getHeightValue(), currItem.getColorValue()
      );
      setCurrItem(updatedItem);
      setItems((prevItems: Item[]) =>
        prevItems.map((item) => (item.id === currItem.id ? updatedItem : item))
      );
    }
  };

  const addItem = () => {
    // console.log("adding item");
    // console.log("Adding item with properties:", {
    //   shape: objShapeToAdd,
    //   label: objLabel,
    //   x: objX,
    //   y: objY,
    //   width: objWidth,
    //   height: objHeight
    // });



    setDesks((prevDesks: Desk[]) =>
      prevDesks.map((desk, i) => {
        let deskCopy = new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
        return deskCopy;
      })
    );

    // setItems(prevItems => [...prevItems.map((item, i) => {
    //     let itemCopy = new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue());
    //     return itemCopy;
    //   }), new Item(true, uuidv4(),
    //   objShapeToAdd,
    //   objLabel,
    //   objX,
    //   objY,
    //   objWidth,
    //   objHeight, "#000000")]);
    // console.log("new items: " + JSON.stringify(items, null, 2));
    const newItem = new Item(
      true,
      uuidv4(),
      objShapeToAdd,
      objLabel,
      objX,
      objY,
      objWidth,
      objHeight,
      "#000000"
    );
    setCurrDesk(undefined);
    setCurrItem(newItem);
    setItems((prevItems: Item[]) => [
      ...prevItems.map(item =>
        new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue())
      ),
      newItem
    ]);
  };

  const addDesk = () => {
    // console.log("adding desk");
    const accomidationElement = document.getElementById('specialAccommodations');
    let accomidations: string[];
    if (accomidationElement) {
      accomidations = Array.from(accomidationElement.querySelectorAll('[aria-selected="true"]')).map((option) => option.getAttribute('data-value')).filter((value): value is string => value !== null);
    } else {
      accomidations = [];
    }
    const newDesk = new Desk(true, uuidv4(), objShapeToAdd, objLabel, objX, objY, objWidth, objHeight, "#000000", accomidations, "");
    setCurrDesk(newDesk);
    setCurrItem(undefined);
    setItems((prevItems: Item[]) =>
      prevItems.map((item, i) => {
        let itemCopy = new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue());
        return itemCopy;
      })
    );
    setDesks((prevDesks: Desk[]) => [...prevDesks.map((desk, i) => {
      let deskCopy = new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
      return deskCopy;
    }), newDesk]);
    // console.log("Updated desks:", desks);

  };

  const removeItem = () => {
    setItems(items.filter(item => item.getId() !== currItem?.getId()));
    setObjWidth(50);
    setObjHeight(50);
    setObjX(50);
    setObjY(50);
    setObjLabel("Label");
    setObjAccomidations([]);
    setCurrItem(undefined);
  };

  const removeDesk = () => {
    setDesks(desks.filter(desk => desk.getId() !== currDesk?.getId()));
    setObjWidth(50);
    setObjHeight(50);
    setObjX(50);
    setObjY(50);
    setObjLabel("Label");
    setObjAccomidations([]);
    setCurrDesk(undefined);
  };

  const handleSwap = function (e: React.MouseEvent, desk: Desk, swapping: boolean) {
    e.stopPropagation();

    if (!swapping) {
      if (deskToSwap !== null && deskToSwap.getId() === desk.getId()) {
        setDeskToSwap(null);
      }
      return;
    }
    //the button is being pressed to swap
    if (deskToSwap === null) {
      setDeskToSwap(desk);
    } else {
      //go ahead and swap the two desks
      var desk1 = new Desk(
        false,
        deskToSwap.getId(),
        desk.getShape(),
        deskToSwap.getName(),
        desk.getXValue(),
        desk.getYValue(),
        desk.getWidthValue(),
        desk.getHeightValue(),
        deskToSwap.getColorValue(),
        deskToSwap.getAccomidations(),
        desk.getType()
      );

      var desk2 = new Desk(
        false,
        desk.getId(),
        deskToSwap.getShape(),
        desk.getName(),
        deskToSwap.getXValue(),
        deskToSwap.getYValue(),
        deskToSwap.getWidthValue(),
        deskToSwap.getHeightValue(),
        desk.getColorValue(),
        desk.getAccomidations(),
        deskToSwap.getType()
      );
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((deskInDesks: Desk) => {
          if (deskInDesks.getId() === desk1.getId()) {
            return desk1;
          } else if (deskInDesks.getId() === desk2.getId()) {
            return desk2;
          } else {
            return deskInDesks;
          }
        }
        ));
      setDeskToSwap(null);
    }
  }

  const clearItems = () => {
    let clear = window.confirm("Are you sure you want to delete ALL items?");
    if (clear) {
      setItems([]);
    }
  }

  const resetColors = () => {
    let clear = window.confirm("Are you sure you want to reset ALL colors?");
    if (clear) {
      setItems((prevItems: Item[]) =>
        prevItems.map((item: Item) => {
          return new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), "#000000");
        }));
      setDesks((prevDesks: Desk[]) =>
        prevDesks.map((desk, i) => {
          return new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), "#000000", desk.getAccomidations(), desk.getType());
        }));
    }
  }

  const clearDesks = () => {
    let clear = window.confirm("Are you sure you want to delete ALL desks?");
    if (clear) {
      setDesks([]);
    }
  }
  const save = async (): Promise<void> => {

    const db = getFirestore(app); //This will fix the error 'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
    const auth = getAuth();

    const user = auth.currentUser;

    if (user) {

      const uid = user.uid;
      const serializedDesks = desks.map((desk) => ({
        id: desk.getId() || '',
        shape: desk.getShape() || 'rectangle',
        name: desk.getName() || '',
        xValue: desk.getXValue() || 0,
        yValue: desk.getYValue() || 0,
        widthValue: desk.getWidthValue() || 50,
        heightValue: desk.getHeightValue() || 50,
        colorValue: desk.getColorValue() || '#000000',
        accommodations: desk.getAccomidations() || '',
        type: desk.getType() || ''
      }));

      const serializedItems = items.map((item) => ({
        id: item.getId() || '',
        shape: item.getShape() || 'rectangle',
        name: item.getName() || '',
        xValue: item.getXValue() || 0,
        yValue: item.getYValue() || 0,
        widthValue: item.getWidthValue() || 50,
        heightValue: item.getHeightValue() || 50,
        colorValue: item.getColorValue() || '#000000',
      }));
      if (!className) {
        alert("Invalid class name.");
        return;
      }


      const newName = className.replace(/[^a-zA-Z0-9_]/g, '_');
      // alert("Class name few : " + newName);
      if (newName === undefined || newName === "") {
        alert("Invalid class name.");
        return;
      }

      try {
        // const itemsDocRef = doc(db, "users", uid, newClassName, "info");
        //     const classDocRef = doc(db, "users", uid, newClassName);
        // const itemsDocRef = doc(collection(classDocRef, "info"));
        // const itemsDocRef = db.collection("users").doc(uid).collection(newClassName).doc("info");
        // const itemsDocRef = doc(db, `users/${uid}/${newClassName}/info`);
        // alert("deskss : " + JSON.stringify(serializedDesks, null, 2));

        // alert("noewww : " + newClassName);
        // alert("Will create path: " +  `users/${uid}/${newName}/info`);

        await setDoc(doc(db, "users", uid, newName, "info"), {
          createdAt: new Date(),
          notes: notes || "",
          desks: serializedDesks,
          fontSize: fontSize,
          items: serializedItems,
          setUp: {
            width: itemWidth || 500,
            height: itemHeight || 400,
          }
        });
        const classesDocRef = doc(db, "users", uid, "classList", "info");
        const docSnap = await getDoc(classesDocRef);
        let updatedClasses;
        if (docSnap.exists()) {
          const docData = docSnap.data();
          updatedClasses = docData.classes;
        } else {
          alert("oops! it seemed like we couldn't find records of this class :( 1011")
        }
        if (!updatedClasses.includes(newClassName)) {
          // alert("new class name : " + newClassName);
          updatedClasses.push(newClassName);
          updatedClasses = classNames.filter(cls => cls.trim() !== '');
          await updateDoc(classesDocRef, {
            classes: updatedClasses,
          });
        }
      } catch (error) {
        alert("Error:" + error)
      }

    }
    // alert("Saved!");
    setOpenSavedAlert(true);
  }

  const saveEmpty = async (className: string): Promise<void> => {
    const db = getFirestore(app);
    const auth = getAuth();

    const user = auth.currentUser;

    if (user) {

      const uid = user.uid;
      // if (className) {
      // alert
      // IMPORTANT: Define newClassName properly
      const trimmedClassName = className.trim();

      if (!trimmedClassName) {
        alert("Invalid class name.");
        return;
      }

      const newClassName = className.replace(/[^a-zA-Z0-9_]/g, '_');

      if (newClassName === "") {
        alert("Invalid class name.");
        return;
      }

      // } else {
      //     alert("Invalid class name.");
      //     return;
      // }

      try {
        // const itemsDocRef = doc(db, "users", uid, newClassName, "info");
        // alert("Class name erg : " + newClassName);
        const itemsDocRef = doc(db, "users", uid, newClassName, "info")


        await setDoc(itemsDocRef, {
          createdAt: new Date(),
          notes: "",
          desks: {},
          fontSize: 12,
          items: {},
          setUp: {
            width: 500,
            height: 400,
          }
        });

        const classesDocRef = doc(db, "users", uid, "classList", "info");
        const docSnap = await getDoc(classesDocRef);
        let updatedClasses;
        if (docSnap.exists()) {
          const docData = docSnap.data();
          updatedClasses = docData.classes;
        } else {
          alert("oops! it seemed like we couldn't find records of this class :(")
        }
        updatedClasses.push(newClassName);
        await updateDoc(classesDocRef, {
          classes: updatedClasses,
        });
      } catch (error) {
        alert("Error:" + error)
      }

    }
    // setOpenSavedAlert(true); no alert since this save is usually hidden
  }
  const setItemData = (item: Item) => {
    setObjToAdd("placeholder");
    setObjShapeToAdd(item.getShape());
    setObjLabel(item.getName());
    setObjX(item.getXValue());
    setObjY(item.getYValue());
    setObjWidth(item.getWidthValue());
    setObjHeight(item.getHeightValue());
  }

  const setDeskData = (desk: Desk) => {
    setObjToAdd("desk");
    setObjShapeToAdd(desk.getShape());
    setObjLabel(desk.getName());
    setObjX(desk.getXValue());
    setObjY(desk.getYValue());
    setObjWidth(desk.getWidthValue());
    setObjHeight(desk.getHeightValue());
    // setObjAccomidations(desk.getAccomidations());
  }

  const setStudents = () => {
    setObjX(50);
    setObjY(50);
    let studentArr = studentsToAdd.split("\n").map(line => line.trim());
    if (studentArr.length > desks.length) {
      let desksToAdd: Desk[] = [];
      let numberOfDesksToAdd = studentArr.length - desks.length;;


      for (let i = 0; i < numberOfDesksToAdd; i++) {
        if (objToAdd !== "placeholder") {
          desksToAdd.push(new Desk(false, uuidv4(), objShapeToAdd, "student", 50, 50, objWidth, objHeight, colorToSet, []));
        } else {
          desksToAdd.push(new Desk(false, uuidv4(), objShapeToAdd, "student", 50, 50, 50, 50, "#000000", []));
        }


      }
      setDesks((prevDesks: Desk[]) => [...prevDesks, ...desksToAdd]);//make sure there are no concurrent timing issues
    }



    setDesks((prevDesks: Desk[]) =>
      prevDesks.map((desk, i) => {
        let deskCopy = new Desk(desk.getActive(), desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
        if (i < studentArr.length) {
          deskCopy.setName(studentArr[i]);
        } else {
          deskCopy.setName("");
        }
        return deskCopy;
      })
    );

  }

  const copyNumberedList = () => {
    setStudents();
    let students = "";
    for (let i = 0; i < desks.length; i++) {
      let desk = desks[i];
      if (i !== desks.length - 1) {
        students += i + 1 + ". " + desk.getName() + "\n";
      } else {
        students += i + 1 + ". " + desk.getName();
      }
    }
    navigator.clipboard.writeText(students);
  }

  const randomizeStudents = () => {
    let randomizedArr: any[] = [];
    for (let i = 0; i < desks.length; i++) {
      randomizedArr[i] = { accomidations: desks[i].getAccomidations(), name: desks[i].getName(), color: desks[i].getColorValue() };
    }

    randomizedArr.sort(function () { return 0.5 - Math.random() });
    setDesks((prevDesks: Desk[]) =>
      prevDesks.map((desk, i) => {
        let deskCopy = new Desk(desk.getActive(), desk.getId(), desk.getShape(), randomizedArr[i].name, desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), randomizedArr[i].color, randomizedArr[i].accomidations, desk.getType());
        return deskCopy;
      })
    );


  }

  const addObj = (e: any) => {
    if (objToAdd === "placeholder") {
      addItem();
    } else {
      addDesk();
    }
  }

  const removeObj = (e: any) => {
    if (objToAdd === "placeholder") {
      removeItem();
    } else {
      removeDesk();
    }
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
      // maxWidth: "100vw",
    }}>
      <Navbar />
      <Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, paddingLeft: "5px", paddingRight: "5px" }}>
            <Typography level="h3">Class Manager</Typography>
            <Button
              startDecorator={<AddIcon />}
              onClick={() => { setOpenModal(true); setCopyIndex(null); }}
              color="primary"
            >
              Add Class
            </Button>
          </Box>

          {classNames.length > 0 ? (
            <Tabs
              value={selectedTab}
              onChange={async (event, value) => {
                await save(); setSelectedTab(value); let classesArr = classNames.filter(cls => cls.trim() !== ''); let newClassName = classesArr[value || 0];
                setClassName(newClassName); updateInfoForCurrentClass();
              }}
              sx={{ borderRadius: 'md' }}
            >
              <TabList sx={{
                overflow: 'auto',
                flexWrap: 'nowrap',
                width: '100%',
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                }
              }}>
                {classNames.map((cls, index) => (
                  <Tab key={cls} value={index} sx={{
                    minWidth: 'auto',
                    whiteSpace: 'nowrap'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {cls}
                      <IconButton
                        color="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenModal(true);
                          setNewClassName('');
                          // handleAddClass();
                          //  handleCopyClass(index);
                          setCopyIndex(index);
                        }}
                        sx={{ fontSize: "15px" }}
                      >
                        <ContentCopyIcon fontSize="15px" />
                      </IconButton>
                      <IconButton
                        // size="sm" 
                        color="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClass(index);
                        }}
                        sx={{ fontSize: "15px" }}
                      >
                        <DeleteIcon fontSize="15px" />
                      </IconButton>
                    </Box>
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          ) : (
            <Sheet variant="outlined" sx={{ borderRadius: 'md', p: 3, textAlign: 'center' }}>
              <Typography level="body1">
                No classes available. Click "Add Class" to create one.
              </Typography>
            </Sheet>
          )}
        </Box>

        {/* Add Class Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalDialog>
            <ModalClose />
            <Typography level="h4">Add New Class</Typography>
            <FormControl sx={{ mt: 2 }}>
              <FormLabel>Class Name</FormLabel>
              <Input
                autoFocus
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Enter class name"
              />
            </FormControl>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
              <Button variant="plain" color="neutral" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                if (copyIndex == null) { handleAddClass() } else {
                  handleCopyClass(copyIndex);
                }
              }}>Add</Button>
            </Box>
          </ModalDialog>
        </Modal>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "right",
          display: "flex",
          margin: "0px",
          padding: "0px",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={openSavedAlert}
          onClose={() => { setOpenSavedAlert(false) }}
          key={'top-left-snackbar'}
          autoHideDuration={1500}
        >
          Saved!
        </Snackbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box

            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box id="tableArea" ref={contentRef}
              sx={{
                position: "relative", // This is crucial!
                border: '2px solid black',
                width: itemWidth,
                height: itemHeight,
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                overflow: "visible",
              }}>

              {items.map((element: Item, indexCurr: number) => {
                return (<Rnd
                  key={element.id}
                  bounds="parent"
                  style={{
                    display: "flex",
                    textWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "clip",
                    //        textAlign: "center",
                    // whiteSpace: "nowrap",
                    // overflow: "hidden",
                    // textOverflow: "clip",
                    paddingTop: "5px",
                    border: element.getActive() === true ? '1px solid blue' : `1px solid ${element.getColorValue()}`,
                    background: "#d9d9d9",
                    borderRadius: element.shape === 'rectangle' ? '0px' : '200px',
                    width: `${element.widthValue}px`,
                    height: `${element.heightValue}px`,
                    zIndex: 1000,
                    position: 'absolute'
                  }}
                  size={{ width: element.widthValue, height: element.heightValue }}
                  position={{ x: element.xValue, y: element.yValue }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrDesk(undefined);
                    setCurrItem(element);
                    setObjToAdd("placeholder");

                    setItemData(element);
                    setObjShapeToAdd(element.getShape());
                    let color = element.getColorValue();
                    if (colorModeOn) {
                      color = colorToSet;
                    }
                    setItems((prevItems: Item[]) =>
                      prevItems.map((item: Item) =>
                        item.id === element.id
                          ? new Item(true, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), color)
                          : new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue())
                      )
                    );

                    setDesks((prevDesks: Desk[]) =>
                      prevDesks.map((desk, i) => {
                        let deskCopy = new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
                        return deskCopy;
                      })
                    );
                  }}

                  onDragStop={(e, d) => {
                    setItemData(element);
                    let color = element.getColorValue();
                    if (colorModeOn) {
                      color = colorToSet;
                    }
                    setItems((prevItems: Item[]) =>
                      prevItems.map((item: Item) =>
                        item.id === element.id
                          ? new Item(true, item.getId(), item.getShape(), item.getName(), d.x, d.y, item.getWidthValue(), item.getHeightValue(), color)
                          : new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue())
                      )
                    );


                    setDesks((prevDesks: Desk[]) =>
                      prevDesks.map((desk, i) => {
                        let deskCopy = new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
                        return deskCopy;
                      })
                    );
                    setCurrDesk(undefined);
                    setCurrItem(element);
                    setObjToAdd("placeholder");
                    setObjShapeToAdd(element.getShape());
                    setObjX(d.x);
                    setObjY(d.y);
                    setObjWidth(element.getWidthValue());
                    setObjHeight(element.getHeightValue());

                  }
                  }
                  onResize={(e, direction, ref, delta, position) => {
                    setItemData(element);
                    let color = element.getColorValue();
                    if (colorModeOn) {
                      color = colorToSet;
                    }
                    setItems((prevItems: Item[]) =>
                      prevItems.map((item: Item) =>
                      item.id === element.id
                        ? new Item(true, item.getId(), item.getShape(), item.getName(), position.x, position.y, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10), color)
                        : new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue())
                    )
                    );


                    setDesks((prevDesks: Desk[]) =>
                      prevDesks.map((desk, i) => {
                        let deskCopy = new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
                        return deskCopy;
                      })
                    );
                    setCurrDesk(undefined);
                    setCurrItem(element);
                    setObjToAdd("placeholder");
                    setObjShapeToAdd(element.getShape());
                    setObjX(position.x);
                    setObjY(position.y);
                    setObjWidth(parseInt(ref.style.width, 10));
                    setObjHeight(parseInt(ref.style.height, 10));

                  }}

                >
                  <Typography sx={{ fontSize: fontSize + "px", color: "black" }}>{element.name}</Typography>

                </Rnd>
                );
              })}
              {/* to reverse do .slice().reverse() */}
              {desks.map((element: Desk, indexCurr: number) => {
                return (
                  <Rnd
                    key={element.id}
                    bounds="parent"
                    style={{
                      display: "flex",
                      textWrap: "wrap",
                      alignItems: "center",
                      // justifyContent: "center",
                      border: element.getActive() === true ? '1px solid blue' : `1px solid ${element.getColorValue()}`,
                      width: `${element.widthValue}px`,
                      height: `${element.heightValue}px`,
                      background: "#ffffff",
                      flexDirection: "column", // Stack children vertically
                      justifyContent: noteBoxModeOn ? "flex-start" : 'center',

                      textAlign: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "clip",
                      paddingTop: "5px",
                      borderRadius: element.shape === 'rectangle' ? '0px' : '200px',
                      zIndex: 1000,
                      paddingBottom: "5px",
                      position: "absolute",
                    }}
                    size={{ width: element.widthValue, height: element.heightValue }}
                    position={{ x: element.xValue, y: element.yValue }}
                    onClick={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation(); //stop the overall onClick from running so it doens't override this
                      setCurrDesk(element);
                      setCurrItem(undefined);
                      setObjToAdd("desk");
                      setDeskData(element);
                      setObjShapeToAdd(element.getShape());

                      let color = element.getColorValue();
                      if (colorModeOn) {
                        color = colorToSet;
                      }
                      setDesks((prevDesks: Desk[]) =>
                        prevDesks.map((desk: Desk) =>
                          desk.id === element.id
                            ? new Desk(true, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), color, desk.getAccomidations(), desk.getType())
                            : new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType())
                        )
                      );
                      setItems((prevItems: Item[]) =>
                        prevItems.map((item, i) => {
                          let itemCopy = new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue());
                          return itemCopy;
                        })
                      );
                    }}


                    onDragStop={(e, d) => {
                      setDeskData(element);

                      let color = element.getColorValue();
                      if (colorModeOn) {
                        color = colorToSet;
                      }
                      setDesks((prevDesks: Desk[]) =>
                        prevDesks.map((desk: Desk) =>
                          desk.id === element.id
                            ? new Desk(true, desk.getId(), desk.getShape(), desk.getName(), d.x, d.y, desk.getWidthValue(), desk.getHeightValue(), color, desk.getAccomidations(), desk.getType())
                            : new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType())
                        )
                      );
                      setItems((prevItems: Item[]) =>
                        prevItems.map((item, i) => {
                          let itemCopy = new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue());
                          return itemCopy;
                        })
                      );
                      setCurrDesk(element);
                      setCurrItem(undefined);
                      setObjToAdd("desk");
                      setObjShapeToAdd(element.getShape());
                      setObjX(d.x);
                      setObjY(d.y);
                      setObjWidth(element.getWidthValue());
                      setObjHeight(element.getHeightValue());
                    }}
                    onResize={(e, direction, ref, delta, position) => {

                      let color = element.getColorValue();
                      if (colorModeOn) {
                        color = colorToSet;
                      }
                      setDeskData(element);
                      setDesks((prevDesks: Desk[]) =>
                        prevDesks.map((desk: Desk) => {
                          if (desk.id === element.id) {
                            console.log("Updating desk:", desk.id);
                            return new Desk(true, desk.getId(), desk.getShape(), desk.getName(), position.x, position.y, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10), color, desk.getAccomidations(), desk.getType());
                          } else {
                            return new Desk(false, desk.getId(), desk.getShape(), desk.getName(), desk.getXValue(), desk.getYValue(), desk.getWidthValue(), desk.getHeightValue(), desk.getColorValue(), desk.getAccomidations(), desk.getType());
                          }
                        })
                      );

                      setItems((prevItems: Item[]) =>
                        prevItems.map((item, i) => {
                          let itemCopy = new Item(false, item.getId(), item.getShape(), item.getName(), item.getXValue(), item.getYValue(), item.getWidthValue(), item.getHeightValue(), item.getColorValue());
                          return itemCopy;
                        })
                      );
                      setCurrDesk(element);
                      setCurrItem(undefined);
                      setObjToAdd("desk");
                      setObjShapeToAdd(element.getShape());
                      setObjX(position.x);
                      setObjY(position.y);
                      setObjWidth(parseInt(ref.style.width, 10));
                      setObjHeight(parseInt(ref.style.height, 10));
                    }}
                  >
                    {
                      swapModeOn &&
                      <IconButton aria-label="delete" size="small" sx={{ position: "absolute", top: 0, right: 0, textAlign: "right", backgroundColor: deskToSwap?.getId() === element.getId() ? 'lightblue' : 'white' }} onClick={(e) => { handleSwap(e, element, true) }}>
                        <SwapHorizIcon fontSize="small" />
                      </IconButton>
                    }
                    {!numbersModeOn &&
                      <Typography sx={{
                        fontSize: fontSize + "px", color: "black", maxWidth: "100%", textWrap: "wrap", overflow: "hidden",
                        textOverflow: "ellipsis", padding: "2px",
                        wordBreak: "break-word"
                      }}>{element.name}</Typography>
                    }
                    {numbersModeOn &&
                      <Typography sx={{ fontSize: fontSize + "px", color: "black" }}>{indexCurr + 1}</Typography>
                    }
                    {noteBoxModeOn &&
                      <img src="/images/notes.png" alt="Notes"
                        style={{
                          height: 'auto', width: "100%", maxHeight: "60%", marginTop: "auto", // This pushes the image to the bottom
                          alignSelf: "flex-end"
                        }} //not working properly
                      />
                    }
                  </Rnd>

                );
              })}
            </Box>
          </Box>
          {/* <Box sx={{height:"100%", display: "flex",
    justifyContent: "flex-end",
        alignItems: "flex-start",}}> */}
          <Box

            sx={{
              flex: 1,
              minWidth: "400px",
              // minHeight: "100%",
              // maxHeight:"100vh",
              height: "100%",
              overflowY: 'auto',
              backgroundColor: "rgb(235,235,235)",
              justifyContent: "center",
              textAlign: "center",
              paddingTop: "10px"
            }}
          >
            <Button variant="solid" color="neutral" onClick={() => {
              setOpen(true);
              let students = "";
              for (let i = 0; i < desks.length; i++) {
                let desk = desks[i];
                if (i !== desks.length - 1) {
                  students += desk.getName() + "\n";
                } else {
                  students += desk.getName();
                }
              }
              setStudentsToAdd(students);
            }}>
              Students List
            </Button>
            <Button variant="solid" onClick={randomizeStudents} sx={{ width: "175px", marginRight: "15px", marginLeft: "10px" }}>
              Randomize Students
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
                  sx={{ fontWeight: 'lg', mb: 1, marginRight: "10px" }}
                >
                  Students List
                </Typography>


                <Typography id="modal-desc" textColor="text.tertiary">
                  Please keep in mind that updating this list will override current students. Proceed with caution.
                </Typography>

                <Stack spacing={1}>
                  <Textarea
                    placeholder="Enter students here, seperated by new lines."
                    minRows={3}
                    maxRows={10}
                    variant="outlined"
                    value={studentsToAdd}
                    onChange={(event) => {
                      setStudentsToAdd(event.target.value);
                    }}
                    required
                    id="student_input"
                  />
                  <Button type="submit" onClick={() => { setStudents(); setOpen(false) }}>Update</Button>
                  {
                    numbersModeOn &&
                    <Button variant="solid" onClick={copyNumberedList} >
                      Copy Numbered List
                    </Button>
                  }
                </Stack>
              </Sheet>
            </Modal>
            <Box sx={{
              marginTop: "5px", display: "flex", width: "100%", gap: "10px",
              justifyContent: "center",
              textAlign: "center",
            }}>
              {!openNotes &&
                <Button onClick={() => { setOpenNotes(true) }} >
                  Open Notes <ArrowDropDownIcon />
                </Button>
              }
              {openNotes &&
                <Box>
                  <Button onClick={() => { setOpenNotes(false) }}>
                    Close Notes <ArrowDropUpIcon />
                  </Button>

                </Box>
              }
              {!openSetUp &&
                <Button onClick={() => { setOpenSetUp(true) }} >
                  Open Set Up <ArrowDropDownIcon />
                </Button>
              }


              {openSetUp &&

                <Button onClick={() => { setOpenSetUp(false) }}>
                  Close Set Up <ArrowDropUpIcon />
                </Button>
              }

            </Box>

            {openNotes &&
              <Box sx={{ padding: "5px" }}>
                <Textarea value={notes} onChange={(event) => {
                  setNotes(event.target.value);
                }} minRows={2} maxRows={15} />
              </Box>
            }
            {openSetUp &&

              <Box>
                <Box sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center", gap: "10px", marginTop: "5px"
                }}>
                  <Typography sx={{ marginLeft: "5px" }}>Font Size:</Typography>
                  <Input
                    type="number"
                    value={fontSize}
                    slotProps={{
                      input: {
                        ref: inputRef,
                        min: 1,
                        max: 20,
                        step: 1,
                      },
                    }}
                    onChange={(e: any) => { setFontSize(parseInt(e.target.value, 10) || 12) }}
                  />
                  <Typography>Color : </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{ height: "40px" }}
                    value={colorToSet}
                    label="colorToSet"
                    onChange={(e: any) => { setColorToSet(e.target.value) }}
                  >
                    <MenuItem value={"#000000"}>Black</MenuItem>
                    {/* <MenuItem value={"#0000FF"}>Blue</MenuItem> */}
                    <MenuItem value={"#FF0000"}>Red</MenuItem>
                    <MenuItem value={"#DB6600"}>Orange</MenuItem>
                    <MenuItem value={"#FFED00"}>Yellow</MenuItem>
                    <MenuItem value={"#76B80D"}>Green</MenuItem>
                    <MenuItem value={"#007CB5"}>Blue</MenuItem>
                    <MenuItem value={"#873B9C"}>Purple</MenuItem>

                  </Select>
                </Box>
                <Typography sx={{ margin: "5px" }}>Width : </Typography>
                <Slider
                  sx={{ width: "300px", margin: "5px", marginLeft: "15px" }}
                  aria-label="Custom marks"
                  value={itemWidth}
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
                  defaultValue={itemHeight}
                  getAriaValueText={valueText}
                  step={50}
                  min={100}
                  max={1200}
                  color="neutral"
                  valueLabelDisplay="auto"
                  marks={marks}
                  onChange={updateHeight}
                />
              </Box>
            }

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
                value={objToAdd}
                onClick={(e: any) => { setObjToAdd(e.target.value) }}
                id="typeRadioGroup"
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
                        <Radio id={value} value={value} label={value} />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </RadioGroup>
            </Box>
            <Box
            >
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
                  value={objShapeToAdd}
                  onClick={(e: any) => { setObjShapeToAdd(e.target.value) }}
                  onChange={updateObjShape}
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
                          <Radio id={value} value={value} label={value} />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </RadioGroup>
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
              <Box sx={{ display: "flex", justifyContent: "space-between", margin: "15px" }}>
                {(currDesk || currItem) &&
                  <Button variant="solid" onClick={removeObj} sx={{ width: "70px", marginRight: "15px" }}>
                    Remove
                  </Button>
                }
                <Button variant="solid" onClick={addObj} sx={{ width: "50px" }}>
                  Add
                </Button>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", margin: "5px", width: "100%" }}>
                <Button variant="solid" onClick={save} sx={{ width: "175px", marginLeft: "5px" }}>
                  Save
                </Button>
                {openAdvancedSettings &&
                  <Button onClick={() => { setOpenAdvancedSettings(false) }} >
                    Close Advanced <ArrowDropDownIcon />
                  </Button>
                }
                {!openAdvancedSettings &&
                  <Box>
                    <Button onClick={() => { setOpenAdvancedSettings(true) }}>
                      Open Advanced <ArrowDropUpIcon />
                    </Button>

                  </Box>
                }

              </Box>
              {openAdvancedSettings &&
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", margin: "5px", width: "100%" }}>
                    <Button variant="solid" onClick={clearItems} sx={{ width: "175px", marginLeft: "5px" }}>
                      Clear Placeholders
                    </Button>
                    <Button variant="solid" onClick={clearDesks} sx={{ width: "175px", marginRight: "5px" }}>
                      Clear Desks
                    </Button>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", margin: "5px", width: "100%" }}>
                    <Button variant="solid" onClick={resetColors} sx={{ width: "175px", marginLeft: "5px" }}>
                      Reset Colors
                    </Button>
                    <Button variant="solid" onClick={reactToPrintFn} sx={{ width: "175px", marginLeft: "5px" }}>
                      Print
                    </Button>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 2, paddingRight: "15px", paddingLeft: "15px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <Typography>Swap</Typography>
                      <Switch
                        checked={swapModeOn}
                        onChange={(event) => { setSwapModeOn(event?.target.checked) }}
                      />
                      <Typography>Number</Typography>
                      <Switch
                        checked={numbersModeOn}
                        onChange={(event) => { setNumbersModeOn(event?.target.checked) }}
                      />

                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 2, paddingRight: "15px", paddingLeft: "15px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <Typography>Color</Typography>
                      <Switch
                        checked={colorModeOn}
                        onChange={(event) => { setColorModeOn(event?.target.checked) }}
                      />
                      <Typography>Note Boxes</Typography>
                      <Switch
                        checked={noteBoxModeOn}
                        onChange={(event) => { setNoteBoxModeOn(event?.target.checked) }}
                      />
                    </Box>
                  </Box>

                </Box>

              }
              {/* </Box> */}
            </Box>
          </Box>


        </Box>

      </Box>

    </Box>
  );
}
