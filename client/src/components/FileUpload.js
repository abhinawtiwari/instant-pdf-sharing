import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange  = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                    // clear percentage after 
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });
            console.log(res);
            const { filename, filepath } = res.data;
            setUploadedFile({ filename, filepath });
            setMessage('File Uploaded')
        } catch (error) {
            console.log(error);
            if(error.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(error.response.data.message)
            }
        }
    }
  return (
    <Fragment>
        {message ? <Message message={message}/> : null}
        <form onSubmit={onSubmit}>
            <div className="form-group mb-4">
                <input className="form-control" type="file" id="formFile" onChange={onChange} />
            </div>
            <Progress percentage={uploadPercentage} />
            <input type="submit" value='Upload' className="btn btn-primary btn-block mt-4"/>
        </form>
    </Fragment>
  )
}

export default FileUpload
