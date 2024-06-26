import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Product from './Product';

const PopUp = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const navigate = useNavigate();

  const Imagebase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Get the base64 string without the prefix
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/product", {
        title,
        description,
        price,
        image
      });
      console.log(res.data);
      getData();
      setOpen(false);
      alert("Product Successfully added");
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = await Imagebase64(file);
      console.log(image);
      setImage(image);
    }
  };

  const getData = async () => {
    const res = await axios.get("http://localhost:5000/api/product");
    setAllProduct(res.data.data);
    console.log(res.data);
  };

  const Toggle = () => {
    setOpen(!open);
  };

  return (
    <div className='w-full'>
      <div className='px-4 justify-between flex shadow-xl bg-slate-400 py-5'>
        <button className='bg-green-500 shadow-xl text-white mt-5 px-3 py-3 rounded-lg' onClick={Toggle}>
          Add Product
        </button>
        <div className='flex items-center'>
          <h3 className='text-xl text-white mx-4'>Search</h3>
          <input className='py-3 text-sm px-3 rounded-lg shadow-lg' placeholder='Search by Product Name' />
        </div>
      </div>
      {open && (
        <form onSubmit={handleSubmit} className='absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center w-full h-full'>
          <div className='w-[400px] rounded-2xl bg-blue-200 p-10'>
            <h1 className='text-2xl font-bold mb-3 text-center'>Add Product</h1>
            <div>
              <h1>Product Image</h1>
              <input onChange={handleChange} className='py-2' type='file' />
            </div>
            <div>
              <label>Title</label>
              <input onChange={(e) => setTitle(e.target.value)} value={title} className='w-full py-2 shadow-xl rounded-2xl border-2 border-blue-500' />
            </div>
            <div>
              <label>Description</label>
              <input onChange={(e) => setDescription(e.target.value)} value={description} className='w-full py-2 shadow-xl rounded-2xl border-2 border-blue-500' />
            </div>
            <div>
              <label>Price</label>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full py-2 shadow-xl rounded-2xl border-2 border-blue-500' />
            </div>
            <div className='flex justify-between'>
              <button type='button' className='text-white px-5 py-2 bg-red-400 mt-4 rounded-xl' onClick={Toggle}>Cancel</button>
              <button type='submit' className='px-5 py-2 bg-blue-400 text-white mt-4 rounded-xl'>Submit</button>
            </div>
          </div>
        </form>
      )}
      <Product allProduct={allProduct} />
    </div>
  );
};

export default PopUp;
