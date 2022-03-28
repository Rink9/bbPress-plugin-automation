import {
    visitAdminPage,
} from '@wordpress/e2e-test-utils';

describe( 'Automate reply from frontend', () => {
    it( 'should subscribe new forum', async () => {
        await visitAdminPage( '/' );
        await page.setViewport( { width: 1366, height: 768 } );
        await page.click( "#menu-posts-forum" );
        await page.waitForSelector( '#menu-posts-forum > ul > li:nth-child(3) > a', { visible: true } );
        await page.click( "#menu-posts-forum > ul > li:nth-child(3) > a" );
        await page.waitForSelector( '#title', { visible: true } );
        await page.type( '#title','Human Resource' );
        await page.click( "#publish" );
        await page.waitForSelector( '#sample-permalink', { visible: true } );
        await page.click( '#sample-permalink' );
        await page.waitForSelector( '#bbp_topic_title' );
        /*
         Creating new topic from frontend
        */
        await page.type( '#bbp_topic_title','Creating new topic' ); // creating new topic
        await page.type( '#bbp_topic_content','Talent Acquisition' );
        await page.type( '#bbp_topic_tags','strategy' );
        await page.click( '#bbp_stick_topic_select' );
        const topic_type = await page.$$eval( '#bbp_stick_topic_select > option:nth-child(2)', el => el.map(x => x.getAttribute("value"))); // updating topic type by selecting it as sticky
        await page.select( '#bbp_stick_topic_select', topic_type[0] );
        await page.click( '#bbp_topic_status_select' );
        const topic_status = await page.$$eval( '#bbp_topic_status_select > option:nth-child(5)', el => el.map(x => x.getAttribute("value"))); // updating topic status by selecting it as pending
        await page.select( '#bbp_topic_status_select', topic_status[0] );
        await page.waitForSelector( '#bbp_topic_submit', { visible: true } );
        await page.click( '#bbp_topic_submit' );
        /*
         Replying to a topic from frontend
        */
        await page.waitForSelector( '#bbp_reply_content', { visible: true } );
        await page.type( '#bbp_reply_content','Replying to a topic' );
        await page.click( '#bbp_reply_submit' );
        await page.setViewport( { width: 1366, height: 768 } );
        await page.hover( '#wp-admin-bar-my-account' ); // Doing logout at the end of test cases 
        await page.waitForSelector( '#wp-admin-bar-logout', { visible: true } );
        await page.click( '#wp-admin-bar-logout' );
    });
});
