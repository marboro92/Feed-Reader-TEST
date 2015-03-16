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


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs',function(){
            for (i = 0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have Names', function() {
            for (i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            //consider testing x>0 position of menu
        });

         /* A  test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        //created a function called click that triggers a click on the menu icon to use in the folllowing test
        var clickMenu = function() {
                        $('.menu-icon-link').trigger('click');
                    };
        
        it('toggles when clicked', function(){
            clickMenu();  
            expect($('body').hasClass('menu-hidden')).toBe(false);
            clickMenu();
            expect($('body').hasClass('menu-hidden')).toBe(true);     
        });

        /* My proposed additional test: 
        To test whether the menu closes when a link in the menu is clicked*/
        it('disappears on navigation', function(){
            clickMenu();
            $('.feed-list li a').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /*new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });
        it('has atleast one entry on load', function(done){
            expect( $('.feed').find('.entry').length ).toBeGreaterThan(0);
            done();
        });
    });
    /*new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
     /* Remember, loadFeed() is asynchronous.
     */
       // container will store html
        var container = '';
       // feedNum will indicate which feed to load
        var feedNum = 0;

        beforeEach(function(done){
          //if a feed was already loades by the first test empty that feed
            if (feedNum>0) {
              $('.feed').empty();
            }
          //load new feed
            loadFeed(feedNum, function() {
                done();
            });
        }); 
    /* A test that  first ensures when a new feed is loaded
     * by the loadFeed function that the container is not empty or
      content is added.*/
        it('content is present', function(done){
          //store HTML of the feed in the container variable
            container = $('.feed').html();
            expect(container.length).not.toBe(0);
            //change feed num after first test
            feedNum= 1- feedNum;
            done();
        });
    /* A second test that ensures that the new feed is actually new/ not identical to the last one.*/
        it('loaded feeds are not identical', function(done){
            expect( $('.feed').html() ).not.toEqual(container);
            done(); 
        });
    });
    /*ANOTHER test for future functionality to 
    highlight the most recent article from each blog, uncomment when ready to start building*/

    // describe('Newest Article', function(){
    //     it('is highlighted', function(){
    //         expect($('.feed a:nth-child(1)').hasClass('highlighted')).toBe(true);
    //     });
    // }); 

}());
