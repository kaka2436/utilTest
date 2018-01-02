/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
/*
 * 设置超时时间为20秒，防止在网速差的情况下，导致测试条目不通过
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
$(function() {
    describe('RSS Feeds', function() {
        //测试allFeeds被定义了，并且内容不为空;
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //测试 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
        it('allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的',function () {
            for(var i = 0 ; i < allFeeds.length;i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        //测试 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
        it('allFeeds 对象里面的所有的源来保证有名字字段而且不是空的',function () {
            for (var i = 0 ; i < allFeeds.length;i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* 测试菜单元素默认是隐藏的。
     * 当点击图标的时候菜单是否显示，
     * 再次点击的时候是否隐藏。
     */
    describe('The menu',function () {
        var $body;
        beforeEach(function () {
            $body = $('body');
        });
        it('保证菜单元素默认是隐藏的',function () {
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
        it('保证当菜单图标被点击的时候菜单会且切换可见状态',function () {
            var $menuIcon = $('.menu-icon-link');
            $menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBe(false);
            $menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
    });


    /* 测试loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
     * 里面至少有一个 .entry 的元素。
     */
    describe('Initial Entries',function () {
        var spyObj;
        beforeEach(function (done) {
            loadFeed(0,done);
        });

        it('保证 loadFeed 函数被调用而且工作正常',function (done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* 测试当用 loadFeed 函数加载一个新源的时候内容会真的改变。
     * 做法是通过对比 loadFeed 函数后,网页的标题内容是否发生了改变
     */
    describe('New Feed Selection',function () {
        var feedSelection,
            newFeedSelection;
        beforeEach(function (done) {
            feedSelection = $('.header-title').html();
            loadFeed(1,done);
        });
        it('保证当用 loadFeed 函数加载一个新源的时候内容会真的改变',function (done) {
            newFeedSelection = $('.header-title').html();
            expect(newFeedSelection).not.toBe(feedSelection);
            done();
        });
    })
}());
