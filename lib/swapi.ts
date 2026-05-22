type SwapiCharacter = {
  id: string;
  name: string;
  birthYear: string;
  homeworld: { name: string } | null;
};

// Function to fetch characters from the SWAPI GraphQL API
export const fetchSwapiCharacters = async (): Promise<SwapiCharacter[]> => {
  const response = await fetch("https://swapi-graphql.netlify.app/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          allPeople {
            people {
              id
              name
              birthYear
              homeworld { name }
            }
          }
        }
      `,
    }),
  });

  const json = await response.json();
  return json.data.allPeople.people;
};
