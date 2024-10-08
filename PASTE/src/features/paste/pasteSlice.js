import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    createPaste: (state, action) => {
      const paste = action.payload;
      const newPasteTitle = paste.title;
      const newPasteContent = paste.content;
      // Check if the title or content is empty
      if (!newPasteTitle.trim() || !newPasteContent.trim()) {
        toast("Title and content cannot be empty! 🙁",{
          duration: 700
        });
        return; // Exit the function to prevent storing the paste
      }
      const pastesArray = JSON.parse(localStorage.getItem("pastes")) || [];
      // And only checking for the newPaste is already existes if pasteArray is not empty
      if (pastesArray.length > 0) {
        // Checking if the paste already exists or not!
        // Using:- Indexing with Map for Fast-Lookup
        const pastesMap = new Map(
          pastesArray.map((paste) => [paste.title, paste])
        );
        if (pastesMap.has(newPasteTitle)) {
          toast("Paste Already Exists 🙁",{
            duration: 700
          });
        } else {
          state.pastes.push(paste);
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast("Paste Created Successfully 🥳",{
            duration: 700
          });
        }
      } else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Created Successfully 🥳",{
          duration: 700
        });
      }
    },
    removePaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);
      if(index >= 0){
        state.pastes.splice(index,1);
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success('Paste Deleted',{
          duration: 700
        });
      }
    },
    updatePaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => paste.id === item.id);
      if(index >= 0){
        state.pastes[index] = paste;
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success('Pasted Updated',{
          duration: 700
        });
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
      toast.success('All Pastes Deleted',{
        duration: 700
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { createPaste, removePaste, updatePaste, resetAllPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
