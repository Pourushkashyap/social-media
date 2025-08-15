

import { useEffect, useState } from 'react';
import Login from './Pages/Login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storedetail } from './feature/userslice';




function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch('/api/v1/users/me', {
  //         method: 'GET',
  //         credentials: 'include', // send cookies
  //       });
        
  //     const data = await res.json();
  //     console.log('Response from /me:', data);

  //       if (!res.ok) {
  //         throw new Error('Unauthorized');
  //       }

  //        data = await res.json();
  //       if (data.loggedIn) {
  //         navigate('/front'); // already logged in → go to dashboard
  //       }
  //     } catch (err) {
  //       // Not logged in → stay on login page
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/v1/users/me', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      console.log('Response from /me:', data);

      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      if (data.loggedIn) {
        dispatch(storedetail(data.user))
        navigate('/front');
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, [navigate,dispatch]);
  if (loading) return <p>Loading...</p>;

  return <Login />;

}

export default App;
