import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

const WorkoutDetails = ({ workout, setIsFetching, isFetching }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEdit, setIsEdit] = useState(false);
  const [editDetail, setEditDetail] = useState(workout.title);
  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const editHandler = async () => {
    setIsEdit(true);
  };

  const editDetailHandler = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PATCH",
      body: JSON.stringify({
        title: editDetail,
        reps: workout.reps,
        load: workout.load,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      setIsEdit(false);
      setIsFetching(!isFetching);
    }
  };

  return (
    <div className="workout-details">
      {isEdit ? (
        <div className="inputStyle">
          <input
            onChange={(e) => setEditDetail(e.target.value)}
            value={editDetail}
            style={{ fontWeight: "bold" }}
          />
          <button className="buttonContainer" onClick={editDetailHandler}>
            Save
          </button>
          <button className="cancelButton" onClick={() => setIsEdit(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <h4>{workout.title}</h4>
      )}
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {/* {workout.createdAt} */}
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <div>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
        <h1 className="material-symbols-outlined" onClick={editHandler}>
          edit
        </h1>
      </div>
    </div>
  );
};

export default WorkoutDetails;
