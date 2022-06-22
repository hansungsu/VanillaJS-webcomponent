import Home from "./pages/Home.js";
import Posts from "./pages/Posts.js";
import Settings from "./pages/Settings.js";
import NotFound from "./pages/NotFound.js";

const router = async () => {
  //1. path와 템플릿 매칭
    const routes = [
        { path: "/", view: Home },
        { path: "/posts", view: Posts },
        { path: "/settings", view: Settings },
    ];

    //2. router path와 브라우저 path 매칭값 저장
    const pageMatches = routes.map((route) => {
        return {
            route, // route: route
            isMatch: route.path === location.pathname,
        };
    });

    //3. 처음 실행시 실행할 isMatch find
    let match = pageMatches.find((pageMatch) => pageMatch.isMatch);

    //4. match 상태에 따른 템플릿 출력
    if (!match) {
        match = {
            route: location.pathname,
            isMatch: true,
        };
        const page = new NotFound();
        document.querySelector("#app").innerHTML = await page.getHtml();
    } else {
        console.log('============= routes :: 1.path와 템플릿 매칭 ============');
        console.log(routes);
        console.log('============= pageMatches :: 2.router path와 브라우저 path 매칭값 저장 ============');
        console.log(pageMatches);
        console.log('============= match ============ :: 3. 처음 실행시 실행할 isMatch find');
        console.log(match);
        const page = new match.route.view();
        document.querySelector("#app").innerHTML = await page.getHtml();
        console.log('============= page ============ :: 4. match.route.view()');
        console.log(match.route);
    }
};

// 뒤로 가기 할 때 데이터 나오게 하기 위함
window.addEventListener("popstate", () => {
    router();
});

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            history.pushState(null, null, e.target.href);
            router();
        }
    });
    router();
});