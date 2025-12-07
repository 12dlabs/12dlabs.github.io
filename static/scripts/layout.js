window.pgCtrl = (function () {
    var menu = [
        { id: "blogs", name: "Blogs", url: "https://12dlabs-github-io.vercel.app" },
        { id: "games", name: "Games", url: "https://12dlabs.github.io/games" },
        { id: "about", name: "About", url: "https://12dlabs.github.io/about" }
    ];
    if (typeof DeepX !== "undefined" && typeof DeepX.MdBlogs.getLocaleString === "function") {
        menu[0].name = DeepX.MdBlogs.getLocaleString("blogs");
        menu[1].name = DeepX.MdBlogs.getLocaleString("games");
        menu[2].name = DeepX.MdBlogs.getLocaleString("about");
    }

    var menuEle;
    try {
        var q = window.location.search;
        if (q) {
            if (q === "?kingcean")
                menu.push({ id: "kingcean", name: "Kingcean.org", url: "https://kingcean.org" });
            if (q === "?compositejs")
                menu.push({ id: "compositejs", name: "CompositeJs", url: "https://compositejs.github.io" });
        }
    } catch (ex) {}
    function init (branch) {
        if (menuEle) return;
        var ele = document.createElement("footer");
        ele.innerHTML = "<section><div class=\"x-copyright\" style=\"color: rgba(255, 255, 255, 0.2); font-size: 36px; \"><strong>12D</strong>Labs<br /></div></section>";
        document.body.appendChild(ele);
        ele = document.createElement("header");
        ele.innerHTML = "<section><h1><a href=\"https://12dlabs.github.io\"><strong>12D</strong><span>Labs</span></a></h1><ul>"
            + menu.map(ele => "<li" + (branch === ele.id ? " class=\"state-sel\"" : "") + "><a href=\"" + ele.url + "\">" + ele.name + "</a></li>").join("")
            + "</ul></section>";
        document.body.insertBefore(ele, document.body.children[0]);
        menuEle = ele.firstChild.lastChild;
    };
    function addMenu(item) {
        if (!item || !item.id || !item.name || !item.url || menu.some(function (ele) {
            return ele.id === item.id;
        })) return;
        menu.push(item);
        if (!menuEle) return;
        var li = document.createElement("li");
        li.innerHTML = "<a href=\"" + item.url + "\">" + item.name + "</a>";
        menuEle.appendChild(li);
    }
    return {
        init,
        addMenu
    };
})();
