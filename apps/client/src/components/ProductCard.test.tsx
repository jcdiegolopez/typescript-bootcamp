import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { MemoryRouter } from "react-router"; // Importa MemoryRouter

test('load and display product card', async () => {
  render(
    <MemoryRouter>
      <ProductCard
        id={1}
        name="Test Product"
        description="Test Description"
        image="https://via.placeholder.com/150"
        price={1000}
        collections={[]}
      />
    </MemoryRouter>
  );

  const name = screen.getByText(/Test Product/i);
  const description = screen.getByText(/Test Description/i);
  const price = screen.getByText("$10.00");
  const image = screen.getByAltText(/Test Product/i);

  expect(name).toBeTruthy();
  expect(description).toBeTruthy();
  expect(price).toBeTruthy();
  expect(image).toBeTruthy();
});
