import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    rows: [],
  }),
  getters: {},
  actions: {
    async fetchAccountData() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Устанавливаем таймаут в 5 секунд

      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/plushevy/demo/meetings",
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        this.rows = data;
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Запрос был прерван по таймауту.");
        } else {
          console.error("Ошибка при получении данных:", error);
        }
      } finally {
        clearTimeout(timeoutId); // Очистить таймаут
      }
    },
  },
});
