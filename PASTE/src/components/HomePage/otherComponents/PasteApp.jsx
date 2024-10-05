import React from 'react'
import InputEnter from './InputEnter'
import TextArea from './TextArea'
import { useState } from 'react'

const PasteApp = ({viewingPasteId}) => {
  const [content,setContent] = useState('');
  return (
    <div className='flex flex-col items-center mt-[64px] pb-[30px]'>
      <InputEnter content={content} setContent={setContent} viewingPasteId={viewingPasteId} />
      <TextArea content={content} setContent={setContent} viewingPasteId={viewingPasteId} />
    </div>
  )
}

export default PasteApp