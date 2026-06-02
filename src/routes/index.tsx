import { $, component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate();
  const {
    isPokemonVisible,
    nextPokemon,
    pokemonId,
    prevPokemon,
    toggleFromBack,
    toggleVisibility,
    showBackImage,
  } = usePokemonGame();

  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${id}`);
  });

  return (
    <>
      <span class="text-2xl">buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      {/* </Link> */}

      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">
          Anterior
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">
          Siguiente
        </button>

        <button onClick$={toggleFromBack} class="btn btn-primary mr-2">
          Voltear
        </button>

        <button onClick$={toggleVisibility} class="btn btn-primary">
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Primer app en qwik",
    },
  ],
};
