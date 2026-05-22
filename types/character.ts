export type Character = {
  id: string;
  name: string;
  birthYear: string;
  homeworld?: {
    name: string;
  };
};
