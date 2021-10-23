/*  --------------------
*  Demo pages - Labs online - Alibaba
*  (c) Kingcean Tuan, 2015.
*
*  File  pages.ts
*  Description  The main portal and configuration script.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports", "./common", "../../libs/quark-panels/scripts/split"], function (require, exports, bizcommon, splitlib) {
    "use strict";
    if (window.require && window.require.cssSuport) {
        require("./common");
        require("quark-panels/scripts/split");
    }
    /**
      * Left menu collection.
      */
    var MenuCollection = (function () {
        function MenuCollection() {
        }
        /**
          * Menu of toys.
          */
        MenuCollection.prototype.toys = function () {
            var col = [];
            col.name = bizcommon.strings("page");
            col.rootPath = "~/p/home/";
            col.defaultItem = { name: "Welcome", url: "./welcome.html" };
            col.push({
                list: [
                    {
                        name: "Home",
                        url: "../home/welcome.html"
                    }
                ]
            });
            col.push({
                name: "Games",
                list: [
                    {
                        name: "Rubik&#39;s Cube",
                        url: "../../games/cube/"
                    },
                    {
                        name: "Minesweeper",
                        url: "../../games/minesweeper/"
                    },
                    {
                        name: "Web Audio",
                        url: "../../games/webaudio/"
                    },
                    {
                        name: "Cosmos Killer (mobile)",
                        url: "../../games/cosmosKiller/"
                    }
                ]
            });
            return col;
        };
        return MenuCollection;
    }());
    /**
      * Gets the top menu.
      */
    function menu() {
        return [
            {
                id: "iris",
                name: "Iris",
                url: "http://iris.alibaba.net"
            }, {
                id: "labs",
                name: bizcommon.strings("name"),
                url: "http://12d.alibaba.net"
            }, {
                id: "ape",
                name: bizcommon.strings("ape"),
                url: "http://ape.alibaba.net"
            }, {
                id: "quark",
                name: "Quark",
                url: "http://quark.alibaba.net"
            }, {
                id: "cdn",
                name: bizcommon.strings("refcdn"),
                url: "http://hub.alibaba.net/p/ref/"
            }
        ];
    }
    function home() {
        return {
            name: "RDC",
            url: "http://12d.alibaba.net/"
        };
    }
    function simplePage(id, target, path) {
        var pg = AliHub.Common.PageController;
        pg.maxSize = "m";
        pg.minSize = "xxs";
        pg.generatePage(id);
        pg.homeInfo = home();
        pg.menu = menu();
        pg.searchProvider = function (q) {
            if (!q || q.length < 1)
                return null;
            var list = [
                { id: "labs", name: "Search {q} in " + bizcommon.strings("page"), url: "?id={q}" }
            ];
            return list;
        };
        pg.renderHeader();
        pg.changeBranch(path);
        var container = AliHub.Elements.getById(target);
        AliHub.Elements.getById(id).appendChild(container);
        container.style.display = "";
        pg.refreshLayout();
    }
    exports.simplePage = simplePage;
    /**
      * Sets up the page.
      */
    function setup(id, path) {
        var page = splitlib.splitPage(id, {
            freeload: true,
            homeInfo: home(),
            splitPanel: splitlib.FramePageSplitPanel,
            path: path,
            leftMenu: new MenuCollection(),
            pageMenu: menu,
            searchProvider: function (q) {
                if (!q || q.length < 1)
                    return null;
                var list = [
                    { id: "labs", name: "Search {q} in " + bizcommon.strings("page"), url: "../../p/home/?{q}" }
                ];
                return list;
            },
            titleTemplate: "{0} - {1} - 12D Labs"
        });
        var iframe = page.iframe();
        if (!!iframe)
            AliHub.Elements.adaptHeight(iframe, window, function (num) {
                var top = AliHub.Elements.getPosition(iframe).y;
                return num != null && top != null ? num - AliHub.Elements.getPosition(iframe).y : null;
            });
        return page;
    }
    exports.setup = setup;
});
//# sourceMappingURL=pages.js.map