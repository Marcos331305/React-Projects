import React from 'react'
import editIcon from '../../../assets/edit-icon.png'
import deleteIcon from '../../../assets/delete-icon.png'
import shareLinkIcon from '../../../assets/share-link-icon.png'
import viewIcon from '../../../assets/view-icon.png'
import copyIcon from '../../../assets/copy-icon.png'
import dateIcon from '../../../assets/date-icon.png'

const Paste = () => {
    return (
        <div className='border border-[#4B5563] rounded-[5px] px-4 py-4'>
            {/* Wrapper */}
            <div className='flex flex-col lg:flex-row lg:justify-between gap-6'>
                {/* Left Part */}
                <div className='w-[90%] lg:w-[60%]'>
                    <h2 className='text-4xl text-white'>paste Title</h2>
                    <div className='mt-4 mr-2'>
                        <p className='text-sm text-[#C5C4C4] line-clamp-3 lg:line-clamp-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque expedita quaerat, dignissimos excepturi quae veniam sapiente ratione vel at ut pariatur maxime ab? Obcaecati esse maiores totam.</p>
                    </div>
                </div>
                {/* Right Part */}
                <div className='lg:flex lg:flex-col lg:gap-1'>
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
                    {/* Date & Time */}
                    <div className='flex mt-4 gap-2 lg:gap-3'>
                        <div>
                            <img src={dateIcon} alt="date_Icon" />
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='text-sm text-[#C5C4C4]'>Monday, 25 January At 8:12 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paste