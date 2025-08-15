import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storedetail } from '../feature/userslice';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const dispatch = useDispatch()
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch('/api/v1/users/me', {
  //         method: 'GET',
  //         credentials: 'include', // send cookies
  //       });

  //       if (!res.ok) {
  //         setAllowed(false);
  //         return;
  //       }

  //       const data = await res.json();
  //       setAllowed(data.loggedIn === true);
  //     } catch (err) {
  //       setAllowed(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/v1/users/me', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      console.log('ProtectedRoute /me response:', data);

      if (!res.ok) {
        console.error('Response not OK:', res.status);
        setAllowed(false);
        return;
      }
    
      if(data.loggedIn){
        setAllowed(true)
        dispatch(storedetail(data.user))
      }

      // setAllowed(data.loggedIn === true);
    } catch (err) {
      console.error('ProtectedRoute error:', err);
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!allowed) return <Navigate to="/" replace />;

  return children;
}
