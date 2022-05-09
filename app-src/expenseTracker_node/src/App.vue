<script>
import axios from "axios";
import { onMounted, reactive, ref, watchEffect } from "vue";

// custom components
import Transaction from "./components/Transaction.vue";
import TransactionHeader from "./components/TransactionHeader.vue";
import CurrentBalance from "./components/CurrentBalance.vue";

export default {
  setup() {
    const transactions = ref([]);
    const backendURL = ref("");

    // form data
    const formData = reactive({
      label: "",
      value: "",
    });

    const natureOfTransaction = reactive({
      earned: 0,
      spent: 0,
    });

    // search for transactions on app mount
    onMounted(async () => {
      // setting backend URL for development and production
      backendURL.value = import.meta.env.DEV ? "http://localhost:5050" : "";

      try {
        const res = await axios.get(`${backendURL.value}/api/transactions`);
        transactions.value = res.data?.data;
      } catch (error) {
        console.log(error);
      }
    });

    // clearing input fields on form submission
    const clearInputs = () => {
      formData.label = "";
      formData.value = "";
    };

    // called when an earning is added
    async function handleEarned() {
      const res = await axios.post(`${backendURL.value}/api/transactions`, {
        label: formData.label,
        value: parseFloat(formData.value),
        nature: "earn",
      });
      transactions.value = [res.data?.data, ...transactions.value];
      clearInputs();
    }

    // called when an expediture is added
    async function handleSpent() {
      const res = await axios.post(`${backendURL.value}/api/transactions`, {
        label: formData.label,
        value: parseFloat(formData.value),
        nature: "spend",
      });
      transactions.value = [res.data?.data, ...transactions.value];
      clearInputs();
    }

    // watch for changes in transactions and reflect in earning and spending amounts
    watchEffect(() => {
      let _earned = 0,
        _spent = 0;
      transactions.value.forEach((txn) => {
        if (txn.nature === "earn") _earned += txn.value;
        else _spent += txn.value;
      });
      natureOfTransaction.earned = _earned;
      natureOfTransaction.spent = _spent;
    });

    // return refs and functions for render
    return {
      transactions,

      // form data
      formData,

      natureOfTransaction,

      // functions
      handleEarned,
      handleSpent,
    };
  },

  // components used in the application body
  components: { Transaction, TransactionHeader, CurrentBalance },
};
</script>

<template>
  <div class="max-w-screen-sm mx-auto px-5">
    <header class="py-5 border-b text-lg font-bold">
      Expense tracker application
    </header>

    <main class="my-5 grid gap-y-5">
      <CurrentBalance
        :earned="natureOfTransaction.earned"
        :spent="natureOfTransaction.spent"
      />

      <TransactionHeader
        :earned="natureOfTransaction.earned"
        :spent="natureOfTransaction.spent"
      />

      <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-2.5">
        <input
          placeholder="Enter title"
          v-model="formData.label"
          class="col-span-2 px-5 py-3.5 rounded"
        />
        <input
          placeholder="Enter amount"
          v-model="formData.value"
          class="col-span-2 px-5 py-3.5 rounded"
        />
        <button
          class="bg-green-500 text-white px-5 py-3.5 rounded"
          type="button"
          @click.prevent="handleEarned"
        >
          Earned
        </button>
        <button
          class="bg-red-500 text-white px-5 py-3.5 rounded"
          type="button"
          @click.prevent="handleSpent"
        >
          Spent
        </button>
      </form>

      <div class="grid gap-y-2.5">
        <Transaction :transactions="transactions" />
      </div>
    </main>
  </div>
</template>
