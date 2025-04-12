const { test, expect, beforeEach, describe } = require('@playwright/test')
const { addLike, createBlog, loginWith } = require('./helpers');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
          username: 'admin',
          name: 'admin',
          password: 'admin'
      }
  });

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'admin', 'admin');
      await expect(page.getByText('admin logged in')).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'admin', 'wrongpassword');
      await expect(page.getByText('Wrong username or password')).toBeVisible();
    })
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'admin', 'admin');
    });

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'First blog', 'Anna', 'url.com');
        await expect(page.getByText('First blog - Anna')).toBeVisible();
    });

    test('add a like', async ({ page }) => {
        await createBlog(page, 'First blog', 'Anna', 'url.com');
        await expect(page.getByText('First blog - Anna')).toBeVisible();
        await page.getByRole('button', { name: 'view' }).click();
        await page.getByRole('button', { name: 'like' }).click();

        const likes = page.getByText(/likes 1/);
        await expect(likes).toBeVisible();
    });

    test('a blog can be removed', async ({ page }) => {
      await createBlog(page, 'Blog To Delete', 'Anna', 'url.com');
      const blog = page.locator('div.blog').filter({ hasText: 'Blog To Delete' });
    
      await blog.getByRole('button', { name: 'view' }).click();

      page.once('dialog', dialog => dialog.accept());
    
      await blog.getByRole('button', { name: 'remove' }).click();
      await expect(blog).not.toBeVisible();
    });

    test('only the user who added the blog sees the blog\'s delete button', async ({ page, request }) => {
      await createBlog(page, 'Hidden Delete Button Blog', 'Anna', 'url.com');
      await page.getByRole('button', { name: 'logout' }).click();
    
      await request.post('/api/users', {
        data: {
          name: 'Another User',
          username: 'another',
          password: 'secret'
        }
      });
    
      await loginWith(page, 'another', 'secret');
      const blog = page.locator('div.blog').filter({ hasText: 'Hidden Delete Button Blog' });
      await blog.getByRole('button', { name: 'view' }).click();
      await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible();
    });    
  })
})
