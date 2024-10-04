import React from 'react'
import editIcon from '../../../assets/edit-icon.png'
import deleteIcon from '../../../assets/delete-icon.png'
import shareLinkIcon from '../../../assets/share-link-icon.png'
import viewIcon from '../../../assets/view-icon.png'
import copyIcon from '../../../assets/copy-icon.png'
import dateIcon from '../../../assets/date-icon.png'
import { useDispatch } from 'react-redux'
import { removePaste } from '../../../features/paste/pasteSlice'
import toast from 'react-hot-toast'

const Paste = ( { pasteId, title, content, createdAt } ) => {
    const dispatch = useDispatch();
    const handleDeletePaste = (pasteId) => {
        dispatch(removePaste(pasteId));
    };
    const handleCopy = (content) => {
        navigator.clipboard.writeText(content);
        toast.success('Copied Successfully');
    };
    return (
        <div className='border border-[#4B5563] rounded-[5px] px-4 py-4'>
            {/* Wrapper */}
            <div className='flex flex-col lg:flex-row lg:justify-between gap-6'>
                {/* Left Part */}
                <div className='w-[90%] lg:w-[60%]'>
                    <h2 className='text-4xl text-white'>{title}</h2>
                    <div className='mt-4 mr-2'>
                        <p className='text-sm text-[#C5C4C4] line-clamp-3 lg:line-clamp-2'>{content}</p>
                    </div>
                </div>
                {/* Right Part */}
                <div className='lg:flex lg:flex-col lg:gap-1'>
                    {/* Functionality Buttons */}
                    <div className='flex gap-2'>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={editIcon} alt="Edit-Icon" />
                        </button>
                        <button onClick={() => handleDeletePaste(pasteId)} className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={deleteIcon} alt="Delete-Icon" />
                        </button>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={shareLinkIcon} alt="ShareLink-Icon" />
                        </button>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={viewIcon} alt="View-Icon" />
                        </button>
                        <button onClick={() => handleCopy(content)} className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={copyIcon} alt="Copy-Icon" />
                        </button>
                    </div>
                    {/* Date & Time */}
                    <div className='flex mt-4 gap-2 lg:gap-3'>
                        <div>
                            <img src={dateIcon} alt="date_Icon" />
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='text-sm text-[#C5C4C4]'>{`${createdAt.date} at ${createdAt.time}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paste