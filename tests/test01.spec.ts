import { test, expect } from "@playwright/test";

test('test 01', async ({ page }) => {
    const urlBase: string = 'http://localhost:4200';

    //Navigate to the base page
    await page.goto(urlBase);
    //Navigate to Staff page
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

    // Click text=Edit Staff
    await page.click('text=Edit Staff');

    //Verify if the Mat-Error for Required appears
    await expect(page.isVisible('mat-error[id="idReq"]')).toBeTruthy();

    //Type data on input[name="dui"]
    await page.type('input[name="dui"]', '0035678-1');
    //Verify if the Mat-Error for Required disappears
    await expect((await page.isVisible('mat-error[id="idReq"]')).valueOf()).toBeFalsy();

    //Verify that the Mat-Error for Pattern appears
    await expect(page.isVisible('mat-error[id="idPat"]')).toBeTruthy();

    //Cleans input[name="dui"]
    await page.fill('input[name="dui"]', '');
    await page.type('input[name="dui"]', '00305678-1');
    //Verify if the Mat-Error for Pattern disappears
    await expect((await page.isVisible('mat-error[id="idPat"]')).valueOf()).toBeFalsy();

    //Click on input[name="name"]
    await page.click('input[name="name"]');
    // Click text=Edit Staff
    await page.click('text=Edit Staff');
    await expect(page.isVisible('mat-error[id="nameReq"]')).toBeTruthy();
    await page.type('input[name="name"]', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    await expect((await page.isVisible('mat-error[id="nameReq"]')).valueOf()).toBeFalsy();
    await expect(page.isVisible('mat-error[id="nameMax"]')).toBeTruthy();
    await page.fill('input[name="name"]', '');
    await expect((await page.isVisible('mat-error[id="nameMax"]')).valueOf()).toBeFalsy();
    await page.type('input[name="name"]', 'John');
    await expect((await page.isVisible('mat-error[id="nameReq"]')).valueOf()).toBeFalsy();
    await expect(await btnSave[0].isDisabled()).toBeTruthy();

    //Click on input[name="lastName"]
    await page.click('input[name="lastName"]');
    await page.click('text=Edit Staff');
    await expect(page.isVisible('mat-error[id="nameReq"]')).toBeTruthy();
    await page.type('input[name="lastName"]', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    await expect((await page.isVisible('mat-error[id="lastReq"]')).valueOf()).toBeFalsy();
    await expect(page.isVisible('mat-error[id="lastMax"]')).toBeTruthy();
    await page.fill('input[name="lastName"]', '');
    await page.type('input[name="lastName"]', 'Doe');
    await expect((await page.isVisible('mat-error[id="lastMax"]')).valueOf()).toBeFalsy();
    await expect(await btnSave[0].isDisabled()).toBeTruthy();

    //Click on input[name=department]
    await page.click('mat-select[id="department"]');
    // Click .cdk-overlay-backdrop
    await page.click('.cdk-overlay-backdrop');
    await expect(page.isVisible('mat-error[id="deptReq"]')).toBeTruthy();
    await page.click('mat-select[name="department"]');
    await page.click('text = Development');
    await expect((await page.isVisible('mat-error[id="deptReq"]')).valueOf()).toBeFalsy();
    await expect(await btnSave[0].isDisabled()).toBeTruthy();

    //Click on Position
    await page.click('input[name="position"]');
    await page.click('text = Edit Staff');
    await expect(page.isVisible('mat-error[id="pos Req"]')).toBeTruthy();
    await page.type('input[name="position"]', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    await expect((await page.isVisible('mat-error[id="postReq"]')).valueOf()).toBeFalsy();
    await expect(page.isVisible('mat-error[id="posMax"]')).toBeTruthy();
    await page.fill('input[name="position"]', '');
    await page.type('input[name="position"]', 'Senior Developer');
    await expect((await page.isVisible('mat-error[id="posMax"]')).valueOf()).toBeFalsy();
    await expect(await btnSave[0].isDisabled()).toBeTruthy();

    //Click on input[name=type]
    await page.click('mat-select[id="type"]');
    // Click .cdk-overlay-backdrop
    await page.click('.cdk-overlay-backdrop');
    await expect(page.isVisible('mat-error[id="typeReq"]')).toBeTruthy();
    await page.click('mat-select[name="type"]');
    await page.click('text = Full Time');
    await expect((await page.isVisible('mat-error[id="typeReq"]')).valueOf()).toBeFalsy();
    await expect(await btnSave[0].isDisabled()).toBeTruthy();

    await page.pause();
    
    //Click on salary
    await page.click('input[name="salary"]');
    await page.click('text = Edit Staff');
    await expect(page.isVisible('mat-error[id="salaryReq"]')).toBeTruthy();
    await page.type('input[name="salary"]', '1');
    await expect((await page.isVisible('mat-error[id="salaryReq"]')).valueOf()).toBeFalsy();
    await expect(page.isVisible('mat-error[id="salaryMin"]')).toBeTruthy();
    await page.fill('input[name="salary"]', '');
    await page.type('input[name="salary"]', '1800');
    await expect((await page.isVisible('mat-error[id="salaryMax"]')).valueOf()).toBeFalsy();
    await expect(await btnSave[0].isEnabled()).toBeTruthy();
})