import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    allPeople {
      people {
        id
        name
        birthYear
        homeworld {
          name
        }
      }
    }
  }
`;

export const CREATE_CHARACTER = gql`
  mutation CreateCharacter(
    $name: String!
    $birthYear: String
    $homeworldName: String
  ) {
    createCharacter(
      name: $name
      birthYear: $birthYear
      homeworldName: $homeworldName
    ) {
      id
      name
      birthYear
      homeworld {
        name
      }
    }
  }
`;

export const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter(
    $id: ID!
    $name: String
    $birthYear: String
    $homeworldName: String
  ) {
    updateCharacter(
      id: $id
      name: $name
      birthYear: $birthYear
      homeworldName: $homeworldName
    ) {
      id
      name
      birthYear
      homeworld {
        name
      }
    }
  }
`;

export const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($id: ID!) {
    deleteCharacter(id: $id)
  }
`;
