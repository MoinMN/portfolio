import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
import { AuthUser } from '../../api/auth.api';
import Loading from '../Loading';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuthentication = async () => {
    try {
      const res = await AuthUser();
      setIsAuthenticated(res.isAuthenticated);

      if (res.navigate) {
        return <PageNotFound />
      }
    } catch (err) {
      setIsAuthenticated(err.isAuthenticated);
      return <PageNotFound />
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />
  }

  if (isAuthenticated === false) {
    return <PageNotFound />;
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedRoute
