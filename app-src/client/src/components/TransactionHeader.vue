<template>
  <div class="bg-white rounded grid grid-cols-3 justify-items-center p-5">
    <section>
      <h3>Income</h3>
      <p class="font-bold text-green-500">${{ earned }}</p>
    </section>

    <div class="w-[1px] h-full bg-gray-200" />

    <section>
      <h3>Expenditure</h3>
      <p class="font-bold text-red-500">${{ spent }}</p>
    </section>
  </div>
</template>

<script>
export default {
  props: ["earned", "spent"],
};
</script>
