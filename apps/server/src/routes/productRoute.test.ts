import request from "supertest";
import express from "express";
import router from "./productRoutes";
import { describe, expect, jest, test } from "@jest/globals";
import { ProductDTO } from "@repo/schemas"; // Importa la interfaz si la tienes disponible.

const app = express();
app.use(express.json());
app.use(router);

const mockProducts: ProductDTO[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    image: "http://example.com/image1.jpg",
    price: 100,
    collections: [
      {
        id: 1,
        name: "Collection 1",
        description: "Collection Description 1",
      },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    description: null,
    image: "http://example.com/image2.jpg",
    price: 200,
    collections: [],
  },
];

jest.mock("../services/ProductServices", () => ({
  ProductsService: class MockProductsService {
    async searchProducts() {
      return mockProducts; 
    }
  },
}));

describe("GET /products/search", () => {
  test("should return a list of products with the correct structure", async () => {
    const response = await request(app).get("/products/search");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

   
    response.body.forEach((product: ProductDTO, index: number) => {
      expect(product).toHaveProperty("id", mockProducts[index].id);
      expect(product).toHaveProperty("name", mockProducts[index].name);
      expect(product).toHaveProperty("description", mockProducts[index].description);
      expect(product).toHaveProperty("image", mockProducts[index].image);
      expect(product).toHaveProperty("price", mockProducts[index].price);

  
      expect(Array.isArray(product.collections)).toBe(true);
      product.collections.forEach((collection, collectionIndex) => {
        expect(collection).toHaveProperty("id", mockProducts[index].collections[collectionIndex].id);
        expect(collection).toHaveProperty("name", mockProducts[index].collections[collectionIndex].name);
        expect(collection).toHaveProperty("description", mockProducts[index].collections[collectionIndex].description);
      });
    });
  });

  test("should handle empty results", async () => {
    jest.spyOn(
      require("../services/ProductServices").ProductsService.prototype,
      "searchProducts"
    ).mockResolvedValueOnce([]);

    const response = await request(app).get("/products/search");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0); // Verifica que el array esté vacío
  });
});
