import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { handlePaste } from "../../../app.js";

const InputEnter = () => {
  const [title, setTitle] = useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  return (
    <div className='mt-7 flex flex-wrap gap-y-4'>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title Here....' className='bg-[#0F0F0F] border border-[rgb(29,40,58)] rounded-[6px] w-[80%] h-12 outline-none text-white px-2 ml-[38px] sm:w-[400px] text-xl' />
      <button onClick={handlePaste} className='bg-[#6674CC] ml-[38px] text-white text-sm rounded-[6px] py-3 px-4'>{pasteId ? 'Update My Paste' : 'Create My Paste'}</button>
    </div>
  )
}

export default InputEnter