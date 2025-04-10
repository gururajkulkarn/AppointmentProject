import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
 
const { speciality} = useParams()
const [filterDoc, setFilterDoc] = useState([])
const navigate = useNavigate()
const { doctors } = useContext(AppContext)


const applyFilter = () =>{
  if (speciality) {
    setFilterDoc(doctors.filter(doc => doc.speciality === speciality))

  }
  else {
    setFilterDoc(doctors)
  }
}

useEffect(()=>{
  applyFilter()
}, [doctors,speciality])


  return (
    <div>
     <p>Browse through doctors speciality</p>
     <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <div className='flex flex-col gap-4 text-sm text-gray-600'>
        <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}  className="cursor-pointer hover:text-blue-500">General physician</p>
        <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className="cursor-pointer hover:text-blue-500">Gynecologist</p>
        <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className="cursor-pointer hover:text-blue-500">Dermatologist</p>
        <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className="cursor-pointer hover:text-blue-500">Pediatricians</p>
        <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className="cursor-pointer hover:text-blue-500">Neurologist</p>
        <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className="cursor-pointer hover:text-blue-500">Gastroenterologist</p>
      </div>
      <div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0'>

{filterDoc.map((item, index) => (
                <div onClick={()=> navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer shadow-md'>
                    <img className='w-full h-40 object-cover bg-blue-50' src={item.image} alt={item.name} />
                    <div className='p-4'>
                        <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                            <p className='text-sm text-green-600'>Available</p>
                        </div>
                        <div className='flex flex-col items-center mt-2 text-sm text-center text-gray-700'>
                            <p className='font-semibold'>{item.name}</p>
                            <p className='text-gray-500'>{item.speciality}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
      </div>
     </div>
    </div>
  )
}

export default Doctors