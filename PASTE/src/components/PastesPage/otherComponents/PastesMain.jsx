import React, { useState } from 'react'
import Paste from './Paste'
import { useDispatch, useSelector } from 'react-redux';

const PastesMain = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const pastes = useSelector((state) => state.pasteSlice.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='mt-[96px] flex items-center flex-col gap-5'>
        <div className='w-[90%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[51%]'>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search question here...' className='bg-[#27272A] w-full py-2 px-4 outline-none text-white rounded-[5px]' />
        </div>
        <div className='w-[90%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[51%] border border-[#4B5563] rounded-[5px] py-4'>
            <div className='border-b border-[#4B5563] px-4 pb-4'>
                <h1 className='text-white text-4xl'>All Pastes</h1>
            </div>
            <div className='px-4 pt-4 flex flex-col gap-3'>
              {
                filteredData.length > 0 &&
                filteredData.map(
                  (paste) => <Paste pasteId={paste._id} title={paste.title} content={paste.content} createdAt={paste.createdAt} key={paste._id} />
                )
              }
            </div>
        </div>
    </div>
  )
}

export default PastesMain