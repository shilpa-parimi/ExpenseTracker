<template>
  <div
    v-for="(transaction, index) in transactions"
    :key="index"
    class="border px-5 py-3.5 rounded flex items-center justify-between bg-white"
    :class="
      transaction.nature === 'earn'
        ? 'border-l-[7.5px] border-green-500'
        : 'border-l-[7.5px] border-red-500'
    "
  >
    <section>
      <h2 class="font-bold">{{ transaction.label }}</h2>
      <time class="text-xs text-gray-400">{{
        new Date(transaction.created_at).toDateString()
      }}</time>
    </section>
    <h3 class="font-bold">${{ transaction.value }}</h3>
  </div>
</template>

<script>
export default {
  props: ["transactions"],
};
</script>
