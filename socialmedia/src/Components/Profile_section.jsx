import React,{useEffect, useState} from 'react';
import { Plus } from 'lucide-react'// ensure path and export are correct
import { CiCamera } from "react-icons/ci";
import { FaTh, FaBookmark, FaUserAlt } from 'react-icons/fa'
import profile from "../asset/profile.jpg"
import { FiUserPlus } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function Profile_section() {
    const {username} = useParams();
    const location = useLocation();
  const [user, setUser] = useState(location.state?.user);

  useEffect(() =>{
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
  

  console.log("useselector ke andar ka data",user)
   const [activeTab, setActiveTab] = useState("home")
  return (
    
    <>
    <div className='ml-64 bg-black px-44 py-10  text-white min-h-screen flex-1'>
      <div className='flex gap-28  p-4 '>
        {/* image  */}
        <div  className='pt-4'>
          <img
           className='w-40 h-40 rounded-full border-4 border-white object-cover' 
           src={user?.avatar || profile} 
           alt="profile img..." />
        </div>
        {/* useinfo  */}
        <div className=' pt-4'>
           <div className='flex justify-center'>
            <div className='font-bold text-2xl'>{user?.username}</div>
           <div className='bg-gray-900 px-4  flex items-center justify-center text-white text-sm rounded-xl ml-4 mr-2'>
           Following
          </div>

            <div className='bg-gray-900 px-4 flex items-center text-white justify-center rounded-xl'>Message</div>
           <div className=' flex items-center bg-gray-800 py-2 px-3 justify-center rounded-xl ml-2 mr-4'> 
            {/* <FaCog className="text-2xl" /> */}
            <FiUserPlus />
           </div>
           <div></div>
           </div>
           {/* post  */}
           <div className='flex gap-8 mt-6 text-gray-300 '>
             <div> 0 posts</div>
             <div>{user?.followers?.length} followers</div>
             <div>{user?.following?.length} following</div>
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

      

      {/* <div className='mt-10'>
        <div className='flex justify-center'>
           <button className='w-16 h-16 bg-black border-2 border-gray-200 rounded-full flex items-center justify-center'>
            <CiCamera className='text-gray-200 ' size={40}/>
           </button>

                </div>
                <div  className='font-bold my-4 text-4xl flex justify-center'>Share Photos</div>
                <div className='flex justify-center'>When you share photos, they will appear on your profile.</div>
                <div className='text-blue-500 my-4 flex justify-center hover:text-blue-600'>Share Your first photo</div>
      </div> */}

    </div>
    </>

  );
}

export default Profile_section