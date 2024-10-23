import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { supabase } from '../scripts/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  // Writing logic for authenticity of protected Routes
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuth(!!data.session);
    };
    checkAuth();
  }, [])

  // Show loading while authentication is being checked
  if (isAuth === null) {
    return <div>Loading...</div>; // You can replace this with a spinner or your preferred loading UI
  }

  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute