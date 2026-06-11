import { c as createFileRoute, f as require_jsx_runtime, i as HeadContent, l as createRootRoute, o as createRouter, r as Scripts, s as lazyRouteComponent, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ChartColumn, N as Database, O as History, T as LayoutDashboard, m as Shield, v as Settings } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BRuXdvz2.js
var import_jsx_runtime = require_jsx_runtime();
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "m-0 text-sm font-semibold text-[var(--sea-ink)]",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" TrustArmor AI. All rights reserved."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "m-0 mt-1 text-xs text-[var(--sea-ink-soft)]",
				children: "Autonomous fraud verification engine protecting micro-merchants against fake SMS payment scams."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "island-kicker m-0",
				children: "Secure Shield • Active Heuristics"
			})]
		})
	});
}
function Header() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "page-wrap flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "m-0 flex-shrink-0 text-base font-semibold tracking-tight",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2 transition hover:-translate-y-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4.5 w-4.5 text-[var(--lagoon-deep)] animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-extrabold tracking-tight text-[var(--lagoon)]",
								children: "TrustArmor AI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline-block rounded-full bg-[rgba(79,184,178,0.15)] px-2 py-0.5 text-[0.65rem] font-bold text-[var(--lagoon-deep)]",
								children: "PROTOTYPE"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-3 flex w-full flex-wrap items-center gap-x-1 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0 sm:gap-x-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm",
							activeProps: { className: "nav-link is-active" },
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm",
							activeProps: { className: "nav-link is-active" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dashboard" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/transactions",
							className: "nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm",
							activeProps: { className: "nav-link is-active" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Logs" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/blacklist",
							className: "nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm",
							activeProps: { className: "nav-link is-active" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Blacklist" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/analytics",
							className: "nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm",
							activeProps: { className: "nav-link is-active" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Analytics" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/settings",
							className: "nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm",
							activeProps: { className: "nav-link is-active" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Settings" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ml-auto flex items-center gap-1.5 sm:gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[var(--lagoon)]" })
				})
			]
		})
	});
}
var styles_default = "/assets/styles-DCdpYOFp.css";
var THEME_INIT_SCRIPT = `(function(){try{var root=document.documentElement;root.classList.remove('dark');root.classList.add('light');root.style.colorScheme='light';}catch(e){}})();`;
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_INIT_SCRIPT } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$6 = () => import("./transactions-DSJsyfME.mjs");
var Route$6 = createFileRoute("/transactions")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./settings-CmOQurE7.mjs");
var Route$5 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./dashboard-CMs9D9-l.mjs");
var Route$4 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./blacklist-D49rjv_5.mjs");
var Route$3 = createFileRoute("/blacklist")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./analytics-BGCVstDZ.mjs");
var Route$2 = createFileRoute("/analytics")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./about-D9herq5f.mjs");
var Route$1 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./routes-B-wbrK_H.mjs");
var Route = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var TransactionsRoute = Route$6.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => Route$7
});
var SettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$7
});
var DashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$7
});
var BlacklistRoute = Route$3.update({
	id: "/blacklist",
	path: "/blacklist",
	getParentRoute: () => Route$7
});
var AnalyticsRoute = Route$2.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$7
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AboutRoute,
	AnalyticsRoute,
	BlacklistRoute,
	DashboardRoute,
	SettingsRoute,
	TransactionsRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter };
