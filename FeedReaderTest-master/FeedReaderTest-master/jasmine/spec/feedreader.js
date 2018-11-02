/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has URL',function(){
            for(var i = 0;i<allFeeds.length;i++){
                var feedUrl = allFeeds[i].url;
                 expect(feedUrl).toBeDefined(); // URL should exist
                expect(feedUrl.length).toBeGreaterThan(3); // URL should be longer than the shortest domain(g.cn)
            }
        });

        it('has NAME',function(){
            for(var i = 0;i<allFeeds.length;i++){
                var feedName = allFeeds[i].name;
                expect(feedName).toBeDefined(); // Name should exist
                expect(typeof(feedName)).toBe("string"); // Name should be type of 'string'
                expect(feedName.length).not.toBe(0); // Name should not be empty value
            }
        });
    });

    describe('The Menu',function() {

        it('is existing',function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true); // check the 'body' has 'menu-hidden' class
        });

        it('is well changed',function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false); // check the 'menu-hidden' class was changed
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true); // check the 'menu-hidden' class was changed
        });
    });

    describe('Initial Entries',function() {
        beforeEach(function(done){
            loadFeed(0,function(){done()});
        });

        it('container has a least a single entry',function(){
            var entry = $('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection',function(){
        var firstFeed;
        var secondFeed;

        beforeEach(function(done){
            loadFeed(1,function(){
                firstFeed = $('.feed').html();  // save the value at firstFeed
                loadFeed(2,function(){
                    done();   // finish the load function
                })
            });
        });

        it('loading the new feed is success',function(){
            expect(firstFeed).toBeDefined();
            secondFeed = $('.feed').html(); // save the value at second Feed
            expect(secondFeed).toBeDefined();
            expect(secondFeed).not.toEqual(firstFeed);
        });
    });

}());
