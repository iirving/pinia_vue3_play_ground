import { ref, reactive } from "vue";

export function PiniaHistoryPlugin({ pinia, app, store, options }) {
  if (!options.historyEnabled) return;
  const history = reactive([]);
  const future = reactive([]);
  const doingHistory = ref(false);

  history.push(JSON.stringify(store.$state)); // initial state

  store.$subscribe((mutation, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  });

  return {
    history,
    future,
    undo: () => {
      if (history.length === 1) return;
      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      doingHistory.value = false;
    },

    redo: () => {
      const lastesState = future.pop();
      if (!lastesState) return;
      doingHistory.value = true;
      history.push(lastesState);
      store.$state = JSON.parse(lastesState);
      doingHistory.value = false;
    },
  };
}
