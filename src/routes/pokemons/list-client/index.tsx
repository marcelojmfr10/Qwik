import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <>hola mundo - client</>;
});

export const head: DocumentHead = {
  title: "List Client",
};
