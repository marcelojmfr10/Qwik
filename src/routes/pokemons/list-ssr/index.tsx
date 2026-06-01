import { component$, useComputed$ } from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
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
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={+id} />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
