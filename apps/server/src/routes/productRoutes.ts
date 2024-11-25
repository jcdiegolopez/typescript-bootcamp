import { Router } from "express";
import { client } from "../lib/prismaClient";

const router: Router = Router();

router.post('/products', async (req, res) => {
    const { name, description, image } = req.body;
  
    try {
      const newProduct = await client.product.create({
        data: {
          name,
          descripton: description,
          image,
        },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating product' + error });
    }
});

router.get('/products', async (_, res) => {
    try {
        const products = await client.product.findMany({
        include: {
            variants: true,
            options: true,
            collections: true,
        },
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await client.product.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
            variants: true,
            options: true,
            collections: true,
        },
        });

        if (!product) {
        return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching product' });
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;
  
    try {
      const updatedProduct = await client.product.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          descripton: description,
          image,
        },
      });
  
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating product' });
    }
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await client.product.delete({
        where: { id: parseInt(id, 10) },
      });
  
      res.status(204).send(); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting product' });
    }
  });
  
  
  
  

export default router;