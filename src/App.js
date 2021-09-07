import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import About from "./Components/About";


import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";



const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([

  ])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])
  //fetch task
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data

  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data

  }

  //add taks
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // delete task
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE'
      })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task))

  }

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}>
        </Header>

        <Route path='/' exact render={(props) =>
          <div>
            {showAddTask && <AddTask onAdd={addTask}></AddTask>}
            {tasks.length > 0 ? (<Tasks tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}>
            </Tasks>) : ('There is currently no tasks!')}
          </div>}>
        </Route>
        
        <Route path='/about' component={About}></Route>
        <Footer></Footer>
      </div>
    </Router>

  );
}

export default App;
