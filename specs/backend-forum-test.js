import {
    visitAdminPage,
} from '@wordpress/e2e-test-utils';

describe( 'Automate forum from backend', () => {
    beforeEach( async() => {
        await visitAdminPage( '/' );
        await page.setViewport( { width: 1536, height: 808 } );
        await page.click( "#menu-posts-forum" );
        await page.waitForSelector( '#menu-posts-forum > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( "#menu-posts-forum > ul > li:nth-child(3) > a" );
    });

    it( 'should create a new forum', async () => {
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Engineering' );
        await page.click( "#publish" );
        await page.waitForSelector("#message");
    });

    it( 'should create a subforum', async () => {
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Quality Assurance' );
        await page.click( "#parent_id" );
        const attr = await page.$$eval("#parent_id > option:nth-child(2)", el => el.map(x => x.getAttribute("value"))); // selecting value from the forum attributes dropdown
        await page.select( "#parent_id", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( "#publish" );   
        await page.waitForSelector("#message");
    });

    it( 'should change the visibility on forum as private', async () => {
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Marketing' );
        await page.click( "#bbp_forum_visibility_select" );
        const attr = await page.$$eval("#bbp_forum_visibility_select > option:nth-child(2)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#bbp_forum_visibility_select", attr[0] );
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( "#publish" ); 
        await page.waitForSelector("#message");
    });

    it( 'should change the visibility on forum as hidden', async () => {
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Visual Designer' );
        await page.click( "#bbp_forum_visibility_select" );
        const attr = await page.$$eval("#bbp_forum_visibility_select > option:nth-child(3)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#bbp_forum_visibility_select", attr[0] );
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( "#publish" );
        await page.waitForSelector("#message");
    });

    it( 'should change the status of a forum', async () => {  
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Human Resource' );
        await page.click( "#bbp_forum_status_select" );
        const attr = await page.$$eval("#bbp_forum_status_select > option:nth-child(2)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#bbp_forum_status_select", attr[0] );
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( "#publish" );
        await page.waitForSelector("#message");
    });
});
