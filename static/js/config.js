(function () {
    AliHub.Runtime.ModulexLoader.addModule("local", "../../inc/", true);
    AliHub.Runtime.ModulexLoader.addModule("quark-panels", "https://g.alicdn.com/hub/quark-panels/0.5.42/");
    if (!window.listener) window.listener = { push: function (str) { console.info(str); } };
})();
