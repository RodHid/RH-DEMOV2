import { test, expect } from '@playwright/test';
//import { environment } from 'src/environments/environment';

test('create Test', async ({ page }) => {
    const urlBase: string = 'http://localhost:4200';
    // Go to http://localhost:4200/
    await page.goto(urlBase);

    // Click text=Staff
    await Promise.all([
        page.waitForNavigation(/*{ url: 'http://localhost:4200/staff' }*/),
        page.click('text=Staff')
    ]);

    // Click button:has-text("Add")
    await page.click('button[name="Add"]');
    await expect(page).toHaveURL('http://localhost:4200/staff/0/edit');
    
    const btnSave = await page.$$('button#save'); 
    await expect(await btnSave[0].isDisabled()).toBeTruthy();

    // Click input[name="dui"]
    await page.click('input[name="dui"]');

    // type [placeholder="\31 2345678-9"]
    await page.type('input[name="dui"]', '00345678-1');

    // Click input[name="name"]
    await page.click('input[name="name"]');

    // Click text=Edit Staff
    await page.click('text=Edit Staff');

    //Check Validator
    await expect(page.isVisible('mat-error[id="nameReq"]')).toBeTruthy();

    // Click input[name="name"]
    await page.click('input[name="name"]');

    // type [placeholder="Doe"]
    await page.type('input[name="name"]', 'John');

    // Click input[name="lastName"]
    await page.click('input[name="lastName"]');

    // type [placeholder="Doe"]
    await page.type('input[name="lastName"]', 'Doe');

    // Click text=Department *Position * >> span
    await page.click('mat-select[name="department"]');

    // Click text=Development
    await page.click('text=Development');

    // Click input[name="position"]
    await page.click('input[name="position"]');

    // type [placeholder="Ex\:\ Senior\ Developer"]
    await page.type('input[name="position"]', 'Dev');

    // Click text=Contract type *attach_moneySalary * >> span
    await page.click('mat-select[name="type"]');

    // Click text=Temporary
    await page.click('text=Temporary');

    // Click text=attach_moneySalary *
    await page.click('input[name="salary"]');

    // type [placeholder="\34 00\.00"]
    await page.type('input[name="salary"]', '1200');

    await expect(await btnSave[0].isEnabled()).toBeTruthy();

    // Click button:has-text("save Save")
   await page.click('button:has-text("save Save")');

   // Click button:has-text("Yes")
   await page.click('button:has-text("Yes")');

   // Click text=Staff
   await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:4200/staff' }*/),
    page.click('text=Staff')
]);
});