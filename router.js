const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "404.html",
    "/": "index.html",
    "/event": "event.html",
    "/portfolio": "portfolio.html",
    "/services": "services.html",
    "/team": "team.html",
    "/blog": "blog.html",
    "/register": "register.html",
    "/gallery": "gallery.html",
    "/statistics": "statistics.html",
    "/login": "login.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();