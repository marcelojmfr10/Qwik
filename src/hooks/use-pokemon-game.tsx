import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  // const pokemonId = useSignal(1); // primitivos
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(true);

  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;

    pokemonGame.pokemonId += value;
  });

  const toggleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const toggleVisibility = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  });

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),

    nextPokemon: $(() => changePokemonId(1)),
    prevPokemon: $(() => changePokemonId(-1)),
    toggleFromBack,
    toggleVisibility,
  };
};
