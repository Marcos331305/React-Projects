import React from 'react'
import InputEnter from './InputEnter'
import TextArea from './TextArea'
import { useState } from 'react'

const PasteApp = () => {
  const [content,setContent] = useState('');
  return (
    <div className='flex flex-col items-center'>
      <InputEnter content={content} setContent={setContent} />
      <TextArea content={content} setContent={setContent} />
    </div>
  )
}

export default PasteApp