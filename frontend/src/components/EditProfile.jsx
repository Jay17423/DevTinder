import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "../components/Toast"

const EditProfile = ({ user }) => {

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
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
      setTimeout(() =>{
        setToast(false);
      },3000)
    } catch (error) {
      setError(error.response.data);
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex  justify-center items-center  bg-base-200">
      <div>
        <div className="flex justify-center items-center mx-10 h-screen bg-base-200">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <div className="mb-4">
                  <label className="form-control w-full  max-w-xs">
                    <div className="label mb-1">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      className="input mb-3 input-bordered w-full max-w-xs"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label  mb-1">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      className="input mb-3 input-bordered w-full max-w-xs"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label  mb-1">
                      <span className="label-text">Photo Url</span>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      className="input mb-3 input-bordered w-full max-w-xs"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label  mb-1">
                      <span className="label-text">Age</span>
                    </div>
                    <input
                      type="number"
                      placeholder=""
                      className="input mb-3 input-bordered w-full max-w-xs"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label mb-1">
                      <span className="label-text">Gender</span>
                    </div>
                    <select
                      className="select mb-3 select-bordered w-full max-w-xs"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label  mb-1">
                      <span className="label-text">About</span>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      className="input mb-3 input-bordered w-full max-w-xs"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>

              <div className="card-actions justify-center py-3">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProfile}
                >
                  save profile
                </button>
               {toast && <Toast message={toast ? "Profile updated successfully" : ""} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
