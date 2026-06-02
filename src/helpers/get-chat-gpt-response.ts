import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getFunFactAboutPokemon = async (
  pokemonName: string,
): Promise<string> => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Escribe datos interesantes del pokémon que te indicará el usuario`,
      },
      {
        role: "user",
        content: pokemonName,
      },
    ],
    model: "gpt-4o",
    temperature: 0.3,
    max_completion_tokens: 60,
    response_format: {
      type: "text",
    },
  });

  return (
    response.choices[0].message.content! || `No tengo nada sobre ${pokemonName}`
  );
};
