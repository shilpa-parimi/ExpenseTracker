<template>
  <section class="grid place-items-center gap-y-1.5">
    <h2>Your current balance is</h2>
    <p class="text-2xl font-bold">${{ earned - spent }}</p>
  </section>
</template>

<script>
export default {
  props: ["earned", "spent"],
};
</script>
