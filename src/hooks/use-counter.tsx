import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number) => {
  const counter = useSignal(initialValue);

  const increment = $(() => {
    counter.value++;
  });

  const decrement = $(() => {
    counter.value--;
  });

  return { increment, decrement, counter: useComputed$(() => counter.value) };
};
