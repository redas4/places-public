import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import MapComp from '../components/Map'

export default function Dashboard(){
    const {user} = useContext(UserContext)
    
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
                <MapComp />
            </form>
            <button>View Friends</button>
        </div>
    )

}