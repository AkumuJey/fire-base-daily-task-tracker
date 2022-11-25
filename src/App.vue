<template>
  <div class="container">
    <div class="title has-text-centered">
      Daily Targets
    </div>
    <form @submit.prevent="addTask">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newTaskContent" class="input" type="text" placeholder="Add Task">
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!newTaskContent">
            Add Task
          </button>
        </p>
      </div>
    </form>
    <div v-for="task in tasks" class="card mb-3" :class="{ 'has-background-success-light' : task.done }">
      <div class="card-content">
        <div class="content">
          <div class="columns  is-vcentered">
            <div class="column is-mobile" :class="{ 'has-text-success line-through': task.done}">
              {{ task.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button class="button" :class="task.done ? 'is-success': 'is-light'" @click="toggleDone(task.id)">
                &check;
              </button>
              <button class="button is-danger ml-2" @click="removeTask(task.id)">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
// imports
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '@/firebase';
/*
tasks
*/
const tasks = ref([
  // {
  //   id: 'id1',
  //   content: 'Doing python',
  //   done: false
  // },
  // {
  //   id: 'id2',
  //   content: 'Read Ganong',
  //   done: true
  // }
])

// Get tasks
onMounted(async () => {
  const q = query(collection(db, "tasks"))
let fbTasks = []
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data())
  const task = {
    id: doc.id,
    content: doc.data().content,
    done: doc.data().done
  }
  fbTasks.push(task)
  tasks.value = fbTasks
})
})

const newTaskContent = ref('')
/*addTask function*/
const addTask = () => {
  const newTask = {
    id: uuidv4(),
    content: newTaskContent.value,
    done: false
  }
  tasks.value.unshift(newTask)
  newTaskContent.value = ''
}

/*
removig tasks
*/
const removeTask = id => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

/*
Toggledone taks
*/
const toggleDone = (id) => {
  const index = tasks.value.findIndex(task => task.id === id)
  tasks.value[index].done = !tasks.value[index].done
}
</script>

<style>
@import 'bulma\css\bulma.min.css';
.container{
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through{
  text-decoration: line-through;
}
</style>