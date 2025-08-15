import React,{useState} from 'react';
import profile from '../asset/profile.jpg';
import { FaCog } from 'react-icons/fa'; 
import { Plus } from 'lucide-react'// ensure path and export are correct
import { CiCamera } from "react-icons/ci";
import { FaTh, FaBookmark, FaUserAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux';
function Userinfo() {
   
  const user = useSelector((state) => state.user.user)
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
           src={profile} 
           alt="profile img..." />
        </div>
        {/* useinfo  */}
        <div className=' pt-4'>
           <div className='flex justify-center'>
            <div className='font-bold text-2xl'>{user.username}</div>
           <div className='bg-gray-900 px-4  flex items-center justify-center text-white text-sm rounded-xl ml-4 mr-2'>
           Edit Profile
          </div>

            <div className='bg-gray-900 px-4 flex items-center text-white justify-center rounded-xl'>View Profile</div>
           <div className=' flex items-center justify-center  ml-4 p-2 mr-4'> <FaCog className="text-2xl" /></div>
           </div>
           {/* post  */}
           <div className='flex gap-8 mt-6 text-gray-300 '>
             <div> 0 posts</div>
             <div>262 followers</div>
             <div>106 following</div>
           </div>
           <div className='mt-7'>
            KASHYAP
           </div>
           <div>
            LUDHIANA
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

export default Userinfo;
