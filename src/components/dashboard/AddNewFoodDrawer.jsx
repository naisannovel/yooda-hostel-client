import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import { MAIN_API } from "../../API/url";

const AddNewFoodDrawer = ({ isOpen, drawerOpenHandler, addNewFoodItem, setSpinner, }) => {


  const { register, handleSubmit, reset, formState: { errors },} = useForm();

  const onSubmit = (data) => {
    setSpinner(true);
    axios.post(`${MAIN_API}/food`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        setSpinner(false);
        if (response.status === 200) {
          // alert after successfully add
          swal("successfully added!", "", "success");
        }

        addNewFoodItem((prevState) => [response.data, ...prevState]);
        drawerOpenHandler();
      })
      .catch((err) => {
        setSpinner(false);
        swal(err.response.data, "", "error");
      });

    reset();
  };

  return (
    <div className="w-full h-full relative">
      <div className={`fixed overflow-y-scroll w-2/6 h-full bg-white shadow-2xl shadow-gray-400 rounded-none sm:rounded-tl-2xl overflow-hidden top-0 right-0 z-50 transition duration-1000 ease-in-out ${ isOpen ? "" : "translate-x-full"}`}>
        <div className="container w-3/4 h-full m-12">
          <button
            className="flex items-center justify-center py-2 px-5 rounded-lg bg-blue-100 hover:bg-blue-100 text-blue-800 text-md focus:outline-none focus:ring-2 ring-offset-1"
            onClick={drawerOpenHandler} ><IoArrowBack className="mr-1" /> Back </button>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center mt-16">

            <input {...register("name", { required: true, minLength: 1, maxLength: 255 })} className="rounded-input bg-gray-200" type="text" placeholder="Food Name" />
            {errors.name && <span className="text-red-500 text-md">required</span>}

            <input {...register("price", { required: true })} className="rounded-input bg-gray-200 mt-6" type="number" placeholder="Price" />
            {errors.price && <span className="text-red-500 text-md">required</span> }

            <button
              className="flex items-center justify-center mt-4 py-2 px-7 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-md focus:outline-none focus:ring-2 ring-offset-1 disabled:cursor-not-allowed"
              type="submit" > Submit </button>

          </form>
        </div>
      </div>
      {isOpen && <div className="fixed w-full h-full bg-black opacity-20 top-0 left-0"></div>}
    </div>
  );
};

export default AddNewFoodDrawer;
