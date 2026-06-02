import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  type PokemonGameState,
  PokemonGameContext,
} from "./pokemon-game.context";
import {
  type PokemonListState,
  PokemonListContext,
} from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showBackImage: false,
    isPokemonVisible: true,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon-game")) {
      const {
        pokemonId = 10,
        isPokemonVisible = true,
        showBackImage = false,
      } = JSON.parse(localStorage.getItem("pokemon-game")!) as PokemonGameState;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
      pokemonGame.isPokemonVisible = isPokemonVisible;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isPokemonVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
