import { test, expect } from "@playwright/test";
import { Drawer } from "../src/Drawer";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Interaction with toolbar button and input", () => {
  test("Eraser", async ({ page }) => {
    const $eraserBtn = page.getByTitle("Eraser");
    const drawer: Drawer = await page.evaluate(() => drawer);

    expect($eraserBtn).not.toBe(null);

    await $eraserBtn.click();

    await expect($eraserBtn).toHaveClass(/active/);

    // then click on brush again
    const $brushBtn = page.getByTitle("Brush");

    expect($brushBtn).not.toBe(null);

    await $brushBtn.click();

    await expect($brushBtn).toHaveClass(/active/);
    await expect($eraserBtn).not.toHaveClass(/active/);
  });

  test("Download", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    const $downloadBtn = page.getByTitle("Download");
    await expect($downloadBtn).not.toHaveClass(/active/);
    await $downloadBtn.click();
    await expect($downloadBtn).not.toHaveClass(/active/);
    const download = await downloadPromise;
    // Wait for the download process to complete
    expect(download.url().startsWith("data:image/png;base64")).toEqual(true);
  });
});
