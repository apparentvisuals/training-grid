import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'

// define your typings for the store state
export enum TrainingTypes {
  Time = 'time',
  Rep = 'rep',
}
export interface Training {
  type: TrainingTypes,
  name: string,
  value: number,
  sets: number,
  rest: number,
  result?: number,
}
export interface State {
  count: number,
  exercises: Training[],
}
const store = createStore<State>({
  state: {
    count: 0,
    exercises: [],
  },
  mutations: {
    increment(state) {
      state.count++
    },
    addExercise(state, exercise) {
      console.log(exercise);
      state.exercises.push(exercise);
    },
    removeExercise(state, index) {
      state.exercises = state.exercises.splice(index, 1);
    }
  }
})
createApp(App).use(store).mount('#app')
