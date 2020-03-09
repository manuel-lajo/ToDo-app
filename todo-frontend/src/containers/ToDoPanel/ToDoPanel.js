import React, { Component } from 'react';

import './ToDoPanel.css';
import Task from '../../components/Task/Task';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';

// TODO: use a Spinner component to display while waiting for async requests to server
// TODO: handle response success & errors, maybe with a success / fail banner component
// TODO: use additional CSS to give better user experience
// TODO: use environment constants to store server api's url
class InvoicePanel extends Component {
  state = {
    tasks: [],
    inputTask: '',
    nextId: null,
    loading: true
  };

  componentDidMount() {
    axios.get('http://localhost:7000/tasks')
      .then(response => {
        this.setState( { tasks: response.data, nextId: response.data.length + 1, loading: false } );
      })
      .catch(error => {
        console.log(error);
      });
  }

  processInputTextHandler = () => {
    const trimedTask = this.state.inputTask.trim();
    if (trimedTask !== '') {
      axios.post('http://localhost:7000/tasks', { id: this.state.nextId, description: trimedTask })
        .then(response => {
          this.setState(prevState => {
            let tasks = [...prevState.tasks];
            tasks = tasks.map(element => ({ ...element }));
            tasks.push(response.data.task);
            return { tasks, inputTask: '', nextId: tasks.length + 1 };
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteTask = id => {
    axios.delete('http://localhost:7000/tasks/' + id)
      .then(response => {
        let tasks = [...this.state.tasks];
        tasks = tasks.map(element => ({ ...element }));
        tasks = tasks.filter(element => element.id !== id);
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateTask = id => {
    axios.put('http://localhost:7000/tasks/' + id)
      .then(response => {
        let tasks = [...this.state.tasks];
        tasks = tasks.map(element => ({ ...element }));
        const index = tasks.findIndex(element => element.id === id);
        tasks[index].checked = !tasks[index].checked;
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  inputTextHandler = event => {
    this.setState({ inputTask: event.target.value });
  }

  keyPressHandler = event => {
    if (event.key === 'Enter'){
      this.processInputTextHandler();
    }
  }

  render() {
    let tasks = <div>loading...</div>;
    if (!this.state.loading) {
      tasks = this.state.tasks.map(task => (
        <Task key={task.id}
          description={task.description}
          checked={task.checked}
          updateTask={() => this.updateTask(task.id)}
          deleteTask={() => this.deleteTask(task.id)} />
      ));
    }
    return (
      <div className="todo-panel">
        <div className="todo-create">
          <input className="chat-input"
            type="text"
            placeholder="write your task..."
            value={this.state.inputTask}
            onChange={this.inputTextHandler}
            onKeyPress={this.keyPressHandler} />
          <Button btnType="Success" clicked={this.processInputTextHandler}>ADD TASK</Button>
        </div>
        {tasks}
      </div>
    );
  }
}

export default InvoicePanel;
