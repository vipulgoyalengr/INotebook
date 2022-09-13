import React, { useContext } from 'react'
import noteContext from '../context/notes/notesContext'
const NoteItem = (props) => {
  const context =useContext(noteContext);
  const {deletenote} = context;
    const {note,updatenotes}=props;
  return (
    <div className="col-md-3">
 
      <div className="card my-3" >
    {/* <img src="..." className="card-img-top" alt="..."/> */}
            <div className="card-body">
                <div className='d-flex align-items-center'>
                <h5 className="card-title">{note.title}</h5><i className="far fa-trash-alt mx-2" onClick={()=>{deletenote(note._id); props.showAlert("Deleted Successfully","success");}} ></i>
                <i className="fa-regular fa-pen-to-square" onClick={()=>{updatenotes(note);}}></i>

                </div>
                <p className="card-text{">{note.description}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem
