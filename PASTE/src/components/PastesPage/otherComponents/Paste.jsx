import React from 'react'
import editIcon from '../../../assets/edit-icon.png'
import deleteIcon from '../../../assets/delete-icon.png'
import shareLinkIcon from '../../../assets/share-link-icon.png'
import viewIcon from '../../../assets/view-icon.png'
import copyIcon from '../../../assets/copy-icon.png'

const Paste = () => {
    return (
        <div className='border border-[#4B5563] rounded-[5px] px-4 py-4'>
            {/* Wrapper */}
            <div className='flex flex-wrap'>
                {/* Left Part */}
                <div className='w-[69%] border border-emerald-500'>
                    <h2 className='text-4xl text-white'>paste Title</h2>
                    <div className='mt-4 mr-2 border border-red-700'>
                        <p className='text-sm text-[#C5C4C4] truncate overflow-hidden whitespace-nowrap'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque expedita quaerat, dignissimos excepturi quae veniam sapiente ratione vel at ut pariatur maxime ab? Obcaecati esse maiores totam perspiciatis corporis nesciunt?</p>
                    </div>
                </div>
                {/* Right Part */}
                <div className='ml-auto'>
                    {/* Functionality Buttons */}
                    <div className='flex gap-2'>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={editIcon} alt="Edit-Icon" />
                        </button>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={deleteIcon} alt="Delete-Icon" />
                        </button>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={shareLinkIcon} alt="ShareLink-Icon" />
                        </button>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={viewIcon} alt="View-Icon" />
                        </button>
                        <button className='py-2 px-2 border border-[#4B5563] rounded-[5px]'>
                            <img src={copyIcon} alt="Copy-Icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paste