import React, { useRef, useState } from 'react'
import axios from 'axios'
const FileUpload = () => {
    const [file,setFile]=useState();
    const [fileName,setFileName]=useState("");
    const fileInput =useRef();

    const saveFile=()=>{
setFile(fileInput.current.files[0])
setFileName(fileInput.current.files[0].name)
    }

    const uploadFile=async()=>{
        const formData=new FormData();
        formData.append("file",file);
        formData.append("filename",fileName);
  try {
  await  axios.post("http://localhost:8000/upload",formData)

  } catch (error) {
    
  }

    }

  return (
    <div>
      <input type='file' ref={fileInput} onChange={saveFile}/>
      <button onClick={uploadFile}>Upload</button>
    </div>
  )
}

export default FileUpload
