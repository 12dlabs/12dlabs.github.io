window.pgCtrl = (function () {
    var menu = [
        { name: "Blogs", url: "https://12dlabs-github-io.vercel.app" },
        { name: "Games", url: "https://12dlabs.github.io/games" },
        { name: "CompositeJs", url: "https://compositejs.github.io" }
    ];

    function init () {
        var ele = document.createElement("footer");
        ele.innerHTML = "<section><div class=\"x-copyright\" style=\"color: transparent; \"><strong>12D</strong>Labs<br /></div></section>";
        document.body.appendChild(ele);
        ele = document.createElement("header");
        ele.innerHTML = "<section><h1><a href=\"https://12dlabs.github.io\"><strong>12D</strong><span>Labs</span></a></h1><ul>"
            + menu.map(ele => "<li><a href=\"" + ele.url + "\">" + ele.name + "</a></li>").join("")
            + "</ul></section>";
        document.body.insertBefore(ele, document.body.children[0]);
    };

    return {
        init
    };
})();
