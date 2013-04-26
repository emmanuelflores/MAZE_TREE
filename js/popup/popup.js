function register_popup(showLinkId, hideLinkId, popupId, darkLayerId) {
    document.getElementById(darkLayerId).classList.add("obscuring-layer");
    document.getElementById(popupId).classList.add("popup");
    document.getElementById(showLinkId).classList.add("popup-link");
    document.getElementById(hideLinkId).classList.add("popup-link");

    document.getElementById(showLinkId).onclick = function() {
        var p1 = document.getElementById(popupId).classList;
        p1.remove("hidden");
        p1.add("visible");
        var p2 = document.getElementById(darkLayerId).classList;
        p2.remove("hidden");
        p2.add("visible");
    }

    document.getElementById(hideLinkId).onclick = function() {
        var p1 = document.getElementById(popupId).classList;
        p1.remove("visible");
        p1.add("hidden");
        var p2 = document.getElementById(darkLayerId).classList;
        p2.remove("visible");
        p2.add("hidden");
    }
}
