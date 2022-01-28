import { test, expect } from "@playwright/test";

test('Test 02', async ({ page }) => {
    const urlBase: string = 'http://localhost:4200';

    const data = [{
        name: 'John',
        lastName: 'Doe',
        dui: '00345678-1',
        pos: 'Dev',
        dept: 'Development',
        type: 'Temporary',
        salary: '$1,200.00'
    }];
    await page.pause();
    await page.goto(urlBase);
    // Click text=Staff
    await Promise.all([
        page.waitForNavigation(/*{ url: 'http://localhost:4200/staff' }*/),
        page.click('text=Staff')
    ]);

    // Click div[role="button"]:has-text("DUI")
    await page.click('div[role="button"]:has-text("DUI")');

    await page.click(`mat-row:has-text("${data[0].dui}") >> mat-cell.mat-column-name:has-text("${data[0].name} ${data[0].lastName}") +
     mat-cell.mat-column-type:has-text("${data[0].type}") + mat-cell.mat-column-department:has-text("${data[0].dept}") +
     mat-cell.mat-column-position:has-text("${data[0].pos}") + mat-cell.mat-column-salary:has-text("${data[0].salary}")`);

     await page.pause();
});