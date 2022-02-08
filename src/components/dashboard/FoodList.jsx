import React from 'react';
import { IoPencil, IoTrash, IoCheckmarkDoneOutline } from "react-icons/io5";

const FoodList = () => {
    return (
        <div>
            <div className='w-3/4 mt-6 ml-auto flex justify-around items-center'>
                <h4 className='text-center'>Food Item</h4>
                <button className='rounded-button'>ADD NEW FOOD</button>
            </div>
            <hr/>

            <div class="container">
                <table className='w-full'>
                        <thead className='border-b-2'>
                            <tr>
                                <th className='text-center w-1/4'>#</th>
                                <th className='text-center w-1/4'>Name</th>
                                <th className='text-center w-1/4'>Price</th>
                                <th className='text-center w-1/4'>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b-2'>
                                <th className='text-center py-3'>1</th>
                                <td className='text-center py-3'>Rice</td>
                                <td className='text-center py-3'>100</td>
                                <td className='flex justify-center items-center py-3'> <IoPencil className='text-2xl mr-4 cursor-pointer' /> <IoTrash className='text-2xl cursor-pointer' /> </td>
                            </tr>
                            <tr className='border-b-2'>
                                <th className='text-center py-2'>1</th>
                                <td className='text-center py-2'> <input className='table-input' type="text" placeholder='Food Name' /> </td>
                                <td className='text-center py-2'> <input className='table-input' type="text" placeholder='Price' /> </td>
                                <td className='flex justify-center items-center py-2'> <IoCheckmarkDoneOutline className='text-3xl mr-4 cursor-pointer' /> <IoTrash className='text-2xl cursor-pointer' /> </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
    );
};

export default FoodList;