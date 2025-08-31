import React,{useEffect, useState} from 'react';
import { Plus } from 'lucide-react'// ensure path and export are correct
import { CiCamera } from "react-icons/ci";
import { FaTh, FaBookmark, FaUserAlt } from 'react-icons/fa'
import profile from "../asset/profile.jpg"
import { FiUserPlus } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {updatefollowing,storedetail} from "../feature/userslice.jsx"
import { useDispatch,useSelector } from 'react-redux';

function Profile_section() {
    const {username} = useParams();
    const location = useLocation();
  const [user, setUser] = useState(location.state?.user);
  const [isfollowing,setisfollowing] = useState(false);
  const dispatch = useDispatch()
  const currentuser = useSelector((state) => state.user.user);


  const [showlist, setshowlist] = useState(false);
    const [connections, setConnections] = useState({ followers: [], following: [] });
    const [modalType, setModalType] = useState("followers"); 
    const [error, setError] = useState(null);
    

    const showConnections = async (type) => {
    try {
      setError(null); // clear previous error
      const res = await fetch(`/api/v1/users/connection?username=${username}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch connections");

      const data = await res.json();
      setConnections(data.data || { followers: [], following: [] });
      setModalType(type); // "followers" ya "following"
      setshowlist(true);
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Unable to load connections.");
    }
  };

  useEffect(() =>{
    if(user && currentuser){
      setisfollowing(user.followers?.includes(currentuser._id))
    }
    if(!user){
        fetch(`/api/v1/users/search?query=${username}`,{
            method:'GET',
            credentials:"include"
        }).then(res =>res.json())
        .then(data =>{
            if(data.data && data.data.length > 0){
        setUser(data.data[0]);  
      } else {
        console.log("No user found");
      }
        })
        .catch(err =>console.log(err))
    }
  },[username,user])

 const follow = async () => {
  try {
    const res = await fetch(
      `/api/v1/users/follow?username=${user?.username || username}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log("current user ", data.data.currentuser)
    console.log("target user ",data.data.targetuser)

    if (res.ok && data.success) {
      const isNowFollowing = data.message === "follow successfully";

      setisfollowing(isNowFollowing);

     setUser(data.data.targetuser)
      // Update Redux for current user following list
      dispatch(
        storedetail(data.data.currentuser)
      );
    } else {
      console.error("Follow action failed:", data.message);
    }
  } catch (err) {
    console.log("Error is: ", err);
  }
};
  

  console.log("useselector ke andar ka data",user)
   const [activeTab, setActiveTab] = useState("home")
  return (
    
    <>
    <div className="w-screen md:pl-80 pl-24   bg-black  py-10 text-white min-h-screen flex-1">
        <div className="flex md:gap-28 gap-14 p-4">
        {/* image  */}
        <div  className='pt-4  md:w-40  w-32 flex items-center justify-center'>
          <img
           className='md:w-40 md:h-40 w-[130px] h-[130px] rounded-full border-4 border-white object-cover' 
           src={user?.avatar || profile} 
           alt="profile img..." />
        </div>
        {/* useinfo  */}
        <div className=' pt-4'>
           <div className='flex justify-center'>
            <div className='font-bold text-2xl'>{user?.username}</div>
           <div onClick={follow} className='bg-gray-900 px-4 cursor-pointer flex items-center justify-center text-white text-sm rounded-xl ml-4 mr-2'>
           {isfollowing ? 'following' : 'follow'}
          </div>

            <div className='bg-gray-900 px-4 flex items-center cursor-pointer text-white justify-center rounded-xl'>Message</div>
           <div className=' flex items-center bg-gray-800 py-2 px-3 justify-center rounded-xl ml-2 mr-4'> 
            {/* <FaCog className="text-2xl" /> */}
            <FiUserPlus />
           </div>
           <div></div>
           </div>
           {/* post  */}
           <div className='flex gap-8 mt-6 text-gray-300 '>
             <div> 0 posts</div>
             <div onClick={() => showConnections("followers")} className="cursor-pointer">{user?.followers?.length} followers</div>
             <div onClick={() => showConnections("following")} className="cursor-pointer">{user?.following?.length} following</div>
           </div>
           <div className='mt-7'>
            {user?.name}
           </div>
           <div>
            {user?.bio}
           </div>
        </div>

      </div>
      <div>
        <div className="space-y-1 mt-5 ">
      <button className="w-24 h-24 bg-[#1a1a1a] border-4  border-gray-600 rounded-full flex items-center justify-center">
        <Plus className="text-gray-400" size={28} strokeWidth={2} />
      </button>
      <span className="text-white text-sm font-medium  ml-8">New</span>
    </div>
      </div>




      <div className='flex justify-center gap-24 mt-12'>
  {[
    { name: "home", icon: <FaTh /> },
    { name: "bookmark", icon: <FaBookmark /> },
    { name: "profile", icon: <FaUserAlt /> }
  ].map(({ name, icon }) => (
    <div
      key={name}
      onClick={() => setActiveTab(name)}
      className="flex flex-col items-center cursor-pointer"
    >
      {React.cloneElement(icon, {
        className: `text-2xl ${activeTab === name ? "text-white" : "text-gray-400"}`
      })}
      <div
        className={`w-16 h-0.5 mt-3 rounded-full transition-all duration-300 ${
          activeTab === name ? "bg-white" : "bg-transparent"
        }`}
      />
    </div>
  ))}
</div>
      
      <hr  className=' border-gray-700'/>
      
      {activeTab == 'home' && (
       <div className='mt-10'>
        <div className='flex justify-center'>
           <button className='w-16 h-16 bg-black border-2 border-gray-200 rounded-full flex items-center justify-center'>
            <CiCamera className='text-gray-200 ' size={40}/>
           </button>

                </div>
                <div  className='font-bold my-4 text-4xl flex justify-center'>Share Photos</div>
                <div className='flex justify-center'>When you share photos, they will appear on your profile.</div>
                <div className='text-blue-500 my-4 flex justify-center hover:text-blue-600'>Share Your first photo</div>
      </div>

      )}

      

      

    </div>

      {showlist && (
            <div
              className="fixed inset-0 bg-black/60 text-white flex items-center justify-center z-50"
              onClick={() => setshowlist(false)}
            >
              <div
                className="w-[550px] h-96 bg-gray-900 rounded-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center p-2 font-bold border-b">
                  {modalType === "followers" ? "Followers" : "Following"}
                </div>
    
                <div className="w-full">
                  <div className="flex items-center my-3 justify-center rounded-xl">
                    <input
                      type="text"
                      placeholder="search"
                      className="bg-gray-700 rounded-xl p-1 px-2 w-[90%]"
                    />
                  </div>
    
                  {/* error handling */}
                  {error ? (
                    <div className="text-red-500 text-center mt-4">{error}</div>
                  ) : (
                    <div className="w-[90%] m-auto space-y-3 overflow-y-auto h-64">
                      {connections[modalType]?.length > 0 ? (
                        connections[modalType].map((person) => (
                          <div
                            key={person._id}
                            className="flex justify-between items-center"
                          >
                            <div className="flex gap-2 items-center">
                              <img
                                className="rounded-full w-9 h-9"
                                src={person.avatar || profile}
                                alt="profile"
                              />
                              <div>
                                <div className="font-semibold">{person.username}</div>
                                <div className="text-sm text-gray-400">{person.name}</div>
                              </div>
                            </div>
                            <div className="bg-gray-800 px-2 py-1 rounded-xl cursor-pointer">
                              {modalType === "followers" ? "Remove" : "Unfollow"}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400 text-center mt-4">
                          No {modalType} found
                        </div>
                      )}
                    </div>
                  )}
                </div>
    
                {/* Close button */}
                <button
                  onClick={() => setshowlist(false)}
                  className="absolute top-2 right-3 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
    </>

  );
}

export default Profile_section


