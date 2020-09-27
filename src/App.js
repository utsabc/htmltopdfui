import React,{useState,useEffect} from 'react';
import './App.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';




function App() {
   const [html,setHTML] = useState('');
   const [filename,setFileName] = useState('Sample');


   const submitHandler = (e) => {
    e.preventDefault();
      axios.post("/service/generate",{filename, html})
        .then(function (response) {
        console.log(response);
          downloadPDF(response.data.filename,response.data.content)
         })
        .catch(function (error) {
          console.log(error);
        });
    }  

    const downloadPDF = (filename,pdf) => {
      const linkSource = `data:application/pdf;base64,${pdf}`;
      const downloadLink = document.createElement("a");
      const fileName = filename;
      console.log(fileName);
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      console.log(downloadLink);
      downloadLink.click();
  }
  return (
    <div className="App">
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={html}
          onChange={(event,editor)=>{
            const data = editor.getData();
            setHTML(data);
          }}
          />

      </div>
      <div>
      <form onSubmit={submitHandler}>
      <ul className="form-container">
        <li> <label htmlFor="fileName">
             File-Name
            </label></li>
         <li> <input type="fileName" name="fileName" id="fileName" onChange={(e) => setFileName(e.target.value)}>
            </input></li>
           <li>
           <button type="submit" className="button primary">Submit</button>
           </li>
            
            </ul>
        </form>
      </div>
    </div>
  );
}

export default App;
