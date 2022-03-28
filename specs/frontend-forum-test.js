import {
    visitAdminPage,
} from '@wordpress/e2e-test-utils';

describe( 'Automate forum from frontend', () => {
    it( 'should subscribe new forum', async () => {
        await visitAdminPage( '/' );
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( "#menu-posts-forum" );
        await page.waitForSelector( '#menu-posts-forum > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( "#menu-posts-forum > ul > li:nth-child(3) > a" );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Subscribe Forum' );
        await page.click( "#publish" );
        await page.waitForSelector( '#sample-permalink', { visible: true } );
        await page.click( '#sample-permalink' );
        await page.waitForSelector( '.subscription-toggle' ); // subscribing forum
        await page.click( '.subscription-toggle', { visible: true } );
        await page.setViewport( { width: 1366, height: 768 } );
        await page.hover( '#wp-admin-bar-my-account' ); // Doing logout at the end of test cases 
        await page.waitForSelector( '#wp-admin-bar-logout', { visible: true } );
        await page.click( '#wp-admin-bar-logout' );
    });
});
