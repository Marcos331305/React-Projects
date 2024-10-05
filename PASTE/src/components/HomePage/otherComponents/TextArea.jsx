import { useContext } from 'react'
import copyIcon from '../../../assets/copy-icon.png'
import { pasteContext } from '../../PasteViewPage/ViewPaste'
import toast from 'react-hot-toast';

const TextArea = ({ content, setContent, viewingPasteId }) => {
  const viewingPaste = useContext(pasteContext);
  const handleCopy = () => {
    if (content === '') {
      if (viewingPasteId) {
        const pasteContent = viewingPaste?.content || '';
        if (pasteContent) {
          navigator.clipboard.writeText(pasteContent);
          toast.success('Content Copied Successfully', { duration: 700 });
        } else {
          toast('Nothing Copied 🙁', { duration: 700 });
        }
      } else {
        toast('Nothing Copied 🙁', { duration: 700 });
      }
    } else {
      navigator.clipboard.writeText(content);
      toast.success('Content Copied Successfully', { duration: 700 });
    }
  };
  return (
    <div className='mt-7 sm:mt-10 w-[94%] flex flex-col items-center'>
      <div className='w-full md:w-[700px] bg-[#333333] border-t border-l border-r border-[#4A4848] h-[36px] rounded-tl-md rounded-tr-md px-4 flex items-center'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex gap-x-[6px]'>
            <div className='h-[13px] w-[13px] rounded-full p-1 flex items-center justify-center overflow-hidden bg-[rgb(255,95,87)]'></div>
            <div className='h-[13px] w-[13px] rounded-full p-1 flex items-center justify-center overflow-hidden bg-[rgb(254,188,46)]'></div>
            <div className='h-[13px] w-[13px] rounded-full p-1 flex items-center justify-center overflow-hidden bg-[rgb(45,200,66)]'></div>
          </div>
          <button onClick={handleCopy}>
            <img src={copyIcon} alt="Copy-Icon" />
          </button>
        </div>
      </div>
      <textarea disabled={viewingPasteId && true} value={viewingPaste?.content || content} onChange={(e) => setContent(e.target.value)} rows={25} placeholder='Write Your Content Here....' className='bg-[#0F0F0F] py-3 px-4 w-full md:w-[700px] outline-none text-white text-md rounded-bl-md rounded-br-md resize-none border-b border-l border-r border-[#4A4848]'></textarea>
    </div>
  )
}

export default TextArea