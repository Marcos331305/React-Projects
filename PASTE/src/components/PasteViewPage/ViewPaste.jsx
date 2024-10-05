import React, { createContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PasteApp from '../HomePage/otherComponents/PasteApp'

export const pasteContext = createContext();

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pasteSlice.pastes);
  const paste = allPastes.find((p) => id === p._id);
  return (
    <div>
      <pasteContext.Provider value={paste}>
        <PasteApp viewingPasteId={id} />
      </pasteContext.Provider>
    </div>
  )
}

export default ViewPaste