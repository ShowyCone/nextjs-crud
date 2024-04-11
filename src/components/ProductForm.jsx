'use client'
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    price: 0.0,
    description: '',
  })

  const [file, setFile] = useState(null)
  const form = useRef(null)
  const router = useRouter()
  const params = useParams()

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        })
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)
    formData.append('description', product.description)

    if (file) {
      formData.append('image', file)
    }

    if (!params.id) {
      const res = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      const res = await axios.put(`/api/products/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }

    form.current.reset()
    router.refresh()
    router.push('/products')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-4/5'
      ref={form}
    >
      <label
        htmlFor='name'
        className='block text-gray-700 text-sm font-bold mb-2'
      >
        Product Name
      </label>
      <input
        autoFocus
        value={product.name}
        name='name'
        type='text'
        placeholder='name'
        onChange={handleChange}
        className='shadow appearance-none border rounded w-full py-2 px-3'
      />

      <label
        htmlFor='price'
        className='block text-gray-700 text-sm font-bold mb-2'
      >
        Product Price
      </label>
      <input
        value={product.price}
        name='price'
        type='text'
        placeholder='0.00'
        onChange={handleChange}
        className='shadow appearance-none border rounded w-full py-2 px-3'
      />

      <label
        htmlFor='description'
        className='block text-gray-700 text-sm font-bold mb-2'
      >
        Product Description
      </label>
      <textarea
        value={product.description}
        name='description'
        rows={3}
        type='text'
        placeholder='description'
        onChange={handleChange}
        className='shadow appearance-none border rounded w-full py-2 px-3'
      />

      <label
        htmlFor='image'
        className='block text-gray-700 text-sm font-bold mb-2'
      >
        Product Image:
      </label>
      <input
        type='file'
        className='shadow appearance-none border rounded w-full py-2 px-3 mb-2'
        onChange={(e) => {
          setFile(e.target.files[0])
        }}
      />

      {file && (
        <img
          className='h-24 my-4 object-contain mx-auto'
          src={URL.createObjectURL(file)}
          alt='product image0'
        />
      )}

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        {params.id ? 'Update product' : 'Save product'}
      </button>
    </form>
  )
}

export default ProductForm
