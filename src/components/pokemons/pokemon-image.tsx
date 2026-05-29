import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: Props) => {
    const imageLoaded = useSignal(false);

    // efectos secundarios
    useTask$(({ track }) => {
      track(() => id);

      imageLoaded.value = false;
    });

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando...</span>}

        <img
          src={
            backImage
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
          alt="pokemon sprite"
          style={{
            width: `${size}px`,
          }}
          onLoad$={() => {
            //setTimeout(() => {
            imageLoaded.value = true;
            //}, 2000);
          }}
          class={[
            {
              hidden: !imageLoaded.value,
              "brightness-0": !isVisible,
            },
            "transition-all",
          ]}
        />
      </div>
    );
  },
);
