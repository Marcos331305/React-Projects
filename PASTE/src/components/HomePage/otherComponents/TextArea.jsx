import React, { useState } from 'react'
import copyIcon from '../../../assets/copy-icon.png'

const TextArea = () => {
  const [content,setContent] = useState('');
  return (
    <div className='mt-7'>
      <div className='w-[80%] md:w-[700px] ml-[38px] bg-[#333333] border-t border-l border-r border-[#4A4848] h-[36px] rounded-tl-md rounded-tr-md px-4 flex items-center'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex gap-x-[6px]'>
            <div className='h-[13px] w-[13px] rounded-full p-1 flex items-center justify-center overflow-hidden bg-[rgb(255,95,87)]'></div>
            <div className='h-[13px] w-[13px] rounded-full p-1 flex items-center justify-center overflow-hidden bg-[rgb(254,188,46)]'></div>
            <div className='h-[13px] w-[13px] rounded-full p-1 flex items-center justify-center overflow-hidden bg-[rgb(45,200,66)]'></div>
          </div>
          <div className='cursor-pointer'>
            <img src={copyIcon} alt="Copy-Icon" />
          </div>
        </div>
      </div>
      <textarea onChange={ (e) => setContent(e.target.value) } rows={25} placeholder='Write Your Content Here....' className='bg-[#0F0F0F] py-3 px-4 w-[80%] md:w-[700px] ml-[38px] outline-none text-white text-md rounded-md resize-none border-b border-l border-r border-[#4A4848]'></textarea>
    </div>
  )
}

export default TextArea