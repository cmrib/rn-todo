import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const showRepeatedTaskAlert = () => {
    return Alert.alert(
      'Task já cadastrada',
      'Você não pode cadastrar uma task com o mesmo nome',
      [{
        text: 'Ok'
      }]
    )
  }

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    if (tasks.some(task => task.title === newTask.title)) {
      showRepeatedTaskAlert()
    } else {
      setTasks(oldState => [...oldState, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks(oldState => {
      return oldState.filter(task => task.id !== id)
    })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})