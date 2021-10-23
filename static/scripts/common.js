/*  --------------------
*  Common library - Labs online - Alibaba
*  (c) Kingcean Tuan, 2015.
*
*  File  common.ts
*  Description  The common library for the online service.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
      * Root path.
      */
    exports.rootPath = "../../";
    /**
      * Default language pack initializer.
      * @param template  The template to fill.
      */
    function initLp(template) {
        var res = {
            name: "12D Labs",
            close: "Close",
            allProjects: "Projects",
            allProjects2: "Projects {0} joined",
            newsletters: "Newsletters",
            filter: "Filter",
            all: "All",
            toys: "Toys Studios",
            games: "Games",
            tools: "Tools",
            technology: "Technology",
            data: "Data",
            graph: "Graph",
            animation: "Animation",
            photograph: "Photograph",
            audio: "Audio",
            video: "Video",
            mmx: "Multimedia",
            mmx2: "Multimedia (with animation)",
            file: "File",
            techOnly: "Technology only",
            website: "Website",
            search: "Search",
            navigation: "Navigation",
            client: "Client app",
            others: "Others",
            details: "Get detail",
            about: "About",
            engineers: "Engineers",
            productManagers: "Product managers",
            bizPartners: "Business partners",
            auto: "Auto",
            slogan: "Idea Spark",
            intro1: "Through technology exploration and innovation, the 12th Dimension Labs is showing us a new way to build the world. Let's start here to get the ideas from the engineers in RDC CXDC.",
            intro2: "Goals: collect, show and be in service. Wanted: new technology, new experience and new business.",
            localizationSupport: "The website of 12D Labs which you are reading supports localization technology. Try to change your market now?",
            ape: "Ape",
            refcdn: "CDN",
            page: "Page"
        };
        template.strings.reg("ww", res);
        template.strings.reg("en", res);
        res = {
            name: "第12维实验室",
            close: "关闭",
            allProjects: "所有项目",
            allProjects2: "{0} 参与的项目",
            newsletters: "快报",
            filter: "过滤",
            all: "全部",
            toys: "Toys Studios",
            games: "游戏",
            tools: "工具",
            technology: "技术",
            data: "数据",
            graph: "图表",
            animation: "动画",
            photograph: "照片",
            audio: "音频",
            video: "视频",
            mmx: "多媒体",
            mmx2: "多媒体（含动画）",
            file: "文件",
            techOnly: "纯技术",
            website: "网站",
            search: "搜索",
            navigation: "导航",
            client: "客户端应用",
            others: "其它",
            details: "获取详情",
            about: "关于",
            engineers: "工程师",
            productManagers: "产品经理",
            bizPartners: "业务方",
            auto: "自动",
            slogan: "点燃创新，燃烧激情！",
            intro1: "第12维实验室是集团客户体验事业群 RDC 团队的前沿实验室，展示技术同学在日常工作中的小创新和小想法，并做为黑客马拉松在日常工作中的延续。据 M 理论，宇宙是十一维的。",
            intro2: "主要目的：收集大家在日常工作中发掘的技术、体验、业务上的创新想法，做成 Demo 展示给产品与业务，帮助其在产品中落地。",
            localizationSupport: "其实，现在你看到的这个 12D Labs 网站（不含各项目的介绍）就采用了前端本地化技术，支持中文和英文的自动切换。想手动切换试试？",
            ape: "猿来如此",
            refcdn: "外部引用",
            page: "页面"
        };
        template.strings.reg("zh-Hans", res);
        template.strings.reg("zh-CN", res);
        template.strings.reg("zh-SG", res);
        res = {
            name: "第12維實驗室",
            close: "關閉",
            allProjects: "所有專案",
            allProjects2: "{0} 參與的專案",
            newsletters: "快報",
            filter: "過濾",
            all: "全部",
            toys: "Toys Studios",
            games: "遊戲",
            tools: "工具",
            technology: "技術",
            data: "資料",
            graph: "圖表",
            animation: "動畫",
            photograph: "照片",
            audio: "音訊",
            video: "視頻",
            mmx: "多媒體",
            mmx2: "多媒體（含動畫）",
            file: "檔",
            techOnly: "純技術",
            website: "網站",
            search: "搜索",
            navigation: "導航",
            client: "用戶端應用",
            others: "其它",
            details: "獲取詳情",
            about: "關於",
            engineers: "工程師",
            productManagers: "產品經理",
            bizPartners: "業務方",
            auto: "自動",
            slogan: "點燃創新，燃燒激情！ ",
            intro1: "第12維實驗室是集團客戶體驗事業群 RDC 團隊的前沿實驗室，展示技術同學在日常工作中的小創新和小想法，並做為駭客馬拉松在日常工作中的延續。據 M 理論，宇宙是十一維的。 ",
            intro2: "主要目的：收集大家在日常工作中發掘的技術、體驗、業務上的創新想法，做成 Demo 展示給產品與業務，説明其在產品中應用。",
            localizationSupport: "你現在看到的這個 12D Labs 網站（不含各專案之介紹）就採用了前端當地語系化技術，支援中文和英文的自動切換。想手動切換試試？ ",
            ape: "猿來如此",
            refcdn: "外部引用",
            page: "頁面"
        };
        template.strings.reg("zh-Hant", res);
        template.strings.reg("zh-TW", res);
        template.strings.reg("zh-HK", res);
        template.strings.reg("zh-MO", res);
        return template;
    }
    var ko;
    // Setup.
    if (!exports.moduleName) {
        exports.moduleName = "AliHub.Labs.Online";
        require("quark/scripts/import.min.js");
        ko = require("knockout");
        if (window.require && window.require.cssSuport) {
            require("../css/pages.css");
        }
        AliHub.Diagnostics.debugInfo("Labs common library loaded (module name " + exports.moduleName + ").");
        var template = AliHub.Res.templates(exports.moduleName, true);
        AliHub.Diagnostics.debugInfo("Registered template " + template.subject() + ".");
        initLp(template);
        var tracker = AliHub.Diagnostics.tracker();
        tracker.config("url", "http://fgt.labs.desktop");
    }
    /**
      * Gets SVG source string.
      * @param key  The key.
      */
    function svg(key) {
        if (!key)
            return null;
        return AliHub.Res.svg(exports.moduleName, key);
    }
    exports.svg = svg;
    /**
      * Gets HTML source string.
      * @param key  The key.
      */
    function html(key) {
        if (!key)
            return null;
        return AliHub.Res.html(exports.moduleName, key);
    }
    exports.html = html;
    /**
      * Gets local string.
      * @param key  The key.
      */
    function strings(key, lang) {
        if (!key)
            return null;
        return arguments.length > 1 ? AliHub.Res.strings(exports.moduleName, key, lang) : AliHub.Res.strings(exports.moduleName, key);
    }
    exports.strings = strings;
    /**
      * Sets strings of specific market code.
      * @param lang  The market code.
      * @param value  The strings.
      */
    function local(lang, value) {
        if (!lang || !value)
            return null;
        return AliHub.Res.templates(exports.moduleName).strings.reg(lang, value);
    }
    exports.local = local;
    /**
      * Gets data package resolver.
      * @param key  The key.
      */
    function webResolver(key, value) {
        if (!key)
            return null;
        return arguments.length > 1 ? AliHub.Web.resolver(exports.moduleName, key, value) : AliHub.Web.resolver(exports.moduleName, key);
    }
    exports.webResolver = webResolver;
    function regQrCode() {
        if (typeof QRCode === "undefined")
            return;
        if (!QRCode)
            return;
        ko.bindingHandlers["qrcode"] = {
            init: function (element, valueAccessor) {
                element.innerHTML = "";
                var value = ko.unwrap(valueAccessor());
                element._qrcode = new QRCode(element, value);
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var qrcode = element._qrcode;
                if (!qrcode)
                    return;
                var value = ko.unwrap(valueAccessor());
                if (!value)
                    qrcode.clear();
                else
                    qrcode.makeCode(typeof value === "string" ? value : value.text);
            }
        };
    }
    function regEditor() {
        if (typeof CodeMirror === "undefined")
            return;
        if (!CodeMirror)
            return;
        ko.bindingHandlers["codeeditor"] = {
            init: function (element, valueAccessor) {
                var codeHtml = AliHub.Common.Text.trim(element.innerHTML);
                var langM = AliHub.Elements.getAttr(element, "data-mine");
                var codeText = AliHub.Common.Text.parseHTML(codeHtml);
                if (!langM)
                    langM = codeText.indexOf("<") === 0 ? "text/html" : "text/typescript";
                element.innerHTML = "";
                var value = ko.unwrap(valueAccessor());
                element._codeEditor = CodeMirror(element, {
                    value: codeText,
                    lineNumbers: true,
                    mode: langM
                });
                element._codeEditor.setSize(element.style.width || 'auto', element.style.height || 'auto');
            }
        };
    }
    function regKoBh() {
        regQrCode();
        regEditor();
    }
    regKoBh();
});
//# sourceMappingURL=common.js.map