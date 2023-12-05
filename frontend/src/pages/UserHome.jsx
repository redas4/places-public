import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import MapComp from '../components/Map'
import { useNavigate } from "react-router-dom";
import UsersList from '../components/UsersList'
import BusinessList from '../components/BusinessList'

export default function UserHome(){
    const { account } = useContext(UserContext);
    const navigate = useNavigate();
    console.log('Here is my account from userHome:   ', account); 


    return (
        <div>
            <button onClick={() => navigate('/users/profile')}>My Account</button>
            <button onClick={() => navigate(`/my-reviews/${account.id}`)}>My Reviews</button>
            <UsersList />
            <BusinessList />
        </div>
    )

}