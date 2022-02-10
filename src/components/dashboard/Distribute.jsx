import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MAIN_API } from "../../API/url";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Spinner2 from "../utilities/Spinner2";

const Distribute = () => {
  const { register, handleSubmit, reset } = useForm();

  const [date, setDate] = useState(new Date());
  const [spinner, setSpinner] = useState(true);
  const [foodList, setFoodList] = useState([]);

  const [studentValue, setStudentValue] = useState(null);
  const [foundedStudentList, setFoundedStudentList] = useState([]);
  const [showFoundedList, setShowFoundedList] = useState(false);


  // form submit handler
  const onSubmit = (data) => {
    setSpinner(true);
    data.date = date.toDateString();
    data.student = studentValue?._id;

    axios.post(`${MAIN_API}/serve`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        setSpinner(false);
        swal(response.data, "", "success");
      })
      .catch((err) => {
        setSpinner(false);
        swal(err.response.data, "", "error");
      });

    reset();
    setStudentValue(null);
    setDate(new Date());
  };


  // change handler
  const changeHandler = (event) => {

    setStudentValue(null);

    axios.get(`${MAIN_API}/student/${event.target.value}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then(response => {
        setFoundedStudentList(response.data);
        setShowFoundedList(true);
      })
      .catch(err => {
        setFoundedStudentList([]);
        setShowFoundedList(false);
      });
  };

  // founded student click handler
  const foundedStudentClickHandler = item => {
    setStudentValue(item);
    setShowFoundedList(false);
  };

  useEffect(() => {
    setSpinner(true);
    axios.get(`${MAIN_API}/all/food`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
          setFoodList(response.data);
          setSpinner(false);
      });
  }, []);

  let displayFoundedStudentList;

  if (foundedStudentList?.length) {
    displayFoundedStudentList = foundedStudentList?.map((item) => (
      <div
        onClick={() => foundedStudentClickHandler(item)}
        key={item?._id}
        className="py-2 bg-blue-100 border-b-2 border-l border-r rounded hover:bg-blue-50 hover:border-r-0 hover:border-l-0 cursor-pointer"
      >
        <p className="px-4 mb-0 text-base"> {item?.roll} </p>
      </div>
    ));
  } else {
    displayFoundedStudentList = (
      <div className="py-2 bg-blue-100 border-b-2 border-l border-r rounded hover:bg-blue-50 hover:border-r-0 hover:border-l-0 cursor-pointer">
        <p className="px-4 mb-0 text-base"> Not Found </p>
      </div>
    );
  }

  return spinner ? <div className="h-screen grid place-items-center"> <Spinner2 /> </div> : (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-6 ml-auto flex justify-around items-center">
          <h4 className="text-center">Distribute</h4>
        </div>
        <hr />

        <div className="container flex items-start mt-4">
          <div className="w-8/12">
            <div className="w-full flex justify-evenly items-center">
              <div className="w-5/12 relative">
                <input onChange={(event) => changeHandler(event)} value={studentValue?.roll} className="rounded-input rounded w-full border-2" type="text" placeholder="Search Student By Roll"/>
                <div className="absolute top-full left-0 w-full text-sm z-50">
                  {showFoundedList && displayFoundedStudentList}
                </div>
              </div>

              <div className="w-2/12">
                <select {...register("shift", { required: true })} className="w-full bg-blue-50 border-2 rounded-lg px-4 focus:outline-none appearance-none" >
                  <option className="text-gray-500" disabled> shift </option>
                  <option className="text-gray-500" value={"day"}> Day </option>
                  <option className="text-gray-500" value={"night"}> Night </option>
                </select>
              </div>

              <div className="w-3/12">
                <select {...register("status", { required: true })} className="w-full bg-blue-50 border-2 rounded-lg px-4 focus:outline-none appearance-none" >
                  <option className="text-gray-500" disabled> status </option>
                  <option className="text-gray-500" value={"served"}> Served </option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center">
              {foodList?.map((item) => (
                <div className="basis-48 shrink-0">
                  <input {...register("food", { required: true })} type="checkbox" id={item?._id} value={item?.name} />
                  <label className="text-lg font-semibold text-blue-900 ml-1" htmlFor={item?._id} > {item?.name} </label>
                </div>))}
            </div>
          </div>

          <div className="w-4/12"> <div> <Calendar className="border-2 rounded-lg" onChange={setDate} value={date} /> </div> </div>

        </div>
        <div className="text-center mt-8 mb-20"> 
            <button
                type="submit"
                disabled={!(studentValue?._id !== undefined)}
                className="py-2 px-12 rounded-lg bg-blue-200 disabled:bg-blue-100 hover:bg-blue-200 text-blue-800 disabled:cursor-not-allowed disabled:text-gray-400 text-lg font-bold focus:outline-none focus:ring-2"
            >Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Distribute;