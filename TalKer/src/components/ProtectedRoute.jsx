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

  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute