import {
    visitAdminPage,
} from '@wordpress/e2e-test-utils';

describe( 'Automate topics from backend', () => {
    beforeEach(async() => {
        await visitAdminPage( '/' );
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( '#menu-posts-topic' );
    });

    it( 'should create a new topic', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Quality Assurance' );
        await page.click( '#publish' );
        await page.waitForSelector("#message");
    });

    it( 'should assign a topic to a forum', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        // create topic
        await page.type( '#title','Wordpress Engineer' );
        await page.click( "#parent_id" );
        // assigning topic to a forum from the dropdown forum
        const attr = await page.$$eval("#parent_id > option:nth-child(2)", el => el.map(x => x.getAttribute("value"))); // selecting value from the topics attributes dropdown
        await page.select( "#parent_id", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' ); 
        await page.waitForSelector("#message");
    });

    it( 'should change topic type as sticky', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        // create topic
        await page.type( '#title','Content Writer' );
        await page.click( "#bbp_stick_topic_select" );
        // Change topic to a forum by selecting sticky option from the dropdown forum
        const attr = await page.$$eval("#bbp_stick_topic_select > option:nth-child(2)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#bbp_stick_topic_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' ); 
        await page.waitForSelector("#message");
    });

    it( 'should change topic type as super sticky', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        // create topic
        await page.type( '#title','Designer' );
        await page.click( "#bbp_stick_topic_select" );
        // Change topic to a forum by selecting super sticky option from the dropdown forum
        const attr = await page.$$eval("#bbp_stick_topic_select > option:nth-child(3)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#bbp_stick_topic_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' );  
        await page.waitForSelector("#message" , {timeout: 6000});
    });

    it( 'should change topic status as closed', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        // create a topic
        await page.type( '#title','Designer' );
        await page.click( "#post_status_select" );
        // Change topic status by selecting closed option from the dropdown forum
        const attr = await page.$$eval("#post_status_select > option:nth-child(2)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#post_status_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' );  
        await page.waitForSelector("#message");
    });

    it( 'should change topic status as pending', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(3) > a' );
        await page.waitForSelector( '#title', { visible: true } );
        // create a topic
        await page.type( '#title','HR' );
        await page.click( "#post_status_select" );
        // Change topic status by selecting pending option from the dropdown forum
        const attr = await page.$$eval("#post_status_select > option:nth-child(5)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#post_status_select", attr[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' );
        await page.waitForSelector("#message");
        const pending = await page.$$eval("#post_status_select > option:nth-child(5)", el => el.map(x => x.getAttribute("value")));
        await page.select( "#post_status_select", pending[0] );
        await page.keyboard.press( 'Enter')
        await page.waitForSelector( '#publish', { visible: true } );
        await page.click( '#publish' );
        await page.waitForSelector("#message");
    });

    it( 'should create topic tag', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(4) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(4) > a' );
        await page.waitForSelector( '#tag-name', { visible: true } );
        // creating topic tag
        await page.type( '#tag-name','Programming'+ + Math.random() );
        await page.type( '#tag-description','This topic is related to Programming' );
        await page.click( '#submit' );
        // const tagName = await page.$eval(".row-title", el => el.innerHTML);
        // expect(tagName).toContain('Programming');
        const sucesssmsg = await page.waitForSelector("div[class='updated notice is-dismissible'] p");
        const message = await sucesssmsg.evaluate((element) => element.innerText);
        expect(message).toContain("Item added.");
    })

    it( 'should delete topic tag', async () => {
        await page.waitForSelector( '#menu-posts-topic > ul > li:nth-child(4) > a', { visible: true } );
        await page.click( '#menu-posts-topic > ul > li:nth-child(4) > a' );
        await page.waitForSelector( '#tag-name', { visible: true } );
        // delete topic tag
        await page.waitForSelector('.name.column-name.has-row-actions.column-primary');
        await page.hover( '.name.column-name.has-row-actions.column-primary' );
        await page.waitForSelector( '.row-actions > span.delete > a' );
        await page.click( '.row-actions > span.delete > a' );
    });
    
});
