import React from "react";
import { io } from "socket.io-client";

import Task from "./Task";
import "./styles.css";

const socket = io("http://localhost:5000");

class Dashboad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        error: null,
        isLoaded: false,
        list: [],
      },
      tasks: {
        error: null,
        isLoaded: false,
        list: [],
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            users: {
              isLoaded: true,
              list: result,
            },
          });
        },
        (error) => {
          this.setState({
            users: {
              isLoaded: true,
              error,
            },
          });
        }
      );
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            tasks: {
              isLoaded: true,
              list: result,
            },
          });
        },
        (error) => {
          this.setState({
            tasks: {
              isLoaded: true,
              error,
            },
          });
        }
      );

    socket.on("taskUpdated", (data) => {
      this.updateTask(data);
    });

    socket.on("taskCreated", (data) => {
      this.addTask(data);
    });
  }

  updateTask(data) {
    const listUpdated = this.state.tasks.list.map((task) => {
      if (data.id !== task._id) {
        return task;
      }
      return {
        ...task,
        ...data.updated,
      };
    });

    this.setState({
      tasks: {
        list: listUpdated,
      },
    });
  }

  addTask(newTask) {
    console.log('addTask', newTask);
    this.setState({
      tasks: {
        list: [...this.state.tasks.list, newTask],
      },
    });
  }

  render() {
    const { users, tasks } = this.state;

    const error = users.error || tasks.error;
    const isLoaded = users.isLoaded || tasks.isLoaded;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="Container">
          {tasks.list.map((item) => (
            <Task key={item._id} data={item} users={users.list} />
          ))}
        </div>
      );
    }
  }
}
export default Dashboad;
