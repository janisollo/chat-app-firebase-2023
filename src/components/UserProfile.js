import React, { useState, useEffect } from "react";
import { auth, storage, updateProfile } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import "firebase/auth";

function UserProfile() {
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setDisplayName(auth.currentUser.displayName);
    setAvatar(auth.currentUser.photoURL);
  }, []);

  const updateUserProfile = async () => {
    try {
      if (image) {
        const storageRef = ref(
          storage,
          `profileImages/${auth.currentUser.uid}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // You can implement progress functionality here
          },
          (error) => {
            alert("Failed to upload image: " + error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Here you can get the download URL when the upload is completed.
              updateProfile(auth.currentUser, {
                displayName,
                photoURL: downloadURL,
              })
                .then(() => {
                  alert("Profile updated successfully");
                  // Reflect the change in the local state as well.
                  setAvatar(downloadURL);
                })
                .catch((error) => {
                  alert("Failed to update profile image: " + error.message);
                });
            });
          }
        );
      } else {
        await updateProfile(auth.currentUser, { displayName });
        alert("Profile updated successfully");
      }
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-12 bg-white rounded shadow-xl w-96">
        <h1 className="text-3xl font-bold mb-8">Update Profile</h1>
        <div className="mb-4">
          <label className="block text-sm text-gray-00" htmlFor="displayName">
            Display Name
          </label>
          <input
            className="w-full px-5 py-3 mt-2 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            id="displayName"
          />
        </div>

        {/* Display current profile image */}
        {avatar && <img src={avatar} alt="Profile" className="mb-4" />}

        <div className="mb-4">
          <label className="block text-sm text-gray-00" htmlFor="avatar">
            Profile Image
          </label>
          <input
            className="w-full px-5 py-3 mt-2 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-indigo-400"
            type="file"
            onChange={handleImageChange}
            id="avatar"
          />
        </div>

        <button
          className="w-full py-3 px-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
          onClick={updateUserProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
