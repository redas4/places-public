import { useDispatch } from "react-redux"
// import {deleteGoal} from "../features/goals/goalSlice"

function FriendItem({goal}) {
  const dispatch = useDispatch()
  
    return (
    <div className="friend">
        <div>{new Date(goal.createdAt).toLocaleDateString('en-US')}</div>
        <h2>{goal.text}</h2>
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button>
    </div>
  )
}

export default FriendItem