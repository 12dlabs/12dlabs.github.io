/*  --------------------
*  Demo pages - Labs online - Alibaba
*  (c) Kingcean Tuan, 2015.
*
*  File  pages.ts
*  Description  The main portal and configuration script.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */

import bizcommon = require("./common");
import splitlib = require("../../libs/quark-panels/scripts/split");

if ((window as any).require && (window as any).require.cssSuport) {
    require("./common");
    require("quark-panels/scripts/split");
}

/**
  * Left menu collection. 
  */
class MenuCollection {

    /**
      * Menu of toys. 
      */
    public toys(): splitlib.Interfaces.NavMenuContract {
        var col: splitlib.Interfaces.NavMenuContract = [];
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
    }

}

/**
  * Gets the top menu. 
  */
function menu(): AliHub.Collection.ButtonInfoContract[] {
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

export function simplePage(id: string, target: string, path?: string) {
    var pg = AliHub.Common.PageController;
    pg.maxSize = "m";
    pg.minSize = "xxs";
    pg.generatePage(id);
    pg.homeInfo = home();
    pg.menu = menu();
    pg.searchProvider = (q) => {
        if (!q || q.length < 1) return null;
        var list: AliHub.Collection.ButtonInfoContract[] = [
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

/**
  * Sets up the page. 
  */
export function setup(id: string, path: string) {
    var page = splitlib.splitPage(id, {
        freeload: true,
        homeInfo: home(),
        splitPanel: splitlib.FramePageSplitPanel,
        path: path,
        leftMenu: new MenuCollection(),
        pageMenu: menu,
        searchProvider: (q) => {
            if (!q || q.length < 1) return null;
            var list: AliHub.Collection.ButtonInfoContract[] = [
                { id: "labs", name: "Search {q} in " + bizcommon.strings("page"), url: "../../p/home/?{q}" }
            ];
            return list;
        },
        titleTemplate: "{0} - {1} - 12D Labs"
    }) as splitlib.FramePageSplitPanel;
    var iframe = page.iframe();
    if (!!iframe) AliHub.Elements.adaptHeight(iframe, window, (num) => {
        var top = AliHub.Elements.getPosition(iframe).y;
        return num != null && top != null ? num - AliHub.Elements.getPosition(iframe).y : null;
    });

    return page;
}
