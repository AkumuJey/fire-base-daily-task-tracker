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
   
      <div class="card2">
        <div class="card-content">
          <p class="title">
            <i>"There is Joy in Completion" </i>
          </p>
          <p class="subtitle">
            <i>~ Dr. Akumu J 2022</i>
          </p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              View on <a href="#">Twitter</a>
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              Share on <a href="#">Facebook</a>
            </span>
          </p>
        </footer>
      </div>
  </div>
</template>


<script setup>
// imports
import { ref, onMounted } from 'vue';

// import { v4 as uuidv4 } from 'uuid';

import { 
  collection, onSnapshot, addDoc, 
  doc, updateDoc, deleteDoc, 
  query, orderBy
} from "firebase/firestore";
import {db} from '@/firebase';

/*
Firebase refs
*/
const tasksCollection = collection(db, "tasks")
const tasksCollectionQuery = query(tasksCollection, orderBy("date", "desc"))


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
onMounted(() => {
//   const q = query(collection(db, "tasks"))
// let fbTasks = []
//   const querySnapshot = await getDocs(q)
//   querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data())
//   const task = {
//     id: doc.id,
//     content: doc.data().content,
//     done: doc.data().done
//   }
//   fbTasks.push(task)
//   tasks.value = fbTasks
// })
      onSnapshot(tasksCollectionQuery, (querySnapshot) => {
        const fbTasks = [];
        querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done
          }
          fbTasks.push(task)
        })
        tasks.value = fbTasks
      })
})

const newTaskContent = ref('')
/*addTask function*/
const addTask = () => {
   addDoc(tasksCollection, {
    content: newTaskContent.value,
    done: false,
    date: Date.now()
  })
  // const newTask = {
  //   id: uuidv4(),
  //   content: newTaskContent.value,
  //   done: false
  // }
  newTaskContent.value = ''
}

/*
removig tasks
*/
const removeTask = id => {
  deleteDoc(doc(tasksCollection, id))
}

/*
Toggledone taks
*/
const toggleDone = (id) => {
  const index = tasks.value.findIndex(task => task.id === id)
  updateDoc(doc(tasksCollection, id), {
  done: !tasks.value[index].done
})
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
.quote{
  text-align: center;
}
.card2{
  background-color: lightslategray;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
}
</style>