import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, ImageSrc, Title, Discripton, Price, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/product/${id}`);
      onDelete(id);
      alert("delete Successfull")
      navigate("/")
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  };

  return (
    <div className=''>
      <div className='shadow-2xl rounded-2xl w-[300px] flex flex-col justify-center items-center bg-slate-200 h-[350px]'>
        <img width={100} className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' src={ImageSrc} alt="Product" />
        <h1 className='text-2xl font-bold'>{Title}</h1>
        <h3 className='font-serif text-center my-2'>{Discripton}</h3>
        <h2 className='text-xl font-semibold'>Rs.{Price}</h2>
        <div className='flex px-5 my-3 justify-between w-full '>
          <button className='bg-red-500 px-5 rounded-lg text-white text-xl py-2' onClick={handleDelete}>Delete</button>
          <button className='bg-blue-500 px-5 rounded-lg text-white text-xl py-2' onClick={onEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
