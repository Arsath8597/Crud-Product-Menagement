import React, { useEffect, useState } from 'react';
import Card from '../Pages/Card';
import axios from 'axios';

const Product = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const getData = async () => {
    try {
      const res = await axios.get(`https://crud-backend-navy.vercel.app
/api/product`);
      setAllProduct(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching the products:", error);
    }
  };

  const handleDelete = async (id) => {
  
    try {
      await axios.delete(`https://crud-backend-navy.vercel.app/api
/product/${id}`);
      setAllProduct(allProduct.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({
        ...form,
        image: reader.result.split(',')[1]
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`https://crud-backend-navy.vercel.app/api/product/${editingProduct._id}`, form);
      } else {
        await axios.post(`https://crud-backend-navy.vercel.app/api/product`, form);
      }
      setEditingProduct(null);
      getData();
      alert("Update Succesfull")
    } catch (error) {
      console.error("Error updating the product:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='grid grid-cols-3 gap-8 p-4'>
        {allProduct.map((item, index) => (
          <div key={index}>
            <Card
              id={item._id} 
              ImageSrc={`data:image/png;base64,${item.image}`}
              Title={item.title}
              Discripton={item.description}
              Price={item.price}
              onDelete={handleDelete}
              onEdit={() => handleEdit(item)}
            />
          </div>
        ))}
      </div>
      {editingProduct && (
        <div className="edit-form px-20 absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center w-full h-full">
          <div className='w-[400px] bg-slate-400 rounded-2xl px-10'>
            <h2 className='text-3xl font-semibold text-center mb-5'>Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input className='w-full py-4 px-2 rounded-lg my-2 ' type="text" name="title" value={form.title} onChange={handleChange} />
              </label>
              <label>
                Description:
                <input className='w-full py-4 px-2 rounded-lg my-2 ' type="text" name="description" value={form.description} onChange={handleChange} />
              </label>
              <label>
                Price:
                <input className='w-full py-4 px-2 rounded-lg my-2 ' type="number" name="price" value={form.price} onChange={handleChange} />
              </label>
              <label>
                Image:
                <input className='w-full py-4 px-2 rounded-lg my-2 ' type="file" name="image" onChange={handleImageChange} />
              </label>
              <div className='flex justify-between mb-5 mt-2'>
                <button type="button" className='px-5 bg-red-500 text-white py-3 rounded-xl ' onClick={() => setEditingProduct(null)}>Cancel</button>
                <button type="submit" className='px-5 bg-green-500 text-white py-3 rounded-xl '>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
