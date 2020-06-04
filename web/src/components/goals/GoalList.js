import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoalList, updateCurrentGoal } from "../../actions";
import history from "../../history";
const GoalList = () => {
    const dispatch = useDispatch();
    let list = useSelector((state) => state.goal.list);
    let userID = useSelector((state) => state.user.id);
    dispatch(fetchGoalList(userID));

    const handleClick = (goal) => {
        dispatch(updateCurrentGoal(goal));
        history.push("/goals");
    };

    return (
        <>
            {list.map((goal, index) => (
                <TreeItem
                    key={index}
                    nodeId={`${index}`} // REVIEW - This needs to be fixed
                    onClick={() => handleClick(goal)}
                    label={goal.title}
                ></TreeItem>
            ))}
        </>
    );
};

export default GoalList;
