import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { loadConfigFromFile } from 'vite'

function App() {
  const [useData,setUseData]=useState([])
  const [useidx,setUseidx]=useState(1)
  
  const getData= async()=>{
    const response= await axios.get(`https://picsum.photos/v2/list?page=${useidx}&limit=50`)
    setUseData(response.data);
    console.log(response.data);
    



  }
  let update = <h1></h1>
  if(useData.length>0){
    update= <div className='flex justify-center items-center gap-20 p-5'>
      <button
      onClick={()=>{
        if(useidx>1){
        setUseidx(useidx-1)
        }
        setUseData([])
      }
      }
      className='bg-amber-600 text-black px-7 py-1 rounded active:scale-95 '>Prev</button>
      <h1>page is {useidx}</h1>
      <button
       onClick={()=>{
           setUseidx(useidx+1)
           setUseData([])
       }}
      className='bg-amber-600 text-black px-7 py-1 rounded active:scale-95'>Next</button>
    </div>
  }


     let printUserData = <h1 className='-translate-x-1/2 -translatey-1/2 flex justify-center items-center top-1/2 left-1/2 absolute'>Loading...</h1>
  if(useData.length>0){
    
      printUserData= useData.map(function(elem,idx){
       return(  
      
    <div key={idx} >
     <a href={elem.url}>
       <div className='h-52 w-49 rounded-xl '>
          <img src={elem.download_url} alt="" className='h-full w-full  bg-cover bg-center rounded-xl' />
          </div>
        <h1 >{elem.author}</h1>
     </a>
      </div>
     )
      })
  }
  
  let number=<h1></h1>
  if(useData.length>0){
    number=<h1 className='fixed bg-amber-300 text-black p-1 rounded text-lg m-1'>{useidx}</h1>
  }
  

  useEffect(function(){
   getData() 
  },[useidx])
  
  

  return (
    <div className='bg-pink-200 text-gray-700 h-screen overflow-auto border-pink-900 border-2 ' >
    
       <div>{number}</div>
     
      {/* <button className='bg-red-500'  onClick={getData}>Get Items</button>  */}
     <div className='flex flex-wrap gap-7 m-10'>
       {printUserData}
      </div>
         <div>{update}</div> 
     </div>


  )
}

export default App
