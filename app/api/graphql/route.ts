import { createSchema, createYoga } from "graphql-yoga";
import { fetchSwapiCharacters } from "@/lib/swapi";

// Define the Character type and in-memory store
type Character = {
  id: string;
  name: string;
  birthYear: string;
  homeworld: { name: string } | null;
};

// In-memory store for characters
let characters: Character[] = [];
let initialized = false;

// Initialize the store with characters from the SWAPI GraphQL API
const initStore = async () => {
  if (!initialized) {
    characters = await fetchSwapiCharacters();
    initialized = true;
  }
};

// Create GraphQL schema and resolvers
const schema = createSchema({
  typeDefs: `
    type Homeworld {
      name: String!
    }

    type Character {
      id: ID!
      name: String!
      birthYear: String
      homeworld: Homeworld
    }

    type AllPeople {
      people: [Character!]!
    }

    type Query {
      allPeople: AllPeople
    }

    type Mutation {
      createCharacter(name: String!, birthYear: String, homeworldName: String): Character
      updateCharacter(id: ID!, name: String, birthYear: String, homeworldName: String): Character
      deleteCharacter(id: ID!): Boolean
    }
  `,
  // Resolvers for queries and mutations
  resolvers: {
    Query: {
      allPeople: async () => {
        await initStore();
        return { people: characters };
      },
    },
    //
    Mutation: {
      createCharacter: (
        _: unknown,
        args: { name: string; birthYear?: string; homeworldName?: string },
      ) => {
        const character: Character = {
          id: String(Date.now()),
          name: args.name,
          birthYear: args.birthYear ?? "Unknown",
          homeworld: { name: args.homeworldName ?? "Unknown" },
        };
        characters.push(character);
        return character;
      },
      updateCharacter: (
        _: unknown,
        args: {
          id: string;
          name?: string;
          birthYear?: string;
          homeworldName?: string;
        },
      ) => {
        const character = characters.find((c) => c.id === args.id);
        if (!character) return null;
        if (args.name) character.name = args.name;
        if (args.birthYear) character.birthYear = args.birthYear;
        if (args.homeworldName)
          character.homeworld = { name: args.homeworldName };
        return character;
      },
      deleteCharacter: (_: unknown, args: { id: string }) => {
        const index = characters.findIndex((c) => c.id === args.id);
        if (index === -1) return false;
        characters.splice(index, 1);
        return true;
      },
    },
  },
});

// Create Yoga GraphQL server
const yoga = createYoga({ schema, graphqlEndpoint: "/api/graphql" });

// Export GET and POST handlers for the API route
export const GET = yoga;
export const POST = yoga;
