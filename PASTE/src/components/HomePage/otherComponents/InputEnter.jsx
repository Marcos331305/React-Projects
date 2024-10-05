import React, { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { handlePaste } from "../../../app.js";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { pasteContext } from '../../PasteViewPage/ViewPaste.jsx';

const InputEnter = ({content, setContent, viewingPasteId}) => {
  const viewingPaste = useContext(pasteContext);
  const [title, setTitle] = useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pasteSlice.pastes);
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => pasteId === p._id);
      setTitle(paste.title);
      setContent(paste.content);
    }
  }, [pasteId])
  
  return (
    <div className='mt-7 sm:mt-12 flex flex-wrap sm:justify-center gap-y-4 gap-4 w-[94%]'>
      <input disabled={ viewingPasteId && true } type="text" value={ viewingPaste?.title || title } onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title Here....' className={`bg-[#0F0F0F] border border-[rgb(29,40,58)] rounded-[6px] w-full h-12 outline-none text-white px-3 ${ viewingPasteId ? 'sm:w-[700px]' : 'sm:w-[545px]' } text-xl`} />
      {
        viewingPasteId ? null : 
        <button onClick={() => handlePaste(pasteId,title,content,dispatch,setTitle,setContent,setSearchParams)} className='bg-[#6674CC] text-white text-sm rounded-[6px] py-3 px-4'>{pasteId ? 'Update My Paste' : 'Create My Paste'}</button>
      }
    </div>
  )
}

export default InputEnter