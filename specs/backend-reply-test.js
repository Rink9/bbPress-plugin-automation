import {
    visitAdminPage,
} from '@wordpress/e2e-test-utils';

describe( 'Automate reply from backend', () => {
    it( 'should create a new reply', async () => {
        await visitAdminPage( '/' );
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-reply' );
        await page.waitForSelector( '#menu-posts-reply > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-reply > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Reply on a topic' );
        await page.click( "#publish" );
    });

    it( 'should update reply status as pending', async () => {
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-reply' );
        await page.waitForSelector( '#menu-posts-reply > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-reply > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Updating reply status' );
        await page.click( '#post_status_select' );
        const attr = await page.$$eval("#post_status_select > option:nth-child(4)", el => el.map(x => x.getAttribute("value"))); // selecting value from the reply attributes dropdown
        await page.select( "#post_status_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' );  
    });
});
