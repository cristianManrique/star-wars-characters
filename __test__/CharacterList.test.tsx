import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing/react";
import CharacterList from "@/app/(app)/characters/components/CharacterList";
import { DELETE_CHARACTER, GET_CHARACTERS } from "@/lib/queries";
import type { Character } from "@/types/character";

/**
 * jest.fn() — mock functions to check calls
 * userEvent—simulation of real-world interactions
 * getBy vs queryBy—presence vs absence of items
 * MockedProvider—test without a network with Apollo
 * addTypename={false} — avoid Apollo type conflicts
 */

const characters: Character[] = [
  {
    id: "1",
    name: "Luke Skywalker",
    birthYear: "19BBY",
    homeworld: { name: "Tatooine" },
  },
  {
    id: "2",
    name: "Leia Organa",
    birthYear: "19BBY",
    homeworld: { name: "Alderaan" },
  },
];

const deleteMock = {
  request: { query: DELETE_CHARACTER, variables: { id: "1" } },
  result: { data: { deleteCharacter: true } },
};

const refetchMock = {
  request: { query: GET_CHARACTERS },
  result: { data: { allPeople: { people: characters } } },
};

describe("CharacterList", () => {
  it("renders all characters", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CharacterList characters={characters} />
      </MockedProvider>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Leia Organa")).toBeInTheDocument();
  });

  it("shows the edit form when Edit is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CharacterList characters={characters} />
      </MockedProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
  });

  it("calls the delete mutation when Delete is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MockedProvider mocks={[deleteMock, refetchMock]} addTypename={false}>
        <CharacterList characters={characters} />
      </MockedProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: /delete/i })[0]);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("hides the edit form when Cancel is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CharacterList characters={characters} />
      </MockedProvider>,
    );

    // Open the edit form
    await user.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();

    // Click the cancel button
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByPlaceholderText(/name/i)).not.toBeInTheDocument();
  });
});
