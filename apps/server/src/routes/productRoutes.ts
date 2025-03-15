import { Router, Request, Response } from "express";
import { ProductsService } from "../services/ProductServices";

const router: Router = Router();

const productService = new ProductsService();

/**
 * GET /products/search
 * Buscar productos con filtros y ordenamientos.
 * Query Parameters:
 * - searchText: texto para buscar en nombre y descripción.
 * - collectionId: ID de la colección para filtrar productos.
 * - sortBy: "asc" o "desc" para ordenar por precio.
 */
router.get('/products/search', async (req: Request, res: Response) => {
  try {
    const { searchText, collectionId, sortBy } = req.query;
    
    const products = await productService.searchProducts(
      searchText as string,
      collectionId ? parseInt(collectionId as string, 10) : undefined,
      sortBy as 'asc' | 'desc'
    );

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching products' });
  }
});

/**
 * GET /products/:id
 * Obtener detalles de un producto.
 */
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id, 10);
    
    const product = await productService.getProductDetails(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product details' });
  }
});

/**
 * POST /products
 * Crear un nuevo producto.
 * Body:
 * - name: Nombre del producto.
 * - description: Descripción del producto.
 * - image: URL de la imagen del producto.
 * - price: Precio del producto.
 */
router.post('/products', async (req: Request, res: Response) => {
  try {
    const { name, description, image, price } = req.body;

    // Llamada al servicio para crear un nuevo producto
    const newProduct = await productService.createProduct(name, description, image, price);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating product' });
  }
});

/**
 * PUT /products/:id
 * Actualizar un producto existente.
 * Params:
 * - id: ID del producto a actualizar.
 * Body:
 * - name: Nombre del producto.
 * - description: Descripción del producto.
 * - image: URL de la imagen del producto.
 * - price: Precio del producto.
 */
router.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, image, price } = req.body;
    const productId = req.params.id;

    // Llamada al servicio para actualizar el producto
    const updatedProduct = await productService.updateProduct(productId, name, description, image, price);

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

/**
 * DELETE /products/:id
 * Eliminar un producto.
 * Params:
 * - id: ID del producto a eliminar.
 */
router.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    // Llamada al servicio para eliminar el producto
    await productService.deleteProduct(productId);

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});



export default router;