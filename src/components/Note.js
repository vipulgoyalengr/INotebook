import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/notes/notesContext'
import Addnote from './Addnote';
import NoteItem from './NoteItem';
import {Navigate, useNavigate} from 'react-router-dom'

const Note = (props) => {
    let history=useNavigate();
    const context =useContext(noteContext);
    const { state ,getnotes,editnote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const ref=useRef(null);
    const refClose=useRef(null);
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getnotes()
      }
      else{
        history('/login')
      }
      // eslint-disable-next-line
    },[])
    const updatenotes=((currentnotes)=>{
      ref.current.click();
      setNote(currentnotes)
    })
    const handleClick=(e)=>{
      console.log("Updated Changes",note)
      refClose.current.click();
      editnote(note._id,note.title,note.description,note.tag)
      props.showAlert("Updated Successfully","success");
        // addnote(note.title,note.description,note.tag)
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <>
        <Addnote showAlert={props.showAlert}/>
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
              <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' value={note.description}  onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag}  onChange={onChange}/>
          </div>
          {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
        </form>   
   </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.title.length<5 || note.description.length<5}  type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        <div className='row'>
        <h2 className='my-3'>Your Note</h2>
      {state.map((state)=>{
        return <NoteItem key={state._id} updatenotes={updatenotes} showAlert={props.showAlert} note={state}/>;
      })}
    </div>
    </>
  )
}

export default Note
