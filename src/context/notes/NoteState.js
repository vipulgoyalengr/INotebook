import   NoteContext  from "./notesContext";
import React, { useState } from 'react'

const NoteState=(props)=>{
  const host="http://localhost:2001"
    const s1=[ ]
    const [state,setState]=useState(s1);

    const getnotes=async(title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json=await response.json();
      console.log(json)
      setState(json)
    }


    const addnote=async(title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
           body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      });
      const note=await response.json();
      setState(state.concat(note))
      // const note={
      //   "_id": "63197865972bd466a0a605d1dddd",
      //   "user": "631826f4c2abfbce8c244f84",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2022-09-08T05:06:45.248Z",
      //   "__v": 0
      // }
      
    }

    const deletenote=async (id)=>{
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response)
      const newNote=state.filter((state)=>{return state._id!==id})
      setState(newNote)
      
    }

    const editnote=async (id,title,description,tag)=>{

        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
             body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json=response.json();
        console.log(json)
      
        // For client side
        const newNotes=JSON.parse(JSON.stringify(state))
      for (let i =0;i<newNotes.length;i++){
        if(newNotes[i]._id===id){
          newNotes[i].title=title;
          newNotes[i].description=description;
          newNotes[i].tag=tag;
          break;
        }
      }
      setState(newNotes)
      
    }
    // const update=()=>{
    //         setTimeout(()=>{
    //             console.log("larrry")
    //         },1000)
    // }
    return(

    <NoteContext.Provider value={{state,addnote,deletenote,editnote,getnotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}
export default NoteState;