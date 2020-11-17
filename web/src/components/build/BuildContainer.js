import React from 'react'
import AddHabit from '../habits/AddHabit'
import HabitList from "../habits/HabitList"
import AddTask from "../tasks/newTasks/AddTask"
import TaskList from '../tasks/newTasks/TaskList'

export default function BuildContainer() {
    return (
        <div>
            Build Container
            <AddHabit />
            <HabitList />
            <AddTask />
            <TaskList />
        </div>
    )
}
