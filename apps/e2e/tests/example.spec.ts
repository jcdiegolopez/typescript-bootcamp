import { test, expect } from '@playwright/test';

test.describe('E2E - Search Products', () => {
  test('should navigate, filter, and view product details', async ({ page }) => {
    // Navega a la página de búsqueda
    await page.goto('http://localhost:5173/search');
    
    const filterGarden = await page.getByRole('button', { name: 'Garden' });
    await filterGarden.click();

    
    const product = page.getByText('Refined Frozen GlovesNew ABC'); 
    await expect(product).toBeVisible();

   
    await product.first().click();


    await expect(page).toHaveURL(/\/product\/\d+/); 
    const productTitle = page.getByRole('heading', { name: 'Refined Frozen Gloves' }); 
    await expect(productTitle).toBeVisible();


    const price = page.getByText('$'); 
    await expect(price).toBeVisible();
    await expect(price).toContainText('$');

  });
});

