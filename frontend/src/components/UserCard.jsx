import React from "react";

const UserCard = ({user}) => {
    console.log(user);
    
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src= {user?.photoUrl}
            alt="photoUrl"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
         {user.age && user.gender && <p>{user.age+","+ user?.gender}</p>}
          <p>
            {user?.about}
          </p>
          <div className="card-actions justify-end justify-center my-3">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Intrested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
