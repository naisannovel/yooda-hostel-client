import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoPencil, IoTrash, IoCheckmarkDoneOutline } from "react-icons/io5";
import swal from 'sweetalert';
import { MAIN_API } from '../../API/url';
import AddStudentDrawer from './AddStudentDrawer';
import Spinner2 from '../utilities/Spinner2';


const StudentList = () => {

    const [isOpenDrawer,setIsOpenDrawer] = useState(false);
    const [studentList,setStudentList] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [editId,setEditId] = useState(null);

    const [inputData,setInputData] = useState({ fullName:'', roll:'', age:'', class:'', hallName:'' })


    const addNewFoodDrawerHandler = ()=> {
        setIsOpenDrawer(!isOpenDrawer)
    }

    const updateHandler = id =>{

        const index = studentList?.findIndex(item => item?._id === id);
        if(studentList[index]?.fullName !== inputData.fullName || studentList[index]?.roll !== inputData.roll || StudentList[index]?.age !== inputData.age || studentList[index]?.class !== inputData.class || studentList[index]?.hallName !== inputData.hallName ){
            setSpinner(true)
            axios.put(`${MAIN_API}/student/${id}`,inputData,{
                headers: {
                  "Content-Type":"application/json",
                  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
              }
              })
              .then(response =>{
                  setSpinner(false)
                  // alert after successfully add
                  const newAry = [...studentList];
                  newAry.splice(index,1,response?.data)
                  setStudentList(newAry)
                  swal("successfully updated!", "", "success");
              })
        }

        setInputData({ fullName:'', roll:'', age:'', class:'', hallName:'' })
        setEditId(null);
    }

    const checkBoxChangeHandler = (id,status) =>{

        const index = studentList?.findIndex(item => item?._id === id);
        axios.put(`${MAIN_API}/student/${id}`,{ status : !status },{
            headers: {
              "Content-Type":"application/json",
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
          })
          .then(response =>{
              setSpinner(false)
              // alert after successfully add
              const newAry = [...studentList];
              newAry.splice(index,1,response?.data)
              setStudentList(newAry)
              swal("successfully updated!", "", "success");
          })
    }

    const StudentDeleteHandler = id =>{
        setSpinner(true)
        axios.delete(`${MAIN_API}/student/${id}`,{
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }})
        .then(response => {
            setSpinner(false);
                const remainingStudents = studentList?.filter(item => item?._id !== id);
                setStudentList(remainingStudents)
            })
        .catch(err => {
            setSpinner(false)})
    }

    const editIconClickHandler = item =>{
        setEditId(item?._id)
        setInputData({ fullName: item?.fullName, roll: item?.roll, age:item?.age, class:item?.class, hallName: item?.hallName })
    }

    const inputChangeHandler = event =>{
        
        setInputData( {...inputData, [event.target.name] : event.target.value} )
    }

    let displayStudentList = studentList?.map((item,index) =>(
        <tr key={item?._id}>
            <th className='text-center py-2'> { index + 1 } </th>
            <td className='text-center py-2'> { editId !== item?._id ? item?.fullName : <input onChange={event => inputChangeHandler(event)} className='student-table-input' value={inputData.fullName} name='fullName' type="text" placeholder='Student Name' /> } </td>
            <td className='text-center py-2'> { editId !== item?._id ? item?.roll : <input onChange={event => inputChangeHandler(event)} className='student-table-input' value={inputData.roll} name='roll' type="text" placeholder='Roll' /> } </td>
            <td className='text-center py-2'> { editId !== item?._id ? item?.age : <input onChange={event => inputChangeHandler(event)} className='student-table-input' value={inputData.age} name='age' type="text" placeholder='Age' /> } </td>
            <td className='text-center py-2'> { editId !== item?._id ? item?.class : <input onChange={event => inputChangeHandler(event)} className='student-table-input' value={inputData.class} name='class' type="text" placeholder='Class' /> } </td>
            <td className='text-center py-2'> { editId !== item?._id ? item?.hallName : <input onChange={event => inputChangeHandler(event)} className='student-table-input' value={inputData.hallName} name='hallName' type="text" placeholder='Hall Name' /> } </td>
            <td className='text-center py-2'> <input onChange={()=> checkBoxChangeHandler(item?._id,item?.status)} type="checkbox" checked={item?.status} name='status' /> <span> { item?.status ? 'Active':'inActive' } </span> </td>
            <td className='flex justify-center items-center py-2'> { editId !== item?._id ? <IoPencil onClick={()=> editIconClickHandler(item)} className='text-2xl mr-4 cursor-pointer' /> : <IoCheckmarkDoneOutline onClick={()=> updateHandler(item?._id)} className='text-2xl mr-4 cursor-pointer' /> } <IoTrash onClick={()=>StudentDeleteHandler(item?._id)} className='text-2xl cursor-pointer' /> </td>
        </tr>
    ))

    useEffect(()=> {

        setSpinner(true);
        axios.get(`${MAIN_API}/student`,{
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }})
        .then(response =>{
            setSpinner(false);
            setStudentList(response.data);
        })
    } ,[])

    return (
        spinner ? <div className='h-screen grid place-items-center'><Spinner2/></div> :
        <div>
            <AddStudentDrawer drawerOpenHandler={addNewFoodDrawerHandler} isOpen={isOpenDrawer} addNewStudent={setStudentList} setSpinner={setSpinner} />
            <div className='w-3/4 mt-6 ml-auto flex justify-around items-center'>
                <h4 className='text-center'>Student List</h4>
                <button onClick={addNewFoodDrawerHandler} className='rounded-button'>ADD NEW STUDENT</button>
            </div>
            <hr/>

            <div className="container">
                <table className='table table-stripe'>
                        <thead>
                            <tr>
                                <th className='text-center w-1/12'>#</th>
                                <th className='text-center w-2/12'>Name</th>
                                <th className='text-center w-1/12'>Roll</th>
                                <th className='text-center w-1/12'>Age</th>
                                <th className='text-center w-1/12'>Class</th>
                                <th className='text-center w-2/12'>Hall Name</th>
                                <th className='text-center w-2/12'>Status</th>
                                <th className='text-center w-2/12'>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                                { displayStudentList }
                            {/* <tr>
                                <th className='text-center py-2'>1</th>
                                <td className='text-center py-2'> <input className='student-table-input' type="text" placeholder='Student Name' /></td>
                                <td className='text-center py-2'> <input className='student-table-input' type="text" placeholder='Roll' /> </td>
                                <td className='text-center py-2'> <input className='student-table-input' type="text" placeholder='Age' /> </td>
                                <td className='text-center py-2'> <input className='student-table-input' type="text" placeholder='Class' /> </td>
                                <td className='text-center py-2'> <input className='student-table-input' type="text" placeholder='Hall Name' /> </td>
                                <td className='text-center py-2'> <input type="checkbox" placeholder='Price' /> </td>
                                <td className='flex justify-center items-center py-2'> <IoCheckmarkDoneOutline className='text-2xl mr-4 cursor-pointer' /> <IoTrash className='text-2xl cursor-pointer' /> </td>
                            </tr> */}
                        </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;