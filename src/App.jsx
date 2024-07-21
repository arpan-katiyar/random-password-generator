import { useState,useCallback ,useEffect,useRef} from 'react'


function App() {
  const [length, setlength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passref=useRef(null)
 const passwordGenerator=useCallback(()=>{
  let pass=""
  let string1="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(numberAllowed) string1+="0123456789"
  if(charAllowed) string1+="!@#$%&*"
  for (let i = 0; i < length; i++) {
    let char = Math.floor(Math.random()*string1.length+1);
    pass+=string1.charAt(char)
    
  }
  setPassword(pass)
},
  [length,numberAllowed,charAllowed,setPassword])
  const copyPasswordToClipboard=useCallback(()=>{
     passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
 


  return (
    <>
    <div className='w-full max-w-md mx-8 shadow-md rounded-lg px-8 py-3   text-orange-500 bg-gray-700 '>
    <h1 className='text-white text-center my-3'>Password generator</h1>

    <div className='bg-green-700 flex shadow rounded-lg overflow-hidden mb-4 px-3'>
    <input type="text" value={password} className='outline-none w-full py-2 px-4 my-4 rounded-lg' placeholder='Password' 
    readOnly ref={passref}/>
    <button onClick={copyPasswordToClipboard}
     className='outline-none bg-blue-700 text-white px-2 py-1 my-4 shrink-0'>copy</button>
    </div>
<div className='flex text-sm gap-x-2'>
<div className='flex item-center gap-x-1'>
<input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}  />
<lable > length:{length}</lable>
 </div>
 <div className='flex item-center gap-x-1'>
 <input type="checkbox"  defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((prev) =>!prev)}}  />
 <label htmlFor="numberInput">Numbers</label>

 </div>
 <div className='flex item-center gap-x-1'>
 <input type="checkbox"  defaultChecked={charAllowed} id="charInput" onChange={()=>{setCharAllowed((prev) =>!prev)}}  />
 <label htmlFor="charInput">characters</label>

  </div>
  </div>
 </div>
    </>
  )
}

export default App
