"use strict";
function createNavbarLink(text, link) {
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", link);
    linkElement.setAttribute("class", "nav-link text-light");
    linkElement.textContent = text;
    let li = document.createElement("li");
    li.setAttribute("class", "nav-item");
    li.appendChild(linkElement);
    return li;
}
function redirectToContact() {
    window.location.href = 'contact.html';
}
function addFooterNavigation() {
    let navbar = document.createElement("nav");
    navbar.setAttribute("class", "navbar navbar-expand-lg bg-dark navbar-dark fixed-bottom");
    let container = document.createElement("div");
    container.setAttribute("class", "container");
    let navList = document.createElement("ul");
    navList.setAttribute("class", "navbar-nav ms-auto");
    let privacyPolicyLi = createNavbarLink("Privacy Policy", "privacypolicy.html");
    let termsOfServiceLi = createNavbarLink("Terms of Service", "termsofservice.html");
    let contactLi = createNavbarLink("Contact", "contact.html");
    let mapLi = createNavbarLink("Map", "map.html");
    navList.appendChild(privacyPolicyLi);
    navList.appendChild(termsOfServiceLi);
    navList.appendChild(contactLi);
    navList.appendChild(mapLi);
    container.appendChild(navList);
    navbar.appendChild(container);
    document.body.appendChild(navbar);
}
addFooterNavigation();
//# sourceMappingURL=nav.js.map