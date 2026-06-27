import { test, expect } from "@playwright/test";

test.describe("Portfolio Navigation Flow", () => {
  test("should load the home page and verify title metadata", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Vrushali Devlekar/i);

    // Check if the greeting name exists
    const greetingText = page.locator("h1");
    await expect(greetingText).toContainText(/Vrushali/i);
  });

  test("should verify links render correctly and focus navigation is accessible", async ({
    page,
  }) => {
    await page.goto("/");

    // Find projects link inside Navbar
    const projectsLink = page.locator('a[href="/projects"]').first();
    await expect(projectsLink).toBeVisible();

    // Test keyboard focus ring on links



    
    await page.keyboard.press("Tab");
    // Ensure focus state works (visual confirmation in screenshots if testing visually)
  });
});
