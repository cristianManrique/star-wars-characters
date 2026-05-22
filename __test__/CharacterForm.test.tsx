import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterForm from "@/app/(app)/characters/components/CharacterForm";
import type { Character } from "@/types/character";

describe("CharacterForm", () => {
  it("renders a 'Create' button when no initial data is provided", () => {
    render(<CharacterForm onSubmit={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("render an 'Update' button when initial data is provided", () => {
    const character: Character = {
      id: "1",
      name: "Luke Skywalker",
      birthYear: "19BBY",
      homeworld: { name: "Tatooine" },
    };
    render(
      <CharacterForm
        initial={character}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });

  it("calls onSubmit with the correct data when the form is submitted", async () => {
    // Use userEvent to simulate user interactions (ex clicking, typing, etc...)
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<CharacterForm onSubmit={onSubmit} onCancel={jest.fn()} />);

    // Find inputs by their placeholder text and user type values into them
    await user.type(screen.getByPlaceholderText(/name/i), "Leia Organa");
    await user.type(screen.getByPlaceholderText(/birth year/i), "19BBY");
    await user.type(screen.getByPlaceholderText(/homeworld/i), "Alderaan");

    // Simulate form submission by clicking the 'Create' button
    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Leia Organa",
      birthYear: "19BBY",
      homeworldName: "Alderaan",
    });
  });
});
