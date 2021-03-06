<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div class="py-16">
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-red-900' : 'bg-red-700'"
      class="
        relative
        inline-flex
        flex-shrink-0
        h-[38px]
        w-[74px]
        border-2 border-transparent
        rounded-full
        cursor-pointer
        transition-colors
        ease-in-out
        duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-white
        focus-visible:ring-opacity-75
      "
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-9' : 'translate-x-0'"
        class="
          pointer-events-none
          inline-block
          h-[34px]
          w-[34px]
          rounded-full
          bg-white
          shadow-lg
          transform
          ring-0
          transition
          ease-in-out
          duration-200
        "
      />
    </Switch>
  </div>
  <div class="w-full px-4 py-16">
    <div class="w-full max-w-md mx-auto">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
            as="template"
            v-for="plan in plans"
            :key="plan.name"
            :value="plan"
            v-slot="{ active, checked }"
          >
            <div
              :class="[
                active
                  ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                  : '',
                checked ? 'bg-blue-900 bg-opacity-75 text-white ' : 'bg-white ',
              ]"
              class="
                relative
                flex
                px-5
                py-4
                rounded-lg
                shadow-md
                cursor-pointer
                focus:outline-none
              "
            >
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel
                      as="p"
                      :class="checked ? 'text-white' : 'text-gray-900'"
                      class="font-medium"
                    >
                      {{ plan.name }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? 'text-sky-100' : 'text-gray-500'"
                      class="inline"
                    >
                      <span> {{ plan.ram }}/{{ plan.cpus }}</span>
                      <span aria-hidden="true"> &middot; </span>
                      <span>{{ plan.disk }}</span>
                    </RadioGroupDescription>
                  </div>
                </div>
                <div v-show="checked" class="flex-shrink-0 text-white">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#fff"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script lang="ts">
import "./styles/index.css";

import { defineComponent, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import {
  Switch,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";

const plans = [
  {
    name: "Startup",
    ram: "12GB",
    cpus: "6 CPUs",
    disk: "160 GB SSD disk",
  },
  {
    name: "Business",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "512 GB SSD disk",
  },
  {
    name: "Enterprise",
    ram: "32GB",
    cpus: "12 CPUs",
    disk: "1024 GB SSD disk",
  },
];

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    Switch,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },
  setup() {
    const selected = ref(plans[0]);
    const enabled = ref(false);
    return { enabled, selected, plans };
  },
});
</script>

<style lang="postcss">
</style>
