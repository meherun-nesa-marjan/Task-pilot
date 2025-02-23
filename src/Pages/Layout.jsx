import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const  Layout= () => {
   const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        
        user ? (
                navigate('/task-manager')
        ) : (
            navigate('/')
        )
      
    );
};

export default Layout;