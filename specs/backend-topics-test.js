import {
    visitAdminPage,
} from '@wordpress/e2e-test-utils';

describe( 'Automate topics from backend', () => {
    it( 'should create a new topic', async () => {
        await visitAdminPage( '/' );
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Quality Assurance' );
        await page.click( '#publish' );
    });

    it( 'should assign a topic to a forum', async () => {
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Wordpress Engineer' );
        await page.click( "#parent_id" );
        const attr = await page.$$eval("#parent_id > option:nth-child(2)", el => el.map(x => x.getAttribute("value"))); // selecting value from the topics attributes dropdown
        await page.select( "#parent_id", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' ); 
    });

    it( 'should change topic type as sticky', async () => {
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Content Writer' );
        await page.click( "#bbp_stick_topic_select" );
        const attr = await page.$$eval("#bbp_stick_topic_select > option:nth-child(2)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#bbp_stick_topic_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' ); 
    });

    it( 'should change topic type as super sticky', async () => {
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Designer' );
        await page.click( "#bbp_stick_topic_select" );
        const attr = await page.$$eval("#bbp_stick_topic_select > option:nth-child(3)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#bbp_stick_topic_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' );  
    });

    it( 'should change topic status as closed', async () => {
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Designer' );
        await page.click( "#post_status_select" );
        const attr = await page.$$eval("#post_status_select > option:nth-child(2)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#post_status_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' );  
    });

    it( 'should change topic status as pending', async () => {
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','HR' );
        await page.click( "#post_status_select" );
        const attr = await page.$$eval("#post_status_select > option:nth-child(5)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#post_status_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' ); 
    });

    it( 'should change topic status as pending', async () => {
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(4) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(4) > a' );
        await page.waitForSelector( '#tag-name', { visible: true } );
        await page.type( '#tag-name','Programming' );
        await page.type( '#tag-slug','Programming' );
        await page.type( '#tag-description','This topic is related to Programming' );
        await page.click( '#submit' );
        
    })
});

