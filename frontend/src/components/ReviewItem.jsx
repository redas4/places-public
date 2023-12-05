import { useDispatch } from "react-redux"
// import {deleteGoal} from "../features/goals/goalSlice"

function MyReviewItem({goal}) {
  const dispatch = useDispatch()
  
    return (
    <div className="review">
        <div>{new Date(goal.createdAt).toLocaleDateString('en-US')}</div>
        <h2>{reviw.text}</h2>
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">Delete Review</button>
    </div>
  )
}

export default MyReviewItem