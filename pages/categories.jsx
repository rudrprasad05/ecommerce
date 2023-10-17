import Layout from '@/components/layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {HiOutlineTrash, HiOutlinePencil} from 'react-icons/hi2'
import { HiOutlineX } from 'react-icons/hi'
import { useRouter } from 'next/router'

const categories = () => {

  const [name, setName] = useState("")
  const [editedCategory, setEditedCategory] = useState(null)
  const [parentCategory, setParentCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [properties, setProperties] = useState([])



  const router = useRouter()

  useEffect(() => {
    fetchCategory()
  }, [])

  const addProperty = () => {
    setProperties(prev => {
      return [...prev, {name: "", value: ""}] 
    })
  }

  const removeProperty = (index) => {
    
    setProperties(prev => {
      const newProps = [...prev].filter((p, pIndex) => {
        return pIndex != index
      })

      return newProps
    })
    
  }

  const fetchCategory = () => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  }

  const saveCategory = async(e) => {
    e.preventDefault()
    
    if(editedCategory){
      await axios.put('/api/categories', {
        name, 
        parentCategory, 
        _id: editedCategory._id, 
        properties: properties.map(p => ({
          name: p.name,
          value: p.value.split(",")
        }))})
      setEditedCategory(null)
      setParentCategory("")

    }
    else{
      await axios.post('/api/categories', {name, parentCategory, properties})
    }
    setName("")
    fetchCategory()
    setProperties([])
  }
 
  const deleteCategory = async (category) => {
    const {_id} = category
    console.log(_id)
    await axios.delete('/api/categories?_id=' + _id)
    fetchCategory()
  }

  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name)
    setProperties(
      category.properties.map(({name, value}) => ({
        name, 
        value: value.join(',')
      }))
    )

    if(category.parent?._id == null){
      setParentCategory('0')
    }
    setParentCategory(category.parent?._id)
  }

  const handlePropertyNameChange = (property, name, index) => {
    setProperties(prev => {
      const props = [...prev]
      props[index].name = name
      return props
    })
  }

  const handlePropertyValueChange = (property, value, index) => {
    setProperties(prev => {
      const props = [...prev]
      props[index].value = value
      return props
    })
  }

  const goBack = () => {
    setEditedCategory(null)
    setName("")
    setParentCategory("")
    setProperties([])
  }

  return (
    <Layout title={editedCategory ? (`Edit ${editedCategory.name}`) : "Categories"}>
      <h1>{editedCategory ? "Edit Category" : "Categories"}</h1>

      <form className="" onSubmit={saveCategory}>
        <div className="flex gap-5">
          <input 
            type="text" 
            placeholder='Category Name' 
            value={name} 
            onChange={e => setName(e.target.value)}
            className={'grow'}/>

          <select name="" id="" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
            <option value="0">None</option>
            {categories && categories.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
          </select>

        </div>

        <div className='flex flex-col my-5'>
          <label>Properties</label>
          <button 
            onClick={addProperty}
            className='button mr-auto' 
            type='button'>
              Add new Property
          </button>
          {properties && properties.map((property, i) => (
            <div className='flex gap-10 items-center mt-5' key={i}>
              <div className='grow flex gap-5'>
                <input 
                  className='w-1/2' 
                  type="text" 
                  placeholder='Property name (color, storage)'
                  value={property.name}
                  onChange={e => handlePropertyNameChange(property, e.target.value, i)}/>
                <input 
                  className='w-1/2' 
                  type="text" 
                  placeholder='Property value (black, 8gb)'
                  value={property.value}
                  onChange={e => handlePropertyValueChange(property, e.target.value, i)}/>
                
              </div>
              <button onClick={() => removeProperty(i)} type='button' className='my-auto'>
                <HiOutlineX className='hover:stroke-red-500'/>
              </button>
              
            </div>
          ))}
        </div>
        <div>
          {editedCategory && 
            <button 
              onClick={goBack}
              type='button' 
              className='rounded-md bg-red-500 px-5 py-2 text-white'>Cancel
            </button>
          } 

          <button 
            
            type='submit' 
            className='rounded-md bg-blue-500 px-5 py-2 text-white'>Save
          </button>

        </div>
        
      </form>

      {!editedCategory && categories && categories.map((item) => (
        <div key={item._id} className={"flex justify-between mb-2"}>
          <div>{item.name}</div>
          <div>{item?.parent?.name}</div>
          
          <div className='flex gap-2'>
            <button onClick={() => deleteCategory(item)}>
              <HiOutlineTrash className='hover:stroke-red-500'/>
            </button>
            <button onClick={() => editCategory(item)}>
              <HiOutlinePencil/>
            </button>
          </div>
        </div>
      ))}
      
    </Layout>
  )
}

export default categories