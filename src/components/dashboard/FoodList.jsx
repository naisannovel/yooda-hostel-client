import React, { useEffect, useState } from "react";
import { IoPencil, IoTrash, IoCheckmarkDoneOutline, IoChevronForward, IoChevronBack } from "react-icons/io5";
import AddNewFoodDrawer from "./AddNewFoodDrawer";
import { MAIN_API } from "../../API/url";
import axios from "axios";
import swal from "sweetalert";
import Spinner2 from "../utilities/Spinner2";

const FoodList = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [foodList, setFoodList] = useState([]);

  const [editId, setEditId] = useState(null);
  const [nextButtonDisable, setNextButtonDisable] = useState(false);
  const [inputData, setInputData] = useState({ name: "", price: "" });

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);

  const addNewFoodDrawerHandler = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const previousHandler = () => {
    setLimit((prevState) => prevState - 8);
    setSkip((prevState) => prevState - 8);
    setNextButtonDisable(false);
  };

  const nextHandler = () => {
    setLimit((prevState) => prevState + 8);
    setSkip((prevState) => prevState + 8);
  };

  // update handler
  const updateHandler = (id) => {
    const index = foodList?.findIndex((item) => item?._id === id);

    if ( foodList[index]?.name !== inputData.name || foodList[index]?.price !== inputData.price) {

      setSpinner(true);
      axios.put(`${MAIN_API}/food/${id}`, inputData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse( localStorage.getItem("token"))}`,
          },
        })
        .then((response) => {
          setSpinner(false);
          const newAry = [...foodList];
          newAry.splice(index, 1, response?.data);
          setFoodList(newAry);
          swal("successfully updated!", "", "success");
        });
    }

    setInputData({ name: "", price: "" });
    setEditId(null);
  };

  // Input Handler
  const inputChangeHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  // food delete handler
  const foodItemDeleteHandler = (id) => {
    setSpinner(true);
    axios.delete(`${MAIN_API}/food/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        setSpinner(false);
        const remainingFoods = foodList?.filter((item) => item?._id !== id);
        setFoodList(remainingFoods);
      })
      .catch((err) => {
        setSpinner(false);
      });
  };

  // edit icon click handler
  const editIconClickHandler = (item) => {
    setEditId(item?._id);
    setInputData({ name: item?.name, price: item?.price });
  };

  // call food list
  useEffect(() => {

    setSpinner(true);
    axios.get(`${MAIN_API}/food?limit=${limit}&skip=${skip}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        setSpinner(false);
        if (response?.data.length !== 0) {
          if (response?.data.length === 8) {
            setFoodList(response.data);
          } else {
            setFoodList(response.data);
            setNextButtonDisable(true);
          }
        } else {
          setNextButtonDisable(true);
        }
      });
  }, [limit, skip]);

  let displayFood = foodList?.map((item, index) => (
    <tr key={item?.id}>
      <th className="text-center py-2"> {index + 1} </th>

      <td className="text-center py-2"> {editId !== item?._id ? ( item?.name) : (
          <input onChange={(event) => inputChangeHandler(event)} className="table-input" value={inputData?.name} type="text" name="name" placeholder="Food Name" />)}
      </td>

      <td className="text-center py-2">{editId !== item?._id ? (item?.price) : (
          <input onChange={(event) => inputChangeHandler(event)} className="table-input" value={inputData?.price} type="number" name="price" placeholder="Price" /> )}
      </td>

      <td className="flex justify-center items-center py-2"> {editId !== item?._id ? 
          <IoPencil onClick={() => editIconClickHandler(item)} className="text-2xl mr-4 cursor-pointer" />
             : 
          <IoCheckmarkDoneOutline onClick={() => updateHandler(item?._id)} className="text-2xl mr-4 cursor-pointer" />
        }
        <IoTrash onClick={() => foodItemDeleteHandler(item?._id)} className="text-2xl cursor-pointer" />
      </td>

    </tr>
  ));

  return spinner ? ( <div className="h-screen grid place-items-center"> <Spinner2 /> </div> ) : (
    <div> <AddNewFoodDrawer drawerOpenHandler={addNewFoodDrawerHandler} isOpen={isOpenDrawer} addNewFoodItem={setFoodList} setSpinner={setSpinner} />
      <div className="w-3/4 mt-6 ml-auto flex justify-around items-center">
        <h4 className="text-center">Food List</h4>
        <button onClick={addNewFoodDrawerHandler} className="rounded-button"> ADD NEW FOOD </button>
      </div>
      <hr />

      <div className="container">
        <table className="table table-stripe">
          <thead>
            <tr>
              <th className="text-center w-1/4">#</th>
              <th className="text-center w-1/4">Name</th>
              <th className="text-center w-1/4">Price</th>
              <th className="text-center w-1/4">Manage</th>
            </tr>
          </thead>
          <tbody className="text-center">{displayFood}</tbody>
        </table>
      </div>
      {foodList?.length === 0 ? "" : (
        <div className="flex justify-center mt-10">
          <button onClick={previousHandler} disabled={!skip} className="prev-next-button mr-4" > <IoChevronBack /> <IoChevronBack className="mr-2 text-lg" /> </button>
          <button onClick={nextHandler} disabled={nextButtonDisable} className="prev-next-button ml-4" > <IoChevronForward className="ml-2" /> <IoChevronForward /></button>
        </div>
      )}
    </div>
  );
};

export default FoodList;