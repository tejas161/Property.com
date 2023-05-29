import React,{useEffect} from 'react'

import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const {url} = useGlobalContext();
    const navigate = useNavigate();

    const userLogout = async() => {

        const res = await fetch(`${url}/logout`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',

            },
            credentials:'include'


        });

        if(res.status === 200)
        {
            // navigate('/');
            window.location.href="/";
        }
        else{
            window.alert('error couldnt logout user');
        }
    
    }

    useEffect(() => {

        userLogout();
        return () => {
     
        };
        
    },[]);


    return (
        <div style={{height:'90vh'}}>
            
        </div>
    )
}

export default Logout;
