import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { Modal } from "~/components/shared";
import { getFunFactAboutPokemon } from "~/helpers/get-chat-gpt-response";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname, url }) => {
    const offset = Number(query.get("offset") || "0");
    if (isNaN(offset)) throw redirect(301, new URL(pathname, url).toString());
    if (offset < 0) throw redirect(301, new URL(pathname, url).toString());
    if (offset > 1000) throw redirect(301, new URL(pathname, url).toString());

    return await getSmallPokemons(offset);
  },
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: "",
    name: "",
  });

  const chatGPTPokemonFact = useSignal("");

  // modal functions
  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);

    chatGPTPokemonFact.value = "";
    if (modalPokemon.name.length > 0) {
      getFunFactAboutPokemon(modalPokemon.name).then(
        (resp) => (chatGPTPokemonFact.value = resp),
      );
    }
  });

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get("offset");
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get("offset") || 0);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: {location.isNavigating ? "Sí" : "No"}</span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map(({ name, id }) => (
          <div
            key={name}
            // onClick$={() => (modalVisible.value = true)}
            onClick$={() => showModal(id, name)}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={+id} />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>

      <Modal showModal={modalVisible.value} persistent closeFn={closeModal}>
        <div q:slot="title">{modalPokemon.name}</div>
        <div class="flex flex-col justify-center items-center" q:slot="content">
          <PokemonImage id={+modalPokemon.id} />
          <span>
            {chatGPTPokemonFact.value === ""
              ? "Preguntando a ChatGPT"
              : chatGPTPokemonFact}
          </span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
