import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { storedetail } from '../feature/userslice';
import profile from "../asset/profile.jpg"
import { useNavigate } from 'react-router-dom';
function Setting() {
    
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  
   
   
  const [selectedImage, setSelectedimage] = useState(null)
  const [bio, setBio] = useState(user.bio);
  const [gender, setGender] = useState("Male");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [preview, setPreview] = useState(user.avatar);
  const handlefilechange = (e) =>{
    const file = e.target.files[0];
    if(file){
      // const imageURL = URL.createObjectURL(file)
      setSelectedimage(file)
     setPreview(URL.createObjectURL(file));
    }
  } 
  
  const handlesubmit = async () =>{
    try{
      const formdata = new FormData();
      formdata.append("bio",bio);
      if(selectedImage instanceof File){
        formdata.append("avatar",selectedImage)
      }

       for (let pair of formdata.entries()) {
      console.log(pair[0], pair[1]);
    }
     
      const res = await fetch("/api/v1/users/updateprofile",{
        method:"PUT",
        credentials:"include",
        body:formdata,
      });

      const data = await res.json();
      dispatch(storedetail(data.data))
      console.log("data",data.data);
      

    }
    catch(err){
      console.log("error updating profile: ",err)
    }
  }

  return (
    <>
     <div className='bg-[#181818] ml-64   px-20  w-screen '> 
 
      <div>
       <p className='font-bold text-2xl py-8 text-gray-200'>Edit profile</p>
      <div className='flex items-center justify-between bg-[#222] rounded-2xl px-6 py-4 w-[500px]'>
        
        <div className='flex items-center space-x-4'>
          <img
           className='w-16 h-16 rounded-full border-2 border-gray-700 object-cover' 
           src={user.avatar || profile}
           alt="profile"
         />
         <div>
          <p className='font-bold text-white'>{user.username}</p>
          <p className='text-gray-400 text-sm'>KASHYAP</p>
         </div>

        </div>
        <div>
          <label className='bg-blue-600 hover:bg-blue-700 text0white text-sm py-2 px-4 rounded-xl cursor-pointer' >
            Change photo
            <input
             type="file"
             accept='image/*'
             onChange={handlefilechange}
             className='hidden'
             />
          </label>
        </div>
        
      </div>
 </div>
  {/* webiste  */}
      <div>
        <p className='text-gray-200 text-2xl font-bold mt-6 mb-3 '>Website</p>
        <div className='bg-[#222] text-gray-400 w-[500px] rounded-2xl px-6 py-3 '>
          Webiste
        </div>
        <div className='text-gray-400 text-[11px] w-[500px]'>Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.</div>
      </div>

    {/* bio  */}

      <div className="mt-6">
        <p className="text-gray-200 text-2xl font-bold mb-3">Bio</p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={150}
          className="bg-[#222] text-gray-200 w-[500px] rounded-2xl px-6 py-3 outline-none"
          placeholder="Write your bio..."
        />
        <div className="text-gray-400 text-[11px] mt-1">
          {bio.length} / 150
        </div>
      </div>
      
      {/* gender  */}

        <div className="mt-6">
        <p className="text-gray-200 text-2xl font-bold mb-3">Gender</p>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="bg-[#222] text-gray-200 w-[500px] rounded-2xl px-6 py-3 outline-none"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Prefer not to say</option>
        </select>
        <div className="text-gray-400 text-[11px] mt-1">
          This won’t be part of your public profile.
        </div>
      </div>
      
       {/* Show account suggestions */}
      <div className="mt-6">
        <p className="text-gray-200 text-2xl font-bold mb-3">
          Show account suggestions on profiles
        </p>
        <div className="flex items-center justify-between bg-[#222] w-[500px] rounded-2xl px-6 py-4">
          <div className="text-gray-400 text-sm">
            Choose whether people can see similar account suggestions on your
            profile, and whether your account can be suggested on other profiles.
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showSuggestions}
              onChange={() => setShowSuggestions(!showSuggestions)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative">
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
            </div>
          </label>
        </div>
      </div>

       {/* Submit button */}
      <button onClick={handlesubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl my-8">
        Submit
      </button>

     </div>
    </>
   
  )
}

export default Setting