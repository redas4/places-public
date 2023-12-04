import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import MapComp from '../components/Map'
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    const queryEntries = (e) => {
        e.preventDefault();
    }


    return (
        <div>
            <h1>Dashboard</h1>
            {!!user && (<h2>Hi {user.name}!</h2>)}
            <form onSubmit={queryEntries}>
                <input type='search' placeholder="search"/>
                <button type='submit' >Search</button>
            </form>
            <button onClick={navigate('/my-friends')}>My Friends</button>
            <button onClick={navigate('/my-places')}>My Places</button>
            <button onClick={navigate('/my-reviews')}>My Reviews</button>
        </div>
    )

}