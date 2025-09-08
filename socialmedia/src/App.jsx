import { useEffect, useState } from 'react';
import Login from './Pages/Login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storedetail } from './feature/userslice';
import { setPosts } from './feature/postslice';



function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()




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
         console.log('User details stored in Redux:', data.user._id);
       const postRes = await fetch(`/api/v1/posts/user/${data.user._id}`, {
       method: "GET",
      credentials: "include",
});

const postData = await postRes.json();
console.log('Response from posts fetch:', postData); // 👈 Yaha print karega

if (postRes.ok) {
  dispatch(setPosts(postData.data));
}



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
