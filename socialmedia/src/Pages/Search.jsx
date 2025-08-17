import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import profile from "../asset/profile.jpg"
import Profile_section from '../Components/Profile_section'
import { useNavigate } from 'react-router-dom'
function Search({setIsSearchOpen}) {
  const user = useSelector((state) => state.user.user)
  const [query,setquery] = useState("")
  const [results,setresults] = useState([]);

   const navigate = useNavigate();

 useEffect(() => {
    if (!query.trim()) {
      setresults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/v1/users/search?query=${query}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("Failed to fetch results");
          return;
        }
         
        const data = await res.json();
        console.log("result: ",data)
        setresults(data.data);
      } catch (err) {
        console.log("Error fetching search results: ", err);
      }
    };

    fetchResults();
  }, [query]);

  return (
   
    <>
     <div className="absolute top-0 left-20 w-96 h-screen bg-black border-r border-gray-800 p-4">
         <div>
           <h2 className="text-xl mb-4">Search</h2>
         
           <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded bg-gray-900 text-white"
            value = {query}
            onChange={(e) => setquery(e.target.value)}
          />
        
         </div>
         <div className='mt-7'>
          {results.map((u) =>(
            <div onClick={()=>{
               setIsSearchOpen(false)
              navigate(`/front/${u.username}`, { state: { user: u } })
            }
            }
               key={u._id} className='flex mb-2  '>
            <img src={u.avatar || profile} className='h-14 w-14 mr-2 rounded-full ' alt={u.username} />
            <div>
              <div className='fond-semibold'>{u.username}</div>
              <div className='text-sm text-gray-400'>{u.name}</div>
            </div>
          </div>
          ))}
           {/* <div className='flex mb-4 p-2'> */}
            {/* <img src={user.avatar} className='h-14 w-14 mr-2 rounded-full ' alt="" />
            <div>
              <div>pourush_7932</div>
              <div>KASHYAP enf joefj ojef oijfi nfojf iojef</div>
            </div> */}
          {/* </div> */}
         </div>
        </div>

       
        </>

  )
}

export default Search