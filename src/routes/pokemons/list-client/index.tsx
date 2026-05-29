import { component$, useStyles$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// import styles from "../../styles.css?inline";

export default component$(() => {
  // useStylesScoped$(styles); // solo este archivo
  return <span>hola mundo - client</span>;
});

export const head: DocumentHead = {
  title: "List Client",
};
