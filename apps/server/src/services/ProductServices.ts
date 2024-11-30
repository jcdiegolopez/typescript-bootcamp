import {  ProductDTO } from "@repo/schemas";
import { client } from "../lib/prismaClient";


export class ProductsService {

  async searchProducts(
    searchText: string = '',
    collectionId?: number,
    sortBy?: 'asc' | 'desc' | null | undefined
  ): Promise<ProductDTO[]> {
    const products = await client.product.findMany({
      where: {
        AND: [
          searchText
            ? {
                OR: [
                  { name: { contains: searchText, mode: 'insensitive' } },
                  { description: { contains: searchText, mode: 'insensitive' } },
                ],
              }
            : {},
          collectionId
            ? {
                collections: {
                  some: { id: collectionId },
                },
              }
            : {},
        ],
      },
      orderBy: sortBy ? {
        price: sortBy,
      } : undefined,
      include: {
        collections: true, // Incluir colecciones asociadas
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      collections: product.collections.map((collection) => ({
        id: collection.id,
        name: collection.name,
        description: collection.description,
      })),
    }));
  }

    async getProductDetails(productId: number) {
      const product = await client.product.findUnique({
        where: { id: productId },
        include: {
          variants: {
            include: {
              optionValues: {
                include: {
                  option: true,
                },
              },
            },
          },
        },
      });

      if (!product) return null;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        variants: product.variants.map((variant) => ({
          id: variant.id,
          name: variant.name,
          image: variant.image,
          description: variant.description,
          optionValues: variant.optionValues.map((value) => ({
            id: value.id,
            value: value.value,
            option: {
              id: value.option.id,
              name: value.option.name,
            },
          })),
        })),
      };
    }
   

    async createProduct(name: string, description: string, image: string, price : number){ 
        return await client.product.create({
            data: {
              name,
              price,
              description: description,
              image,
            },
          });
    }

    async updateProduct(id: string, name: string, description: string, image: string, price : number){
        return await client.product.update({
            where: { id: parseInt(id, 10) },
            data: {
              name,
              description,
              image,
              price,
            },
          });
    }

    async deleteProduct(id: string){
        return await client.product.delete({
            where: { id: parseInt(id, 10) },
          });
    }


}