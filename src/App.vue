<template>
  <div class="min-h-full bg-green-600">
    <div class="wrapper" style="">
      <div class="item" v-for="item in exercises" :key="item">
        <div v-if="item.type === 'rep'" class="p-4">
          <div>{{ item.name }}</div>
          <div>{{ item.value }} x {{ item.sets }}</div>
          <div>{{ item.rest }}s rest</div>
          <button class="rounded bg-green-900/80 text-white px-4 py-2">
            Rest
          </button>
        </div>
        <div v-else class="p-4">
          <div>{{ item.name }}</div>
          <div>{{ item.value }}s x {{ item.sets }}</div>
          <div>{{ item.rest }}s rest</div>
          <button class="rounded bg-green-900/80 text-white px-4 py-2">
            Start
          </button>
        </div>
      </div>
      <div class="item add-button" @click.prevent.stop="addItem">add</div>
      <Modal v-if="showAdd" @close="showAdd = false">
        <div class="p-8">
          <TabGroup @change="tabChanged">
            <TabList class="flex p-1 space-x-1 bg-blue-900/80 rounded-xl">
              <Tab
                v-slot="{ selected }"
                as="template"
                v-for="option in options"
                :key="option"
              >
                <button
                  :class="[
                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                  ]"
                >
                  {{ option }}
                </button>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div class="px-8 pt-8">
                  <label for="reps">Reps: </label>
                  <input
                    type="number"
                    name="reps"
                    id="reps"
                    v-model="reps"
                    class="border border-green-500 rounded"
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div class="px-8 pt-8">
                  <label for="time">Time: </label>
                  <input
                    type="number"
                    name="time"
                    id="time"
                    v-model="time"
                    class="border border-green-500 rounded"
                  /><span>seconds</span>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <div class="px-8 pt-2">
            <label for="sets">Sets: </label>
            <input
              type="number"
              name="sets"
              id="sets"
              v-model="sets"
              class="border border-green-500 rounded"
            />
          </div>
          <div class="px-8 pt-2">
            <label for="rest">Rest: </label>
            <input
              type="number"
              name="rest"
              id="rest"
              v-model="rest"
              class="border border-green-500 rounded"
            /><span>seconds</span>
          </div>
          <div class="px-8 pt-2">
            <label for="name">Name: </label>
            <input
              name="name"
              id="name"
              v-model="name"
              class="border border-green-500 rounded"
            />
          </div>
        </div>
        <div class="px-8 pt-2 pb-8">
          <button
            class="rounded bg-green-900/80 text-white px-4 py-2"
            @click.prevent.stop="save"
          >
            save
          </button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import "./styles/index.css";

import { mapMutations, mapState } from "vuex";
import { defineComponent, ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

import Modal from "./components/Modal.vue";
import { Training, TrainingTypes } from "./main";

export default defineComponent({
  name: "Training Grid",
  components: {
    Modal,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  data() {
    const items = ref([]);
    const options = ref(["Reps", "Time"]);
    return {
      items,
      options,
      showAdd: false,
      selected: 0,
      type: TrainingTypes.Rep,
      reps: 0,
      time: 0,
      sets: 0,
      rest: 0,
      name: "",
    };
  },
  computed: {
    ...mapState(["count", "exercises"]),
  },
  methods: {
    ...mapMutations(["addExercise", "removeExercise"]),
    addItem() {
      console.log("clicked");
      this.showAdd = true;
    },
    tabChanged(index: number) {
      this.type = index === 0 ? TrainingTypes.Rep : TrainingTypes.Time;
    },
    save() {
      const item: Training = {
        type: this.type,
        value: this.type === TrainingTypes.Rep ? this.reps : this.time,
        sets: this.sets,
        rest: this.rest,
        name: this.name,
      };
      this.addExercise(item);
      this.showAdd = false;
    },
  },
});
</script>

<style lang="postcss">
.wrapper {
  grid-auto-rows: minmax(240px, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  @apply grid gap-1 p-2;
}
.item {
  aspect-ratio: 1;
  @apply bg-black text-white text-lg bg-opacity-25;
}
.add-button {
  @apply p-8 text-white text-center;
}
</style>
