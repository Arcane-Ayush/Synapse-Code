import { test, expect } from "@playwright/test";

test("home → projects → sprints flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Google Club" })).toBeVisible();
  {
    const mobileToggle = page.getByRole("button", {
      name: "Toggle navigation menu",
    });
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
    }
  }
  {
    const links = page.locator('a[href="/projects"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click();
        break;
      }
    }
  }
  await expect(page).toHaveURL(/\/projects$/);
  if (process.env.PLAYWRIGHT_PROJECT === "Desktop Chrome") {
    await expect(
      page.getByRole("link", { name: "Projects" }).first(),
    ).toHaveAttribute("aria-current", "page");
  }
  {
    const mobileToggle = page.getByRole("button", {
      name: "Toggle navigation menu",
    });
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
    }
  }
  {
    const links = page.locator('a[href="/sprints"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click();
        break;
      }
    }
  }
  await expect(page).toHaveURL(/\/sprints$/);
  if (process.env.PLAYWRIGHT_PROJECT === "Desktop Chrome") {
    await expect(
      page.getByRole("link", { name: "Sprints" }).first(),
    ).toHaveAttribute("aria-current", "page");
  }
});

test.describe("Mobile viewport", () => {
  test.skip(process.env.PLAYWRIGHT_PROJECT !== "Mobile Chrome");
  test("mobile menu toggles", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", {
      name: "Toggle navigation menu",
    });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  });
});
