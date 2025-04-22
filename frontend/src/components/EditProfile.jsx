import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "../components/Toast";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(false);

  const handleUpdateProfile = async () => {
    setError(null);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "An error occurred");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="w-full sm:w-96 bg-base-300 rounded-xl shadow-md">
        <div className="p-6">
          <h2 className="text-center text-xl font-semibold mb-6">Edit Profile</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">First Name</span>
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Last Name</span>
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Photo URL</span>
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Age</span>
              <input
                type="number"
                className="input input-bordered w-full mt-1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Gender</span>
              <select
                className="select select-bordered w-full mt-1"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium">About</span>
              <textarea
                className="textarea textarea-bordered w-full mt-1"
                placeholder="Tell us about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="btn btn-primary w-full"
              onClick={handleUpdateProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message="Profile updated successfully" />
      )}

      {/* UserCard can remain as-is */}
      <div className="mt-6 w-full sm:w-96">
        <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
      </div>
    </div>
  );
};

export default EditProfile;
