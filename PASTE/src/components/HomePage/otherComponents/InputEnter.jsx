import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { handlePaste } from "../../../app.js";
import { useDispatch } from 'react-redux';

const InputEnter = ({content, setContent}) => {
  const [title, setTitle] = useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();

  return (
    <div className='mt-7 sm:mt-12 flex flex-wrap sm:justify-center gap-y-4 gap-4 w-[94%]'>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title Here....' className='bg-[#0F0F0F] border border-[rgb(29,40,58)] rounded-[6px] w-full h-12 outline-none text-white px-3 sm:w-[545px] text-xl' />
      <button onClick={() => handlePaste(pasteId,title,content,dispatch,setTitle,setContent,setSearchParams)} className='bg-[#6674CC] text-white text-sm rounded-[6px] py-3 px-4'>{pasteId ? 'Update My Paste' : 'Create My Paste'}</button>
    </div>
  )
}

export default InputEnter