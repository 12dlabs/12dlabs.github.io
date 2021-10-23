window.pgCtrl = (function () {
    var menu = [
        { id: "blogs", name: "Blogs", url: "https://12dlabs-github-io.vercel.app" },
        { id: "games", name: "Games", url: "https://12dlabs.github.io/games" },
        { id: "about", name: "About", url: "https://12dlabs.github.io/about" }
    ];

    function init (branch) {
        var ele = document.createElement("footer");
        ele.innerHTML = "<section><div class=\"x-copyright\" style=\"color: rgba(255, 255, 255, 0.2); font-size: 36px; \"><strong>12D</strong>Labs<br /></div></section>";
        document.body.appendChild(ele);
        ele = document.createElement("header");
        ele.innerHTML = "<section><h1><a href=\"https://12dlabs.github.io\"><strong>12D</strong><span>Labs</span></a></h1><ul>"
            + menu.map(ele => "<li" + (branch === ele.id ? " class=\"state-sel\"" : "") + "><a href=\"" + ele.url + "\">" + ele.name + "</a></li>").join("")
            + "</ul></section>";
        document.body.insertBefore(ele, document.body.children[0]);
    };

    return {
        init
    };
})();
