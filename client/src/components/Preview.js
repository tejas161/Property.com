import React,{useState} from 'react'

const Preview = ({file}) => {

//     const [preview,setPreview] = useState({});
// const reader = new FileReader();
// reader.readAsDataURL(file);
// reader.onload = () => {
//     setPreview(reader.result);
    
// }


    return (
        <div style={{
            maxHeight:'10%',
            overflow:'hidden',
           position:'relative'
        }}>
             <img
                            style={{
                              
                                maxWidth:'20%',
                                maxHeight:'10%'
                            }}
                            
                            src={file} alt=""/>
        </div>
    )
}

export default Preview;
