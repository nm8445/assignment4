"use strict";
(function () {
    if (!sessionStorage.getItem("user")) {
        location.href = "login.html";
    }
})();
//# sourceMappingURL=authguard.js.map