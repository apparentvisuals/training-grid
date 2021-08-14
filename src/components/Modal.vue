<template>
  <div class="modal-container overflow-auto" @click="$emit('close')">
    <div class="p-1 absolute left-0 right-0 m-1" @click.stop="">
      <div
        class="modal-content shadow rounded-lg bg-white"
        :style="maxWidth ? { maxWidth: maxWidth + 'px' } : {}"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="postcss">
.modal-container {
  background-color: rgba(0, 0, 0, 0.8);
  @apply fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full;
}
.modal-content {
  @apply w-full m-auto;
}
@media (min-width: 640px) {
  .modal-content {
    @apply w-2/3 mt-8;
  }
}
@media (min-width: 1024px) {
  .modal-content {
    @apply w-1/2 mt-8;
  }
}
</style>
