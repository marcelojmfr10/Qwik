import { component$ } from "@builder.io/qwik";
import { useCounter } from "~/hooks/use-counter";

export default component$(() => {
  const { increment, decrement, counter } = useCounter(25);

  return (
    <>
      <span class="text-2xl">Counter</span>
      <span class="text-7xl">{counter.value}</span>

      <div class="mt-2">
        <button onClick$={decrement} class="btn btn-primary mr-2">
          -1
        </button>
        <button onClick$={increment} class="btn btn-primary">
          +1
        </button>
      </div>
    </>
  );
});
