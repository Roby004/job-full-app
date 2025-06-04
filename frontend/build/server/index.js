import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, NavLink, Link, useNavigate, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createElement, useState, useMemo, useEffect } from "react";
import { Typography, TextField, FormGroup, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Menu, MenuItem, Box as Box$1, Button, Stack as Stack$1, Grid as Grid$1, Modal, CssBaseline, AppBar, Toolbar, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Tooltip as Tooltip$1, Avatar as Avatar$1, Switch, Autocomplete, Chip as Chip$1, Checkbox } from "@mui/material";
import { VisibilityOff, Visibility, Star, CloudDownload, WorkOutline, People, AttachMoney, LocationOn } from "@mui/icons-material";
import TextField$1 from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Typography$1 from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import axios from "axios";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate as useNavigate$1 } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import FreeCancellationRoundedIcon from "@mui/icons-material/FreeCancellationRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DescriptionIcon from "@mui/icons-material/Description";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const LogoIcon$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAdnSURBVHgB7VnNa1xVFD/n3pk20SpToaW4MJNVV8K4dZMZ8As3bbrSVbKS7tr+B+nGgm5SEFwmhSKC0DQIUttFIhQRXHRc6qZTvxZW6Av9SjLz7vF83PdmEsq8F2dUkDnkzXvvvvvuO797fufj3gBMZCIT+d8Jwrik0aw5OHSOABt8V+Ojvq9HJ36wHQAvQ/tGB8Yk4wHReKfugDb4qk5AbR42wah0JhRBcXtTzgFoHto3r8MYZCwgXOPtu6wkK4qtwhlmwAhhDQHrAXZmob2ZwKjfh1Gl8UYT1AJ4sRRFuA+Bu8BXTL/DizAGGRmEA7/Ap4SVWy39UvvGJltOjlMwBhndEsbxA3Obebyu/vHauzMwoozmE0wltsSGOOnUy6/egZDaeNv5T1+cJ9jmNunjdmn7ye9bTKcH/ORCaH+9DCPIgUDU5j+ac9Q7TZA2gUIt7T6d2dn6BadqM0AUiBXkXoR8zacAQe75TCElbZczBX0uR9h9ZCr4SoIhdBhhh4dZ735/bfUAapUDUXvvUr2SVlYohCaxAKWoSss5mEIQD7kHSAUAPyfkBn5DFGdAsa+AQQPFES3kQOM48s7dbs+14M61e2X0K+UTVZraIPBziA7QIcpZX5UzetJ2RL3n53ZGj9YmP0AOXWzn4Ooc6rtO7p3OJTpvbXbMVithUxJoGf0KQRx7/5MFHrTu7OuiDkdTVDDyumpqAEgNmynrMqV9riB3pfhcx5D3+cLa+Iw6Q07v+adeqbx4DkpIIQjmxGmbdVNUlUebwUxRsYZ0cN7rkKgszQBhPtuK3Hm5R1Xa6TOM42C/n1pLwJ+HElIIwjlf7ysroxt9bPYYFDcZwyIA60vYpwrtpQ5QnABUK6kFbZyovIxIppqrTb1+pjAEF4JA8A3MuS+H0ohktjGjWLSMhQmbcaOai1SK1rB+mSXJfEEtgDnNFDTm1Eu74ehIIE4sflpXfSDONppTG6U85bTCnG59QKKM8bzvvJnzYwTKippP5P3EomIhA6WxytehQCpQKKIsj0amB0k9SvLBgOaYZHOhHQSLtDhllDZp2EShJWj0Be1KECcbov0oXkgEV1AybYKDfC2FkUBMGTtUC81XqjBZdiH1TvkqA1KLSYhn0AiWD6wR1CiaVyBzZBlSuivAGKlitBPFg5pRuiSewmYXRgJh1peZB8ltNtnUT5FkMZ8GZzBV2FxmWBKUhzqI4tekR6RUi0rzS0HyiEBPdWpQQywk/H5r+7vPO0U6FoCo1I0nKUbeC4VRZlztoy4VeWZTyB0yk2FmObJ5jb4FTCvBFAyU0E0whtDTPEHWNwmpa3W//awNJaTYEspcczJwDIY8mEPKVIq+nsg4J96eGSS+PPAbxcoMyRGscOiDs0QqFPQPuikxgJUfoKQMB1Flp06Dzh/ptMYPqe3Nqc3BM6vEZ0I/eUGsJtRQZV3mQ1qScN1ltOHxejtPuH9PvF+GONO9vVoaQDEIfozYAynhNAqCEcbYgmoFTQeiYzBInFfIPFgHUPe1iGVBgKOUFn5p2oOd5GdIdx/v/+gGL3dXQ9mVIhQlO5/e68d9Zx49mB+0oHJEmnF9VhMh5vnDEuNAmaKkC70deHr/Jwjdp1A9chymaq8k7sixVpA1OtAV/tiibjzwehxGBcEBtq+s6yuWlx1ZmRCLQCvgsvIhZvNYS1kxywGz16Unf/4omRymj52kwy+cSLD6fKt3++qmLFtD++Yig5m17CNAiivZoSC2NU9YjZQ5X786xegraoWB+mewTI8FY/YOX+88/I27VWD6+Eny1ekttk3r8a3lvVFINxPCPF/VeS+rsAgstESsY/qFH2RhM64jXOyQz7y2U04n/TOQQqPuo/tQee4lXsxNb7GbtZKvPn52GG3farMn8dodC8vx4T4xBUleuJmSpErqWiKW5oMLIq1KMzA4UBiaUNrV2FudPpqA9wzgw/Zw5WgdZDexYDNhKIjO8ryASHCvMll1CoPKGuXA1gG532gQyKnIlrA6affhfHJ9qTCRcW7v6AWFWfi7IPR9wLamNcJ8HUC5jwwskPI1xWA1G3mW3fuqjvko+RXKCGf3RoSTDO9XIKzBZj88RmcdLMv3rN7isjOzFubZWCyS+Gq1aR8NTSgh7BNzJHu67B8wCgh3qHeZtUmig0O22OlHKmuDnG571xdKL++2UnCt5MtL31geYGctygG8p8VfPM3HlUIdizqIXzjeOx1MYJitwshlS9V9Du4G/IV3yD02ky8u6GwGcEtSoQ5NZrop59b4KgntG0tFOpbePKufXaunWFlhJ5uLG2Ck+0W2ByX7TboPpYsgVjWkXKxA2OKZb/5x9ezeWkh3xmkDbbufSwyJQoF5j9zuFrLtfxNa4gR4EcYBIgdzfq3W24YGhrQWeBeQy6EZUVqXbaGHsj+mIOSikq7fX/3g2XzW/2kEscoppkyelXkm+H8b7nKA7WVOdLy9iQtFQA4M4h+RxpschbwA6ewv+lzjrVUDMvqe7X8qXNUu87ECE5nIRCYykX9b/gIutzYB24VtuwAAAABJRU5ErkJggg==";
function NavbarGen() {
  return /* @__PURE__ */ jsx("div", { className: "w-full px-2 py-2", children: /* @__PURE__ */ jsxs("nav", { className: "flex pt-0 rounded-3xl border border-gray-200 w-full bg-white", style: { justifyContent: "space-between" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "c-gauche flex flex-row pl-8 py-2 items-center", children: [
      /* @__PURE__ */ jsx("img", { src: LogoIcon$1, alt: "Logo", width: "30px", height: "30px" }),
      /* @__PURE__ */ jsx(Typography, { variant: "h6", className: "logo-title  ml-4", style: { fontFamily: "Outfit", marginLeft: "6px" }, children: "E-tady" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "c-droite flex flex-row items-center px-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search job offers...",
          className: "px-4 mx-4 py-2 border border-gray-400 rounded-3xl w-80"
        }
      ),
      /* @__PURE__ */ jsx(NavLink, { to: "/auth/signin", className: "rounded-3xl pb-4 px-2 ml-4 pt-1 w-25 h-8 items-center text-center justify-center ", style: { backgroundColor: "#141313", color: "whitesmoke" }, children: "Sign in" })
    ] })
  ] }) });
}
const bg = "/assets/bg3-DP2N4JbI.png";
const jobsTest = [
  {
    id: 1,
    title: "Développeur React",
    description: "Appli front-end en React.",
    company: "TechCorp",
    category: "Développement Web",
    location: "Freelance",
    budget: 400,
    experience: "Intermédiaire",
    postedAt: "1min"
  },
  {
    id: 2,
    title: "Designer UI/UX",
    description: "Conception d’une UI mobile.",
    company: "Designify",
    category: "Design",
    location: "Sur site",
    budget: 200,
    experience: "Débutant",
    postedAt: "2j"
  },
  {
    id: 3,
    title: "Rédacteur SEO",
    description: "Contenu optimisé pour moteurs de recherche.",
    company: "ContentLab",
    category: "Marketing",
    location: "Freelance",
    budget: 150,
    experience: "Débutant",
    postedAt: "3j"
  },
  {
    id: 4,
    title: "DevOps",
    description: "CI/CD, monitoring et cloud infrastructure.",
    company: "InfraPro",
    category: "Développement Web",
    location: "Sur site",
    budget: 850,
    experience: "Expert",
    postedAt: "1 mois"
  },
  {
    id: 5,
    title: "Développeur Full Stack",
    description: "Node.js + React",
    company: "WebGen",
    category: "Développement Web",
    location: "Freelance",
    budget: 600,
    experience: "Intermédiaire",
    postedAt: "3j"
  }
];
function Welcome() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const toggleExperience = (level) => {
    setExperiences(
      (prev) => prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };
  const filteredJobs = useMemo(() => {
    let data = [...jobsTest];
    if (category) data = data.filter((job) => job.category === category);
    if (location) data = data.filter((job) => job.location === location);
    if (budgetMin) data = data.filter((job) => job.budget >= Number(budgetMin));
    if (budgetMax) data = data.filter((job) => job.budget <= Number(budgetMax));
    if (experiences.length)
      data = data.filter((job) => experiences.includes(job.experience));
    if (sortBy === "budgetAsc") data.sort((a, b) => a.budget - b.budget);
    if (sortBy === "budgetDesc") data.sort((a, b) => b.budget - a.budget);
    return data;
  }, [category, location, budgetMin, budgetMax, experiences, sortBy]);
  return /* @__PURE__ */ jsxs("main", { className: "flex flex-col items-center pt-2 pb-4 bg-gray-100 font-sans", children: [
    /* @__PURE__ */ jsx(NavbarGen, {}),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: " bg-cover bg-center  py-10 px-6 rounded-md mb-6",
        style: {
          backgroundImage: `url(${bg})`,
          // Change path as needed
          minHeight: "200px",
          width: "90%"
        },
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center ", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg text-white", children: [
            "Bienvenue sur ",
            /* @__PURE__ */ jsx("span", { className: "text-yellow-300", children: "E-tady" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-100 text-black drop-shadow-lg", children: "Connecter les talents et les opportunités en un seul clic." })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full px-8 py-6 gap-6 max-w-7xl", children: [
      /* @__PURE__ */ jsxs("aside", { className: "w-1/4 bg-white rounded-md shadow-md p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Filtres" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Catégorie" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "w-full border rounded px-3 py-2",
              value: category,
              onChange: (e) => setCategory(e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Toutes" }),
                /* @__PURE__ */ jsx("option", { children: "Développement Web" }),
                /* @__PURE__ */ jsx("option", { children: "Design" }),
                /* @__PURE__ */ jsx("option", { children: "Marketing" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Localisation" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "w-full border rounded px-3 py-2",
              value: location,
              onChange: (e) => setLocation(e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Toutes" }),
                /* @__PURE__ */ jsx("option", { children: "Freelance" }),
                /* @__PURE__ */ jsx("option", { children: "Sur site" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Budget (€)" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                placeholder: "Min",
                className: "w-1/2 border rounded px-2 py-1",
                value: budgetMin,
                onChange: (e) => setBudgetMin(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                placeholder: "Max",
                className: "w-1/2 border rounded px-2 py-1",
                value: budgetMax,
                onChange: (e) => setBudgetMax(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2", children: "Niveau d'expérience" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1 text-sm", children: ["Débutant", "Intermédiaire", "Expert"].map((level) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: experiences.includes(level),
                onChange: () => toggleExperience(level)
              }
            ),
            level
          ] }, level)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Offres d'emploi" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm mr-2", children: "Trier par:" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "border rounded px-2 py-1 text-sm",
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "recent", children: "Plus récent" }),
                  /* @__PURE__ */ jsx("option", { value: "budgetAsc", children: "Budget croissant" }),
                  /* @__PURE__ */ jsx("option", { value: "budgetDesc", children: "Budget décroissant" })
                ]
              }
            )
          ] })
        ] }),
        filteredJobs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Aucune offre ne correspond aux filtres sélectionnés." }) : filteredJobs.map((job) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-white p-5 mb-4 rounded-md shadow hover:shadow-md transition",
            children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800", children: job.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: job.description }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 mt-2", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Entreprise:" }),
                  " ",
                  job.company,
                  " | ",
                  /* @__PURE__ */ jsx("strong", { children: "Budget:" }),
                  " €",
                  job.budget,
                  " |",
                  " ",
                  /* @__PURE__ */ jsx("strong", { children: "Expérience:" }),
                  " ",
                  job.experience
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-400 mt-1", children: [
                  "Posté il y a ",
                  job.postedAt
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: `employe/jobDetail/${job.id}`,
                  className: "mt-1 px-4 py-2 text-sm  text-white rounded hover:bg-yellow-700",
                  style: { backgroundColor: "#0a8051" },
                  children: "Voir détail"
                }
              )
            ] })
          },
          job.id
        ))
      ] })
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "E-tady"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const sidepic = "/assets/Login-B5oQXUh2.png";
const SignIn = withComponentProps(function SignIn2() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();
  const handleSubmit = async () => {
    var _a;
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Échec de la connexion");
        return;
      }
      const token = result.access_token;
      localStorage.setItem("token", token);
      const userRes = await fetch("http://localhost:5000/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userData = await userRes.json();
      if (userRes.ok && ((_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.role)) {
        const role = userData.data.role;
        if (role === "recruteur") {
          navigate("/recruteur/dashboard");
        } else if (role === "candidat") {
          navigate("/employe/accueil");
        } else {
          alert("Rôle inconnu!");
        }
      } else {
        alert("Impossible de récupérer les informations utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur technique lors de la connexion.");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-row",
    children: [/* @__PURE__ */ jsx("div", {
      className: "login px-4 py-2",
      children: /* @__PURE__ */ jsx("img", {
        src: sidepic,
        alt: "login",
        className: "h-auto",
        width: "790px",
        height: "200px"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "layout flex flex-col items-center justify-center pt-16 pb-4 px-20",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "w-100 items-center justify-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-center",
          children: "Content de vous revoir !"
        }), /* @__PURE__ */ jsx("p", {
          className: "label-simple",
          children: "Veuillez saisir vos informations pour accéder à votre compte e-tady."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "input-forms",
        children: [/* @__PURE__ */ jsx(TextField, {
          required: true,
          label: "Email",
          className: "inpute w-full py-4 px-2",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          sx: {
            mt: 4
          }
        }), /* @__PURE__ */ jsxs(FormGroup, {
          className: "inpute w-full mt-4",
          children: [/* @__PURE__ */ jsxs(FormControl, {
            sx: {
              m: 0
            },
            variant: "outlined",
            className: "w-full pb-4",
            children: [/* @__PURE__ */ jsx(InputLabel, {
              htmlFor: "outlined-adornment-password",
              children: "Mot de passe"
            }), /* @__PURE__ */ jsx(OutlinedInput, {
              id: "outlined-adornment-password",
              type: showPassword ? "text" : "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
                position: "end",
                children: /* @__PURE__ */ jsx(IconButton, {
                  onClick: handleClickShowPassword,
                  onMouseDown: handleMouseDownPassword,
                  onMouseUp: handleMouseUpPassword,
                  edge: "end",
                  children: showPassword ? /* @__PURE__ */ jsx(VisibilityOff, {}) : /* @__PURE__ */ jsx(Visibility, {})
                })
              }),
              label: "Mot de passe"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "souvenir",
            children: [/* @__PURE__ */ jsx(FormControlLabel, {
              control: /* @__PURE__ */ jsx("input", {
                type: "checkbox"
              }),
              label: "Se souvenir de moi",
              labelPlacement: "end",
              className: "label pl-2",
              sx: {
                gap: "8px",
                marginLeft: "4px",
                alignItems: "center"
              }
            }), /* @__PURE__ */ jsx(NavLink, {
              to: "/auth/forgotmdp",
              className: "label",
              children: /* @__PURE__ */ jsx("p", {
                className: "link",
                style: {
                  color: "#023047",
                  fontWeight: "600"
                },
                children: "Mot de passe oublié ?"
              })
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "foot",
        style: {
          marginTop: "10%",
          order: "5",
          marginBottom: 10
        },
        children: [/* @__PURE__ */ jsx("button", {
          className: "btn-valider",
          onClick: handleSubmit,
          children: "Se connecter"
        }), /* @__PURE__ */ jsxs("div", {
          className: "inscription",
          children: [/* @__PURE__ */ jsx("p", {
            children: "Besoin d'un compte Key predict ?"
          }), /* @__PURE__ */ jsx(NavLink, {
            to: "/auth/signup",
            className: "label",
            children: /* @__PURE__ */ jsx("p", {
              className: "link",
              style: {
                color: "#023047",
                fontWeight: 600
              },
              children: "Inscrivez-vous"
            })
          })]
        })]
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SignIn
}, Symbol.toStringTag, { value: "Module" }));
const SignUp = withComponentProps(function SignIn3() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: ""
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    const payload = {
      email: formData.email,
      password: formData.password,
      role: "candidat",
      fullname: formData.fullname,
      resume: ""
    };
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        alert("Inscription réussie !");
        navigate("/auth/signin");
      } else {
        alert(`Erreur: ${result.message || "Une erreur est survenue."}`);
        console.log("Erreur lors de l'inscription", result);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur technique est survenue.");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-row",
    children: [/* @__PURE__ */ jsx("div", {
      className: "login px-4 py-2",
      children: /* @__PURE__ */ jsx("img", {
        src: sidepic,
        alt: "",
        className: "h-auto",
        width: "790px",
        height: "200px"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "layout flex flex-col items-center  pt-16 pb-4 px-20",
      style: {
        marginTop: "30px"
      },
      children: [/* @__PURE__ */ jsxs("div", {
        className: "opt",
        children: [/* @__PURE__ */ jsx("div", {
          className: "langue flex flex-row items-center justify-center",
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "mode flex flex-row items-center justify-center",
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "enable-background": "new 0 0 24 24",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("rect", {
              fill: "none",
              height: "24",
              width: "24"
            }), /* @__PURE__ */ jsx("path", {
              d: "M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "w-100 items-center justify-center mt-10",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-center",
          children: "Bienvenue sur Key predict !"
        }), /* @__PURE__ */ jsx("p", {
          className: "label-simple",
          children: "Veuillez saisir vos informations dans les champs ci-dessous pour accéder à votre compte Key Predict."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "input-forms ",
        children: [/* @__PURE__ */ jsx(TextField$1, {
          required: true,
          id: "outlined-required",
          label: "Noms",
          defaultValue: "Rabe Miarisoa",
          name: "fullname",
          value: formData.fullname,
          onChange: handleChange,
          className: "inpute w-full py-4 px-2 mb-4",
          sx: {
            marginTop: "40px",
            marginBottom: "20px"
          }
        }), /* @__PURE__ */ jsx(TextField$1, {
          required: true,
          id: "outlined-required",
          label: "Email",
          defaultValue: "",
          name: "email",
          value: formData.email,
          onChange: handleChange,
          className: "inpute w-full py-4 px-2 mb-4"
        }), /* @__PURE__ */ jsxs(FormGroup, {
          className: "inpute w-full mt-4",
          children: [/* @__PURE__ */ jsxs(FormControl, {
            sx: {
              m: 0
            },
            variant: "outlined",
            className: "w-full pb-4",
            children: [/* @__PURE__ */ jsx(InputLabel, {
              htmlFor: "outlined-adornment-password",
              children: "Mot de passe"
            }), /* @__PURE__ */ jsx(OutlinedInput, {
              id: "outlined-adornment-password",
              type: showPassword ? "text" : "password",
              className: "w-full",
              name: "password",
              value: formData.password,
              onChange: handleChange,
              endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
                position: "end",
                children: /* @__PURE__ */ jsx(IconButton, {
                  "aria-label": showPassword ? "hide the password" : "display the password",
                  onClick: handleClickShowPassword,
                  onMouseDown: handleMouseDownPassword,
                  onMouseUp: handleMouseUpPassword,
                  edge: "end",
                  children: showPassword ? /* @__PURE__ */ jsx(VisibilityOff, {}) : /* @__PURE__ */ jsx(Visibility, {})
                })
              }),
              label: "Mot de passe"
            })]
          }), /* @__PURE__ */ jsxs(FormControl, {
            sx: {
              marginTop: "20px",
              order: "1"
            },
            variant: "outlined",
            className: "w-full pb-4",
            children: [/* @__PURE__ */ jsx(InputLabel, {
              htmlFor: "outlined-adornment-password",
              children: "Confirmer Mot de passe"
            }), /* @__PURE__ */ jsx(OutlinedInput, {
              id: "outlined-adornment-password",
              type: showPassword ? "text" : "password",
              className: "w-full",
              name: "confirmPassword",
              value: formData.confirmPassword,
              onChange: handleChange,
              endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
                position: "end",
                children: /* @__PURE__ */ jsx(IconButton, {
                  "aria-label": showPassword ? "hide the password" : "display the password",
                  onClick: handleClickShowPassword,
                  onMouseDown: handleMouseDownPassword,
                  onMouseUp: handleMouseUpPassword,
                  edge: "end",
                  children: showPassword ? /* @__PURE__ */ jsx(VisibilityOff, {}) : /* @__PURE__ */ jsx(Visibility, {})
                })
              }),
              label: "Mot de passe"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", {
        style: {
          marginTop: "50%",
          order: "5",
          width: "100%"
        },
        children: /* @__PURE__ */ jsx("button", {
          className: "btn-valider ",
          onClick: handleSubmit,
          style: {
            order: "5",
            marginTop: 20
          },
          children: "Se connecter"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "inscription",
        children: [/* @__PURE__ */ jsx("p", {
          className: "",
          children: "Vous avez déjà un compte Key predict ?"
        }), /* @__PURE__ */ jsx(NavLink, {
          to: "/auth/signin",
          className: "label",
          children: /* @__PURE__ */ jsx("p", {
            className: "link",
            style: {
              color: "purple",
              fontWeight: "600"
            },
            children: "Connectez-vous"
          })
        })]
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SignUp
}, Symbol.toStringTag, { value: "Module" }));
const SignUpRecrut = withComponentProps(function SignUpCompany() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyDescription: ""
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    const payload = {
      email: formData.email,
      password: formData.password,
      role: "recruteur",
      company_name: formData.companyName,
      description: formData.companyDescription
    };
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        alert("Inscription réussie !");
        navigate("/auth/signin");
      } else {
        alert(`Erreur: ${result.message || "Une erreur est survenue."}`);
        console.log("Erreur lors de l'inscription", result);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur technique est survenue.");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-row",
    children: [/* @__PURE__ */ jsx("div", {
      className: "login px-4 py-2",
      children: /* @__PURE__ */ jsx("img", {
        src: sidepic,
        alt: "login",
        className: "h-auto",
        width: "790px",
        height: "200px"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "layout flex flex-col items-center pt-0 pb-4 px-20",
      style: {
        marginTop: "30px"
      },
      children: [/* @__PURE__ */ jsxs("div", {
        className: "w-100 items-center justify-center mt-10",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-center",
          children: "Créer un compte entreprise"
        }), /* @__PURE__ */ jsx("p", {
          className: "label-simple",
          children: "Remplissez les informations ci-dessous pour vous inscrire sur Key Predict."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "input-forms",
        children: [/* @__PURE__ */ jsx(TextField, {
          required: true,
          name: "companyName",
          label: "Nom de l'entreprise",
          value: formData.companyName,
          onChange: handleChange,
          className: "inpute w-full py-4 px-2",
          sx: {
            marginTop: "5px",
            marginBottom: "20px"
          }
        }), /* @__PURE__ */ jsx(TextField, {
          required: true,
          name: "email",
          label: "Email",
          value: formData.email,
          onChange: handleChange,
          className: "inpute w-full py-4 px-2"
        }), /* @__PURE__ */ jsx(TextField, {
          name: "companyDescription",
          label: "Description de l'entreprise",
          multiline: true,
          rows: 3,
          value: formData.companyDescription,
          onChange: handleChange,
          className: "inpute w-full py-4 px-2",
          sx: {
            mt: 2
          }
        }), /* @__PURE__ */ jsxs(FormGroup, {
          className: "inpute w-full ",
          children: [/* @__PURE__ */ jsxs(FormControl, {
            variant: "outlined",
            className: "w-full mb-6 pb-4",
            sx: {
              mt: 2,
              order: "1"
            },
            children: [/* @__PURE__ */ jsx(InputLabel, {
              htmlFor: "password",
              children: "Mot de passe"
            }), /* @__PURE__ */ jsx(OutlinedInput, {
              id: "password",
              name: "password",
              type: showPassword ? "text" : "password",
              value: formData.password,
              onChange: handleChange,
              endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
                position: "end",
                children: /* @__PURE__ */ jsx(IconButton, {
                  onClick: handleClickShowPassword,
                  onMouseDown: handleMouseDownPassword,
                  onMouseUp: handleMouseUpPassword,
                  edge: "end",
                  children: showPassword ? /* @__PURE__ */ jsx(VisibilityOff, {}) : /* @__PURE__ */ jsx(Visibility, {})
                })
              }),
              label: "Mot de passe"
            })]
          }), /* @__PURE__ */ jsxs(FormControl, {
            variant: "outlined",
            className: "w-full pb-4",
            sx: {
              mt: 4,
              order: "1"
            },
            children: [/* @__PURE__ */ jsx(InputLabel, {
              htmlFor: "confirmPassword",
              children: "Confirmer le mot de passe"
            }), /* @__PURE__ */ jsx(OutlinedInput, {
              id: "confirmPassword",
              name: "confirmPassword",
              type: showPassword ? "text" : "password",
              value: formData.confirmPassword,
              onChange: handleChange,
              endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
                position: "end",
                children: /* @__PURE__ */ jsx(IconButton, {
                  onClick: handleClickShowPassword,
                  onMouseDown: handleMouseDownPassword,
                  onMouseUp: handleMouseUpPassword,
                  edge: "end",
                  children: showPassword ? /* @__PURE__ */ jsx(VisibilityOff, {}) : /* @__PURE__ */ jsx(Visibility, {})
                })
              }),
              label: "Confirmer le mot de passe"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        style: {
          marginTop: "50%",
          order: "6",
          width: "100%"
        },
        children: /* @__PURE__ */ jsx("button", {
          className: "btn-valider w-full",
          onClick: handleSubmit,
          children: "Créer votre compte"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "inscription mt-4",
        children: [/* @__PURE__ */ jsx("p", {
          children: "Vous avez déjà un compte Key Predict ?"
        }), /* @__PURE__ */ jsx(NavLink, {
          to: "/auth/signin",
          className: "label",
          children: /* @__PURE__ */ jsx("p", {
            className: "link",
            style: {
              color: "purple",
              fontWeight: 600
            },
            children: "Connectez-vous"
          })
        })]
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SignUpRecrut
}, Symbol.toStringTag, { value: "Module" }));
const forgotmdp = withComponentProps(function SignIn4() {
  const [showPassword, setShowPassword] = React.useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-row",
    children: [/* @__PURE__ */ jsx("div", {
      className: "login px-4 py-2",
      children: /* @__PURE__ */ jsx("img", {
        src: sidepic,
        alt: "",
        className: "h-auto",
        width: "790px",
        height: "200px"
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "layout flex flex-col items-center mt-20 pt-16 pb-4 px-20",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "opt",
        children: [/* @__PURE__ */ jsx("div", {
          className: "langue flex flex-row items-center justify-center",
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "mode flex flex-row items-center justify-center",
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "enable-background": "new 0 0 24 24",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("rect", {
              fill: "none",
              height: "24",
              width: "24"
            }), /* @__PURE__ */ jsx("path", {
              d: "M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "w-100 items-center justify-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-center",
          children: "Mot de passe oublié ?"
        }), /* @__PURE__ */ jsx("p", {
          className: "label-simple mt-10",
          children: "Ne vous inquiétez pas, nous pouvons vous aider ! si vous vous souvenez encore de votre adresse e-mail, vous pouvez rapidement réinitialiser votre mot de passe. Saisissez simplement ces informations dans les champs ci-dessous et cliquez sur le bouton. Cela vous enverra un nouvel e-mail qui vous reliera au site Web de changement de mot de passe."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "input-forms",
        children: /* @__PURE__ */ jsx(TextField$1, {
          required: true,
          id: "outlined-required",
          label: "Email",
          defaultValue: "Hello World",
          className: "inpute w-full py-4 px-2",
          sx: {
            marginTop: "-50px"
          }
        })
      }), /* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("button", {
        className: "btn-valider",
        style: {
          marginTop: "-50px"
        },
        children: "Réinitialiser le mot de passe"
      }), /* @__PURE__ */ jsx("div", {
        className: "inscription",
        children: /* @__PURE__ */ jsxs("p", {
          className: "",
          children: ["Avez-vous besoin d'aide ? ", /* @__PURE__ */ jsx(NavLink, {
            to: "/auth/signup",
            className: "label",
            children: /* @__PURE__ */ jsx("p", {
              className: "link",
              style: {
                color: "purple",
                fontWeight: "600"
              },
              children: "Contactez le service client"
            })
          })]
        })
      })]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: forgotmdp
}, Symbol.toStringTag, { value: "Module" }));
const LogoIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMkSURBVHgBpVVPTxNBFH8zW8DopagHY2LcXmxNSLQxkRAPLBdjTAz15g34ArIY44VgS4zhplsvHlu+gC0HE+Oly4kED1QCWLgwxHggMWQP/iHYnfHN/uu2tNsCL9nMvDczv/m9N++9JXAGUVU13tfXlyGEjOKnocna3t5Oy7UYnEIkYH9//zSC6ajG2+05MXAymZzGIdcBkPkTAj2KZDkwMFDCqdayVEbm+cPDwypjzDoRcCqVUoUQFYnv21AvUkrna7Uaa3emaygkU855CVmpnslC0KmdnZ1y1LmuwOh+FofbnsrwgjF8edbtXGQoMASTyK4QbCYk0cl1/eZuRlBlXM5tbi9FMkbQbEid6QQqhSugERCTLgFYphDBFhqPxdB9AyKEgHLLnysUGI1gOxGaz0CE6KldFXdpvm5sJEwnFE+Hvsukj7/buDYvdZkJ0MhXFs4AfWVBJYooCGHnjeE5x85jsQkC3GNBinKgCJpFo4FfTh/adcCwXLUQW7MJlPIKGjGetPTsy0JWspVn/T2E2IsOMEB9MAAhtOC6FaSXlKVgpvCmMhYcAR99W2sYSFGGwQGmMax74dW4AFXE6FpCeTLu78XqCsrUuDtbfTs8mwAuFgOGDzfjcOmXPMuIbc8HdsdFZCkUWkFN9Rf+in1gvARXQXt8TtyoupdAXCFUo4SMkxefNZLcd/nsXbTg5YO0UUuwJuAAPEZLLWHoLJd/A81+BDh/5ILXIW3cm60GngZu4m35jetpwvlUEJoo+XnBEptXzACI8kx4+VgeG1uJ4qf6/fxq/Tns8Q/wR/xgyKcKRMixjA+WxywYQxKDcIcFMRWKMhrGaVvS2BOqB2IdDux12BLvTczjqXb74JxdhSOPmxBqJGMpsmnjYHmXZLyCOSZGOmeF1HhXYO9P4D+E88OE7mJ1BfaYBvHDXM62Y62vvm5kkPMGPQBjizRxMD1V9Rp+s9ihTODia0/A0MIaWn4Kbt+goQ4I5Z6BPdYz3u9IbzpIheyIqnulMI2RObOJFJxC9JVXGrKtBGz5v4QxkmNnBnbBF1RQ7AK1xfKbkblc6/p/lH1GwXvjQSEAAAAASUVORK5CYII=";
const NAVIGATION = [{
  segment: "dashboard",
  title: "Tableau de bord",
  icon: /* @__PURE__ */ jsx(HomeRoundedIcon, {})
}, {
  segment: "projets",
  title: "Projets",
  icon: /* @__PURE__ */ jsx(WorkRoundedIcon, {})
}, {
  segment: "evaluations",
  title: "Evaluations",
  icon: /* @__PURE__ */ jsx(RuleRoundedIcon, {})
}];
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme"
  },
  colorSchemes: {
    light: true,
    dark: true
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536
    }
  }
});
function DemoPageContent$1({
  pathname
}) {
  return /* @__PURE__ */ jsxs(Box, {
    sx: {
      py: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#f6f8f9",
      fontFamily: "Open Sans"
    },
    children: [/* @__PURE__ */ jsxs(Grid, {
      container: true,
      spacing: 2,
      sx: {
        mb: 4,
        marginLeft: "20px",
        marginRight: "20px",
        backgroundImage: "url(/app/images/back2.png)"
      },
      className: "grid-container  px-4 mx-10 items-center justify-between",
      children: [/* @__PURE__ */ jsx(Grid, {
        size: 8,
        children: /* @__PURE__ */ jsx(Stack, {
          direction: "row",
          spacing: 2,
          sx: {
            mb: 4
          },
          className: "items-center justify-between",
          children: /* @__PURE__ */ jsx(Typography$1, {
            variant: "h4",
            children: " Hello Zaza !"
          })
        })
      }), /* @__PURE__ */ jsx(Grid, {
        size: 4,
        children: /* @__PURE__ */ jsx(Stack, {
          direction: "row",
          spacing: 2,
          sx: {
            mb: 4
          },
          className: "items-center justify-between",
          children: /* @__PURE__ */ jsxs("div", {
            className: "suggestion flex items-center justify-center",
            children: [/* @__PURE__ */ jsx("img", {
              src: "/app/images/portfolio.png",
              alt: "",
              width: "80px"
            }), /* @__PURE__ */ jsxs("div", {
              className: "notes",
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-2xl font-bold",
                style: {
                  fontSize: "14px",
                  fontFamily: "Open Sans"
                },
                children: "Suggestion 1/4"
              }), /* @__PURE__ */ jsx("p", {
                className: "label-simple",
                style: {
                  fontSize: "14px"
                },
                children: "Pour une meilleure présentation de votre offre, personnalisez en mieux les informations importantes de votre annonce."
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsxs(Typography$1, {
      children: ["Dashboard content for ", pathname]
    })]
  });
}
function ToolbarActionsSearch$3() {
  return /* @__PURE__ */ jsx(Stack, {
    direction: "row",
    children: /* @__PURE__ */ jsxs(Stack, {
      direction: "row",
      className: "notif mt-2 items-center justify-center",
      spacing: 2,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "retour",
        children: [/* @__PURE__ */ jsx(Tooltip, {
          title: "Aide",
          arrow: true,
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 22 22",
            width: "24px",
            style: {
              fontWeight: "lighter"
            },
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
            })]
          })
        }), /* @__PURE__ */ jsx(Chip, {
          size: "small",
          color: "error",
          variant: "filled",
          sx: {
            position: "absolute",
            top: 0,
            right: 0
          }
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "retour",
        children: /* @__PURE__ */ jsx(Tooltip, {
          title: "Mail",
          arrow: true,
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "retour",
        children: /* @__PURE__ */ jsx(Tooltip, {
          title: "Notifications",
          arrow: true,
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
            })]
          })
        })
      }), /* @__PURE__ */ jsx("button", {
        className: "btn-second",
        children: " Mes sociétés "
      }), /* @__PURE__ */ jsx(Avatar, {
        alt: "Remy Sharp",
        src: "/app/images/avatar1.png"
      })]
    })
  });
}
function SidebarFooter({
  mini
}) {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Typography$1, {
      variant: "caption",
      sx: {
        m: 1,
        whiteSpace: "nowrap",
        overflow: "hidden"
      },
      children: mini ? "© MUI" : `© ${(/* @__PURE__ */ new Date()).getFullYear()} Made with love by MUI`
    }), /* @__PURE__ */ jsx(ThemeSwitcher, {})]
  });
}
function CustomAppTitle$2() {
  return /* @__PURE__ */ jsxs(Stack, {
    direction: "row",
    alignItems: "center",
    spacing: 2,
    children: [/* @__PURE__ */ jsx("img", {
      src: LogoIcon,
      alt: "",
      width: "30px",
      height: "30px"
    }), /* @__PURE__ */ jsx(Typography$1, {
      variant: "h6",
      className: "logo-title",
      style: {
        fontFamily: "Outfit"
      },
      children: "Key predict"
    })]
  });
}
const dashboard = withComponentProps(function DashboardLayoutSlots(props) {
  const {
    window
  } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== void 0 ? window() : void 0;
  return /* @__PURE__ */ jsx(AppProvider, {
    navigation: NAVIGATION,
    router,
    theme: demoTheme,
    window: demoWindow,
    children: /* @__PURE__ */ jsx(DashboardLayout, {
      slots: {
        appTitle: CustomAppTitle$2,
        toolbarActions: ToolbarActionsSearch$3,
        sidebarFooter: SidebarFooter
      },
      children: /* @__PURE__ */ jsx(DemoPageContent$1, {
        pathname: router.pathname
      })
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
function CustomAppTitle$1() {
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", alignItems: "center", spacing: 2, children: [
    /* @__PURE__ */ jsx("img", { src: LogoIcon$1, alt: "Logo", width: "30px", height: "30px" }),
    /* @__PURE__ */ jsx(Typography$1, { variant: "h6", className: "logo-title", style: { fontFamily: "Outfit" }, children: "e-tady" })
  ] });
}
function ToolbarActionsSearch$2() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await fetch("http://localhost:5000/logout", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      localStorage.removeItem("token");
      navigate("/auth/signin");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
    } finally {
      handleClose();
    }
  };
  return /* @__PURE__ */ jsx(Stack, { direction: "row", children: /* @__PURE__ */ jsxs(Stack, { direction: "row", className: "notif mt-2 items-center justify-center", spacing: 2, children: [
    /* @__PURE__ */ jsx("div", { className: "retour", children: /* @__PURE__ */ jsx(Tooltip, { title: "Aide", arrow: true, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 22 22", width: "24px", fill: "#1f1f1f", children: [
      /* @__PURE__ */ jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "retour", children: /* @__PURE__ */ jsx(Tooltip, { title: "Mail", arrow: true, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#1f1f1f", children: [
      /* @__PURE__ */ jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "retour", children: /* @__PURE__ */ jsx(Tooltip, { title: "Notifications", arrow: true, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#1f1f1f", children: [
      /* @__PURE__ */ jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S11.5 3.17 11.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" })
    ] }) }) }),
    /* @__PURE__ */ jsx(Avatar, { src: "/app/images/avatar1.png", sx: { cursor: "pointer" }, onClick: handleAvatarClick }),
    /* @__PURE__ */ jsxs(Menu, { anchorEl, open, onClose: handleClose, children: [
      /* @__PURE__ */ jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsx(Link, { to: "/employe/profil", style: { textDecoration: "none", color: "#333" }, children: "Profil" }),
        " "
      ] }),
      /* @__PURE__ */ jsx(MenuItem, { onClick: handleLogout, children: /* @__PURE__ */ jsx(Typography$1, { variant: "body2", style: { color: "#333" }, children: "Déconnexion" }) })
    ] }),
    "      "
  ] }) });
}
function NavbarCli() {
  return /* @__PURE__ */ jsxs("div", { className: "flex pt-0 rounded-3xl border border-gray-200 w-full ", style: { justifyContent: "space-between", padding: "10px", backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(CustomAppTitle$1, {}),
    /* @__PURE__ */ jsx(ToolbarActionsSearch$2, {})
  ] });
}
const accueil = withComponentProps(function Accueil() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/offer/open");
        if (res.data.status === "success") {
          const offers = res.data.offers.map((offer) => {
            var _a;
            return {
              id: offer.id,
              title: offer.title,
              description: extractGeneralInfo(offer.description),
              company: ((_a = offer.company) == null ? void 0 : _a.name) || "Entreprise inconnue",
              category: offer.category,
              location: offer.location,
              postedAt: new Date(offer.posted_at).toLocaleDateString(),
              budget: extractBudget(offer.description),
              experience: "Intermediaire"
            };
          });
          console.log("Data fetched successfully:", offers);
          setJobs(offers);
          setLoading(true);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  useEffect(() => {
    console.log("Jobs state updated:", jobs);
  }, [jobs]);
  const extractGeneralInfo = (desc) => {
    const split = desc.split("**Missions")[0];
    return split.trim().replace(/\*\*/g, "");
  };
  const extractBudget = (desc) => {
    const salarySection = desc.split("**Rémunération**")[1] || "";
    const salaryMatch = salarySection.match(/(\d[\d\s]*)\s*(\$|dollars)?/i);
    if (salaryMatch) {
      const number = salaryMatch[1].replace(/\s/g, "");
      return parseInt(number, 10);
    }
    return 0;
  };
  const toggleExperience = (level) => {
    setExperiences((prev) => prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]);
  };
  const filterJobs = useMemo(() => {
    const noFilterApplied = !category && !location && !budgetMin && !budgetMax && experiences.length === 0 && !sortBy;
    if (noFilterApplied) {
      console.log("Aucun filtre appliqué, tous les jobs sont affichés.");
      return jobs;
    }
    let data = [...jobs];
    console.log("Jobs data state updated:", data);
    if (category) data = data.filter((job) => job.category === category);
    if (location) data = data.filter((job) => job.location === location);
    if (budgetMin) data = data.filter((job) => job.budget >= Number(budgetMin));
    if (budgetMax) data = data.filter((job) => job.budget <= Number(budgetMax));
    if (experiences.length) data = data.filter((job) => experiences.includes(job.experience));
    if (sortBy === "budgetAsc") data.sort((a, b) => a.budget - b.budget);
    if (sortBy === "budgetDesc") data.sort((a, b) => b.budget - a.budget);
    return data;
  }, [jobs, category, location, budgetMin, budgetMax, experiences, sortBy]);
  return /* @__PURE__ */ jsxs("main", {
    className: "flex flex-col items-center pt-2 pb-4 bg-gray-100 font-sans",
    children: [/* @__PURE__ */ jsx(NavbarCli, {}), /* @__PURE__ */ jsx("div", {
      className: " bg-cover bg-center  py-10 px-6 rounded-md mb-6 mt-6",
      style: {
        backgroundImage: `url(${bg})`,
        // Change path as needed
        minHeight: "200px",
        width: "90%"
      },
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto text-center ",
        children: [/* @__PURE__ */ jsxs("h1", {
          className: "text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg text-white",
          children: ["Bienvenue sur ", /* @__PURE__ */ jsx("span", {
            className: "text-yellow-300",
            children: "E-tady"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg md:text-xl text-gray-100 text-black drop-shadow-lg",
          children: "Connecter les talents et les opportunités en un seul clic."
        })]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex w-full px-8 py-6 gap-6 max-w-7xl",
      children: [/* @__PURE__ */ jsxs("aside", {
        className: "w-1/4 bg-white rounded-md shadow-md p-5",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-semibold mb-4",
          children: "Filtres"
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-4",
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium mb-1",
            children: "Catégorie"
          }), /* @__PURE__ */ jsxs("select", {
            className: "w-full border rounded px-3 py-2",
            value: category,
            onChange: (e) => setCategory(e.target.value),
            children: [/* @__PURE__ */ jsx("option", {
              value: "",
              children: "Toutes"
            }), /* @__PURE__ */ jsx("option", {
              children: "Développement Web"
            }), /* @__PURE__ */ jsx("option", {
              children: "Design"
            }), /* @__PURE__ */ jsx("option", {
              children: "Marketing"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-4",
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium mb-1",
            children: "Localisation"
          }), /* @__PURE__ */ jsxs("select", {
            className: "w-full border rounded px-3 py-2",
            value: location,
            onChange: (e) => setLocation(e.target.value),
            children: [/* @__PURE__ */ jsx("option", {
              value: "",
              children: "Toutes"
            }), /* @__PURE__ */ jsx("option", {
              children: "Freelance"
            }), /* @__PURE__ */ jsx("option", {
              children: "Sur site"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-4",
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium mb-1",
            children: "Budget (€)"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex gap-2",
            children: [/* @__PURE__ */ jsx("input", {
              type: "number",
              placeholder: "Min",
              className: "w-1/2 border rounded px-2 py-1",
              value: budgetMin,
              onChange: (e) => setBudgetMin(e.target.value)
            }), /* @__PURE__ */ jsx("input", {
              type: "number",
              placeholder: "Max",
              className: "w-1/2 border rounded px-2 py-1",
              value: budgetMax,
              onChange: (e) => setBudgetMax(e.target.value)
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-4",
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium mb-2",
            children: "Niveau d'expérience"
          }), /* @__PURE__ */ jsx("div", {
            className: "space-y-1 text-sm",
            children: ["Débutant", "Intermédiaire", "Expert"].map((level) => /* @__PURE__ */ jsxs("label", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx("input", {
                type: "checkbox",
                checked: experiences.includes(level),
                onChange: () => toggleExperience(level)
              }), level]
            }, level))
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "flex-1",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold",
            children: "Offres d'emploi disponibles"
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "text-sm mr-2",
              children: "Trier par:"
            }), /* @__PURE__ */ jsxs("select", {
              className: "border rounded px-2 py-1 text-sm",
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              children: [/* @__PURE__ */ jsx("option", {
                value: "recent",
                children: "Plus récent"
              }), /* @__PURE__ */ jsx("option", {
                value: "budgetAsc",
                children: "Budget croissant"
              }), /* @__PURE__ */ jsx("option", {
                value: "budgetDesc",
                children: "Budget décroissant"
              })]
            })]
          })]
        }), loading ? /* @__PURE__ */ jsx("p", {
          children: "Chargement des offres..."
        }) : filterJobs.length > 0 ? filterJobs.map((job) => /* @__PURE__ */ jsx("div", {
          className: "bg-white p-5 mb-4 rounded-md shadow hover:shadow-md transition",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between items-start",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "sm:w-full w-2/3 mr-4",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold text-gray-800",
                children: job.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-600 mt-1",
                children: job.description
              }), /* @__PURE__ */ jsxs("div", {
                className: "text-sm text-gray-500 mt-2 ",
                children: [/* @__PURE__ */ jsx("strong", {
                  children: "Entreprise:"
                }), " ", job.company, " | ", /* @__PURE__ */ jsx("strong", {
                  children: "Budget:"
                }), " $", job.budget, " |", " ", /* @__PURE__ */ jsx("strong", {
                  children: "Expérience:"
                }), " Intermédiaire"]
              }), /* @__PURE__ */ jsxs("div", {
                className: "text-xs text-gray-400 mt-1",
                children: ["Posté le ", job.postedAt]
              })]
            }), /* @__PURE__ */ jsx(Link, {
              to: `jobDetail/${job.id}`,
              className: "mt-1 px-3 py-2 text-sm text-white rounded hover:bg-yellow-700 w-[20%] flex justify-center",
              style: {
                backgroundColor: "#0a8051",
                alignItems: "center",
                background: "linear-gradient(264.79deg, #023047 47.52%, #206EBB 126.2%)",
                borderRadius: "40px"
              },
              children: /* @__PURE__ */ jsx("p", {
                children: "+ Voir détail"
              })
            })]
          })
        }, job.id)) : /* @__PURE__ */ jsx("p", {
          className: "text-gray-500",
          children: "Aucunes offre ne correspond aux filtres sélectionnés."
        })]
      })]
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: accueil
}, Symbol.toStringTag, { value: "Module" }));
const BulbIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGXSURBVHgBzVVLUsJAEH0TKHCpN4g3iCcwVPlhKTeQE6AnUU4AN8Cln4XxBM4ROIJLscq0PZ8wIWSGZGHBq0ol6enP6zc9CXBIiJJrUlerGPwztgskw1hfbeGJE1WnCPSuHnOIAeTzEg2T++K2OrACxwK0QENEyJVvXLc53Y03rkzJcMA8FgQaG3bpcYTehCBSbje1JCQnnf7Kt7lhTWMBMWOfUbVrgRBc67HHY7lLyuAUFcnJJsqxOsnli2DGI2VTa9qHu0TbAp3k8rZITlidMcsMMvvSi/L1Sdlckd5d6wKs58Tc6X6duAy2sc/Y+p778uhNLp9OJYF5EknBFl58S6CvNjItElRz7T7JAX1rO6ugu8nagWlkZiyPVCdZXXAnuboh4ytRYl328XbAB+3DONCstgu2sfYPhoyY+vJ4C+T4eXRT0v8Es3XJL1Jts1PGEzZvXcBOycAVEQsX1FmfD+WDALqhRf3pAE6F5x9gzkd4o8OfCgvfT6ZuOLZi0QBWpp22vaCRRApVmZrIo+PQEGVJDkYehT9Dv7VF7EGuBwAAAABJRU5ErkJggg==";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center"
};
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
const JobDetailsPage = () => {
  var _a;
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  useNavigate();
  const {
    id
  } = useParams();
  const [matchingScore, setMatchingScore] = useState(null);
  const handleOpen = () => setOpen(true);
  const fetchMatchingScore = async (offer2) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = parseJwt(token);
      if (!decoded || !decoded.user_id) {
        console.error("Utilisateur non connecté ou token invalide.");
        return;
      }
      const preferences = JSON.parse(localStorage.getItem("candidatePreferences"));
      const res = await fetch("http://localhost:5000/matching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: decoded.user_id,
          // facultatif si ton backend utilise get_jwt_identity()
          offer: offer2,
          // doit contenir au moins l'attribut "id"
          preferences
          // ajout des préférences ici
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMatchingScore(data.matching_score);
        console.log("Matching réussi:", data);
      } else {
        console.error("Erreur matching:", data);
      }
    } catch (err) {
      console.error("Erreur réseau lors du matching:", err);
    }
  };
  const handleProceed = async () => {
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    if (!decoded || !decoded.user_id) {
      alert("Utilisateur non connecté ou token invalide.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: offer.title,
          job_offer_id: offer.id,
          status: "en attente"
        })
      });
      console.log("Offer title:", offer.title);
      console.log("Offer title:", offer.id);
      console.log("Offer user title:", decoded.user_id);
      console.log("response:", response);
      const result = await response.json();
      if (response.ok) {
        alert("Votre candidature a été enregistrée avec succès !");
        setOpen(false);
      } else {
        console.error(result);
        alert(result.error || "Une erreur s'est produite lors de la candidature.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau : impossible d’envoyer la candidature.");
    }
    setOpen(false);
  };
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/offer/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        const data = await res.json();
        console.log("Offer data get:", data);
        if (data && data.id) {
          setOffer(data);
          fetchMatchingScore(data);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'offre :", err);
      }
    };
    if (id) {
      fetchOffer();
    }
  }, [id]);
  if (!offer) return /* @__PURE__ */ jsx("div", {
    className: "p-8",
    children: "Job not found"
  });
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-100 px-8 py-6 pt-2",
    style: {
      fontFamily: "Open Sans",
      marginTop: "0px"
    },
    children: [/* @__PURE__ */ jsx(NavbarCli, {}), /* @__PURE__ */ jsxs(Link, {
      to: "/employe/accueil",
      className: "flex flex-row max-w-4xl mx-50 p-6 mt-0 text-[#929c9f] font-semibold hover:underline my-4",
      children: ["← Retour aux offres |", /* @__PURE__ */ jsxs("span", {
        className: "text-[#023047] flex flex-row gap-4",
        children: [" ", offer.title, " ", /* @__PURE__ */ jsx("img", {
          src: BulbIcon
        }), " "]
      }), "  "]
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto p-6 mt-6 font-sans text-gray-800 bg-white rounded-lg shadow-md flex flex-row",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lside ml-10",
        style: {
          width: "70%",
          minWidth: "50%"
        },
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-[#023047]",
          children: offer.title
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-sm text-gray-600 mt-1",
          children: [(_a = offer.company) == null ? void 0 : _a.name, " · ", offer.location]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-lg font-semibold",
            children: "Description de l'offre"
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-gray-700 mt-2",
            children: [" ", offer.description]
          })]
        }), /* @__PURE__ */ jsxs(Box$1, {
          sx: {
            mr: 2,
            mt: 4
          },
          children: [/* @__PURE__ */ jsxs(Box$1, {
            sx: {
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              borderBottom: "1px solid #dadada",
              borderRadius: "4px",
              padding: "10px"
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "body2",
              children: "Télétravail ou présentiel"
            }), /* @__PURE__ */ jsx(Typography, {
              variant: "body2",
              children: offer.mode_travail
            })]
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              borderBottom: "1px solid #dadada",
              borderRadius: "4px",
              padding: "10px"
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "body2",
              children: "Type de contrat"
            }), /* @__PURE__ */ jsx(Typography, {
              variant: "body2",
              children: offer.type_offre
            })]
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              borderBottom: "1px solid #dadada",
              borderRadius: "4px",
              padding: "10px"
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "body2",
              children: "Fourchette de salaire"
            }), /* @__PURE__ */ jsxs(Typography, {
              variant: "body2",
              children: [offer.salaire, "€"]
            })]
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              borderBottom: "1px solid #dadada",
              borderRadius: "4px",
              padding: "10px"
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "body2",
              children: "Catégorie"
            }), /* @__PURE__ */ jsx(Typography, {
              variant: "body2",
              children: offer.category
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-lg font-semibold",
            children: "Compétences"
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap gap-3 mt-2",
            children: offer.skills_required && offer.skills_required.length > 0 ? offer.skills_required.map((skill, index) => /* @__PURE__ */ jsx("span", {
              className: "bg-[#fff1cc] text-[#c79202] px-3 py-1 rounded-full text-sm font-medium",
              children: skill.name
            }, index)) : /* @__PURE__ */ jsx("span", {
              className: "text-gray-500",
              children: "Aucune compétences spécifiques requises"
            })
          })]
        }), /* @__PURE__ */ jsx(Button, {
          variant: "contained",
          onClick: handleOpen,
          className: "mt-8",
          sx: {
            marginTop: "20px",
            backgroundColor: "#023047",
            color: "white",
            "&:hover": {
              backgroundColor: "#45a049"
            }
          },
          children: "Postuler"
        })]
      }), /* @__PURE__ */ jsx("div", {
        id: "rside",
        children: /* @__PURE__ */ jsxs(Stack$1, {
          spacing: 2,
          className: "bg-white p-4 rounded shadow-md",
          children: [/* @__PURE__ */ jsxs(Grid$1, {
            container: true,
            spacing: 2,
            sx: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f6f8f9",
              padding: "20px",
              borderRadius: "10px"
            },
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-lg font-semibold",
              children: "Matching"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-700 mt-2",
              children: "cet offre, correspond à votre profil de : "
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-700 mt-2 py-4",
              style: {
                backgroundColor: "#0a8051",
                alignItems: "center",
                background: "linear-gradient(264.79deg, #206EBB 47.52%,  #BAA3EC 126.2%)",
                borderRadius: "40px",
                fontSize: "24px",
                color: "white",
                width: "100%",
                textAlign: "center"
              },
              children: matchingScore !== null ? `${matchingScore}%` : "Chargement..."
            })]
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-lg font-semibold",
            children: "Similar Jobs"
          }), /* @__PURE__ */ jsx("ul", {
            className: "list-disc ml-5 text-gray-700 mt-2",
            children: (similarJobs || []).map((similarJob) => /* @__PURE__ */ jsx("li", {
              children: /* @__PURE__ */ jsx(Link, {
                to: `/employe/jobDetail/${similarJob.id}`,
                className: "text-blue-600 hover:underline",
                children: similarJob.title
              })
            }, similarJob.id))
          })]
        })
      })]
    }), /* @__PURE__ */ jsx(Modal, {
      open,
      onClose: () => setOpen(false),
      "aria-labelledby": "modal-title",
      children: /* @__PURE__ */ jsxs(Box$1, {
        sx: style,
        children: [/* @__PURE__ */ jsx(Typography, {
          id: "modal-title",
          variant: "h6",
          component: "h2",
          gutterBottom: true,
          children: "En postulant vous acceptez de donner votre accord pour que le recruteur puisse accéder à votre profil et vous contacter."
        }), /* @__PURE__ */ jsx(Button, {
          onClick: handleProceed,
          variant: "contained",
          color: "primary",
          sx: {
            mt: 2
          },
          children: "Procéder"
        })]
      })
    })]
  });
};
const job_detail = withComponentProps(JobDetailsPage);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: job_detail
}, Symbol.toStringTag, { value: "Module" }));
const InformationsGenerales = ({
  resumeFile,
  skills,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  availableSkills,
  experiences,
  removeExperience,
  newExp,
  handleChange,
  handleSubmit
}) => {
  const [resume, setResume] = useState(null);
  const handleResumeUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setResume(file);
    const formData = new FormData();
    formData.append("cv", file);
    try {
      const res = await axios.post("http://localhost:5000/upload_cv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("Upload success:", res.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "Upload Resume/CV" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: ".pdf,.doc,.docx",
          onChange: handleResumeUpload,
          className: "block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        }
      ),
      resume && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-green-700", children: [
        "Uploaded: ",
        resume.name
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "Skills" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: skills.map((skill, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium", children: [
        skill,
        /* @__PURE__ */ jsx("button", { onClick: () => removeSkill(index), className: "ml-2 text-red-500 hover:text-red-700", children: "×" })
      ] }, index)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs("select", { value: newSkill, onChange: (e) => setNewSkill(e.target.value), className: "border px-3 py-2 rounded-md w-full", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "-- Select a skill --" }),
          availableSkills.filter((skill) => !skills.includes(skill.name)).map((skill, idx) => /* @__PURE__ */ jsx("option", { value: skill.name, children: skill.name }, idx))
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: addSkill, disabled: skills.length >= 8, className: `px-4 py-2 rounded ${skills.length >= 8 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`, children: "Ajouter" })
      ] }),
      skills.length >= 8 && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: "8 skills au maximum." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "Experience" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-4", children: experiences.map((exp, index) => /* @__PURE__ */ jsxs("li", { className: "p-4 border rounded-md bg-white shadow-sm relative", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => removeExperience(index), className: "absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl", children: "×" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: exp.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: exp.entreprise }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          new Date(exp.deb_date).toLocaleDateString(),
          " - ",
          exp.fin_date ? new Date(exp.fin_date).toLocaleDateString() : "Présent"
        ] })
      ] }, index)) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2", children: [
          /* @__PURE__ */ jsx("input", { name: "title", value: newExp.title, onChange: handleChange, placeholder: "Titre poste", className: "border px-3 py-2 rounded-md" }),
          /* @__PURE__ */ jsx("input", { name: "entreprise", value: newExp.entreprise, onChange: handleChange, placeholder: "Entreprise", className: "border px-3 py-2 rounded-md" }),
          /* @__PURE__ */ jsx("input", { name: "debdate", value: newExp.debdate, type: "date", onChange: handleChange, className: "border px-3 py-2 rounded-md" }),
          /* @__PURE__ */ jsx("input", { name: "findate", value: newExp.findate, type: "date", onChange: handleChange, className: "border px-3 py-2 rounded-md" }),
          /* @__PURE__ */ jsx("input", { name: "description", value: newExp.description, onChange: handleChange, placeholder: "Description", className: "border px-3 py-2 rounded-md" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded", children: "Ajouter" })
      ] })
    ] })
  ] });
};
const MesCandidatures = ({ candidatures }) => {
  return /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "Mes candidatures" }),
    candidatures.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Aucune candidature pour le moment." }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: candidatures.map((c, i) => /* @__PURE__ */ jsxs("li", { className: "p-4 border rounded-md bg-white shadow-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium", children: c.titre || "Titre inconnu" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: c.statut || "Statut inconnu" })
    ] }, i)) })
  ] });
};
const CandidatePreferencesModal = ({
  open,
  onClose,
  onSubmit
}) => {
  const [preferences, setPreferences] = useState({
    mode_travail: "",
    type_offre: "",
    min_salaire: "",
    categories: [],
    skills: []
  });
  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };
  const handleSkillChange = (skill) => {
    setPreferences((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill]
    }));
  };
  const submitPreferences = () => {
    onSubmit(preferences);
    onClose();
  };
  return open ? /* @__PURE__ */ jsx("div", {
    className: "fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50",
    children: /* @__PURE__ */ jsxs("div", {
      className: "bg-white p-6 rounded shadow-md w-full max-w-lg",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-xl font-bold mb-4",
        children: "Vos préférences d'emploi"
      }), /* @__PURE__ */ jsx("label", {
        children: "Mode de travail :"
      }), /* @__PURE__ */ jsxs("select", {
        name: "mode_travail",
        onChange: handleChange,
        className: "w-full mb-3",
        children: [/* @__PURE__ */ jsx("option", {
          value: "",
          children: "Peu importe"
        }), /* @__PURE__ */ jsx("option", {
          value: "télétravail",
          children: "Télétravail"
        }), /* @__PURE__ */ jsx("option", {
          value: "présentiel",
          children: "Présentiel"
        })]
      }), /* @__PURE__ */ jsx("label", {
        children: "Type d'offre :"
      }), /* @__PURE__ */ jsxs("select", {
        name: "type_offre",
        onChange: handleChange,
        className: "w-full mb-3",
        children: [/* @__PURE__ */ jsx("option", {
          value: "",
          children: "Peu importe"
        }), /* @__PURE__ */ jsx("option", {
          value: "CDI",
          children: "CDI"
        }), /* @__PURE__ */ jsx("option", {
          value: "CDD",
          children: "CDD"
        }), /* @__PURE__ */ jsx("option", {
          value: "Freelance",
          children: "Freelance"
        })]
      }), /* @__PURE__ */ jsx("label", {
        children: "Salaire minimum souhaité (€) :"
      }), /* @__PURE__ */ jsx("input", {
        type: "number",
        name: "min_salaire",
        onChange: handleChange,
        className: "w-full mb-3"
      }), /* @__PURE__ */ jsx("label", {
        children: "Compétences préférées :"
      }), /* @__PURE__ */ jsx("div", {
        className: "flex flex-wrap gap-2 mb-3",
        children: ["Python", "Développement web", "React", "Communication"].map((skill) => /* @__PURE__ */ jsx("button", {
          type: "button",
          className: `px-3 py-1 rounded-full border ${preferences.skills.includes(skill) ? "bg-blue-200" : ""}`,
          onClick: () => handleSkillChange(skill),
          children: skill
        }, skill))
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-end gap-2",
        children: [/* @__PURE__ */ jsx("button", {
          onClick: onClose,
          children: "Annuler"
        }), /* @__PURE__ */ jsx("button", {
          className: "bg-blue-600 text-white px-4 py-2 rounded",
          onClick: submitPreferences,
          children: "Appliquer"
        })]
      })]
    })
  }) : null;
};
const Profil = () => {
  var _a, _b;
  const [activeTab, setActiveTab] = useState("infos");
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const [userData, setUserData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({
    title: "",
    entreprise: "",
    debdate: "",
    findate: "",
    description: ""
  });
  const user = {
    suggestedCompanies: ["OpenAI", "Meta", "Google", "Spotify", "Netflix"]
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const [matchScore, setMatchScore] = useState(null);
  const handleSubmitPreferences = (preferences) => {
    localStorage.setItem("candidatePreferences", JSON.stringify(preferences));
    const pref = JSON.parse(localStorage.getItem("candidatePreferences"));
    console.log("Préférences sauvegardées :", pref);
  };
  useEffect(() => {
    const fetchData = async () => {
      var _a2, _b2, _c;
      const res = await axios.get("http://localhost:5000/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = res.data.data;
      setUserData(data);
      setExperiences(((_a2 = data == null ? void 0 : data.candidat) == null ? void 0 : _a2.experiences) || []);
      console.log("skills", (_b2 = data == null ? void 0 : data.candidat) == null ? void 0 : _b2.skills);
      setSkills((_c = data == null ? void 0 : data.candidat) == null ? void 0 : _c.skills.map((s) => s.name));
    };
    const fetchSkills = async () => {
      const res = await axios.get("http://localhost:5000/skills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAvailableSkills(res.data || []);
    };
    fetchData();
    fetchSkills();
  }, []);
  console.log("User Data:", skills);
  const handleChange = (e) => setNewExp({
    ...newExp,
    [e.target.name]: e.target.value
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/experience", newExp, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (response.data.status === "success") {
      setExperiences([...experiences, response.data.data]);
      setNewExp({
        title: "",
        entreprise: "",
        debdate: "",
        findate: "",
        description: ""
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-100 px-8 py-6 pt-2",
    children: [/* @__PURE__ */ jsx(NavbarCli, {}), /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto p-6 mt-6 font-sans text-gray-800 bg-white rounded-lg shadow-md",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-6",
        children: [/* @__PURE__ */ jsx("img", {
          src: "https://via.placeholder.com/150",
          className: "w-32 h-32 rounded-full border shadow-sm"
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-bold",
            children: (userData == null ? void 0 : userData.candidat.fullname) || "Loading..."
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-gray-600",
            children: ((_a = userData == null ? void 0 : userData.candidat) == null ? void 0 : _a.bio) || "Bio non disponible"
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-4 mt-6 border-b border-[#dadada] pb-0",
        children: [/* @__PURE__ */ jsxs("button", {
          className: `${activeTab === "infos" ? "border-b-3 border-[#BAA3EC]  text-[#023047]" : ""} pb-2 flex`,
          onClick: () => setActiveTab("infos"),
          children: [/* @__PURE__ */ jsx(LightbulbOutlinedIcon, {
            className: "ml-1 "
          }), "Informations générales"]
        }), /* @__PURE__ */ jsxs("button", {
          className: `${activeTab === "candidatures" ? "border-b-3 border-[#BAA3EC]  text-[#023047]" : ""} pb-2 flex `,
          onClick: () => setActiveTab("candidatures"),
          children: [/* @__PURE__ */ jsx(ArticleOutlinedIcon, {
            className: "ml-1",
            fontSize: "small"
          }), "Mes candidatures"]
        })]
      }), activeTab === "infos" ? /* @__PURE__ */ jsx(InformationsGenerales, {
        resumeFile,
        skills,
        newSkill,
        setNewSkill,
        addSkill: () => {
          if (newSkill && !skills.includes(newSkill)) setSkills([...skills, newSkill]);
        },
        removeSkill: (index) => setSkills(skills.filter((_, i) => i !== index)),
        availableSkills,
        experiences,
        removeExperience: (index) => setExperiences(experiences.filter((_, i) => i !== index)),
        newExp,
        handleChange,
        handleSubmit
      }) : /* @__PURE__ */ jsx(MesCandidatures, {
        candidatures: ((_b = userData == null ? void 0 : userData.candidat) == null ? void 0 : _b.candidatures) || []
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-8",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-semibold mb-2",
          children: "Suggested Companies"
        }), /* @__PURE__ */ jsx("button", {
          onClick: handleOpen,
          className: "bg-blue-500 text-white px-4 py-2 rounded",
          children: "Préférences de matching"
        }), /* @__PURE__ */ jsx(CandidatePreferencesModal, {
          open: isModalOpen,
          onClose: handleClose,
          onSubmit: handleSubmitPreferences
        }), /* @__PURE__ */ jsx("ul", {
          className: "grid grid-cols-2 gap-3",
          children: user.suggestedCompanies.map((company) => /* @__PURE__ */ jsx("li", {
            className: "p-3 bg-gray-100 rounded-md text-center font-medium text-gray-700",
            children: company
          }, company))
        })]
      })]
    })]
  });
};
const profil = withComponentProps(Profil);
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profil
}, Symbol.toStringTag, { value: "Module" }));
const questions = [
  {
    id: 1,
    question: "What does HTTP stand for?",
    type: "qcm",
    options: ["HyperText Transfer Protocol", "Hyper Transfer Text Port", "High Transfer Text Protocol"]
  },
  {
    id: 2,
    question: "TypeScript is a superset of JavaScript.",
    type: "truefalse"
  },
  {
    id: 3,
    question: "Describe a challenging situation you solved with code.",
    type: "long"
  },
  {
    id: 4,
    question: "What is the time complexity of binary search?",
    type: "qcm",
    options: ["O(n)", "O(log n)", "O(n log n)"]
  },
  {
    id: 5,
    question: "React is maintained by Microsoft.",
    type: "truefalse"
  },
  {
    id: 6,
    question: "Explain the difference between state and props in React.",
    type: "long"
  },
  {
    id: 7,
    question: "CSS stands for...",
    type: "qcm",
    options: ["Cascading Style Sheets", "Computer Style Syntax", "Code Styling System"]
  },
  {
    id: 8,
    question: 'You can use the "useEffect" hook in class components.',
    type: "truefalse"
  },
  {
    id: 9,
    question: "What is a RESTful API?",
    type: "long"
  },
  {
    id: 10,
    question: "Which of the following is not a JavaScript data type?",
    type: "qcm",
    options: ["String", "Boolean", "Element"]
  }
];
const QuestionnairePage = () => {
  var _a;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const navigate = useNavigate$1();
  const currentQuestion = questions[currentIndex];
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const handleAnswer = (val) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: val
    });
  };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    console.log("User Answers:", answers);
    navigate("/merci");
  };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-2xl mx-auto p-6 font-sans",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center mb-6",
      children: [/* @__PURE__ */ jsxs("h2", {
        className: "text-lg font-semibold",
        children: ["Question ", currentIndex + 1, " / ", questions.length]
      }), /* @__PURE__ */ jsxs("div", {
        className: "text-sm font-semibold text-red-600",
        children: ["⏰ ", minutes, ":", seconds < 10 ? "0" : "", seconds]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-white p-6 rounded-lg shadow text-gray-800",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-md font-medium mb-4",
        children: currentQuestion.question
      }), currentQuestion.type === "qcm" && ((_a = currentQuestion.options) == null ? void 0 : _a.map((opt) => /* @__PURE__ */ jsxs("label", {
        className: "block mb-2",
        children: [/* @__PURE__ */ jsx("input", {
          type: "radio",
          name: `question-${currentQuestion.id}`,
          className: "mr-2",
          checked: answers[currentQuestion.id] === opt,
          onChange: () => handleAnswer(opt)
        }), opt]
      }, opt))), currentQuestion.type === "truefalse" && ["Vrai", "Faux"].map((val) => /* @__PURE__ */ jsxs("label", {
        className: "block mb-2",
        children: [/* @__PURE__ */ jsx("input", {
          type: "radio",
          name: `question-${currentQuestion.id}`,
          className: "mr-2",
          checked: answers[currentQuestion.id] === val,
          onChange: () => handleAnswer(val)
        }), val]
      }, val)), currentQuestion.type === "long" && /* @__PURE__ */ jsx("textarea", {
        value: answers[currentQuestion.id] || "",
        onChange: (e) => handleAnswer(e.target.value),
        rows: 5,
        className: "w-full border px-3 py-2 rounded-md"
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-6 flex justify-end",
        children: /* @__PURE__ */ jsx("button", {
          onClick: handleNext,
          className: "bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700",
          children: currentIndex === questions.length - 1 ? "Soumettre" : "Suivant"
        })
      })]
    })]
  });
};
const job_test = withComponentProps(QuestionnairePage);
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: job_test
}, Symbol.toStringTag, { value: "Module" }));
const drawerWidth = 240;
const menuItems = [{
  text: "Tableau de bord",
  path: "/recruteur/dashboard",
  icon: /* @__PURE__ */ jsx(HomeRoundedIcon, {})
}, {
  text: "Talent Matcher",
  path: "/recruteur/talent_matcher",
  icon: /* @__PURE__ */ jsx(PersonRoundedIcon, {})
}, {
  text: "Modèle prédictif",
  path: "/recruteur/modele_predictif",
  icon: /* @__PURE__ */ jsx(RuleRoundedIcon, {})
}, {
  text: "Évaluation",
  path: "/recruteur/evaluation",
  icon: /* @__PURE__ */ jsx(RuleRoundedIcon, {})
}];
function ToolbarActionsSearch$1() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await fetch("http://localhost:5000/logout", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      localStorage.removeItem("token");
      navigate("/auth/signin");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
    } finally {
      handleClose();
    }
  };
  return /* @__PURE__ */ jsx(Stack$1, {
    direction: "row",
    children: /* @__PURE__ */ jsxs(Stack$1, {
      direction: "row",
      className: "notif mt-2 items-center justify-center",
      spacing: 2,
      children: [/* @__PURE__ */ jsx("div", {
        className: "retour",
        children: /* @__PURE__ */ jsx(Tooltip$1, {
          title: "Aide",
          arrow: true,
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 22 22",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "retour",
        children: /* @__PURE__ */ jsx(Tooltip$1, {
          title: "Mail",
          arrow: true,
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "retour",
        children: /* @__PURE__ */ jsx(Tooltip$1, {
          title: "Notifications",
          arrow: true,
          children: /* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "24px",
            viewBox: "0 0 24 24",
            width: "24px",
            fill: "#1f1f1f",
            children: [/* @__PURE__ */ jsx("path", {
              d: "M0 0h24v24H0V0z",
              fill: "none"
            }), /* @__PURE__ */ jsx("path", {
              d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S11.5 3.17 11.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
            })]
          })
        })
      }), /* @__PURE__ */ jsx(Avatar$1, {
        src: "/app/images/avatar1.png",
        sx: {
          cursor: "pointer"
        },
        onClick: handleAvatarClick
      }), /* @__PURE__ */ jsxs(Menu, {
        anchorEl,
        open,
        onClose: handleClose,
        children: [/* @__PURE__ */ jsxs(MenuItem, {
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/recruteur/profil",
            style: {
              textDecoration: "none",
              color: "#333"
            },
            children: "Profil"
          }), " "]
        }), /* @__PURE__ */ jsx(MenuItem, {
          onClick: handleLogout,
          children: /* @__PURE__ */ jsx(Typography, {
            variant: "body2",
            style: {
              color: "#333"
            },
            children: "Déconnexion"
          })
        })]
      }), "      "]
    })
  });
}
const dash_recrut = withComponentProps(function DashboardLayout2() {
  useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  return /* @__PURE__ */ jsxs(Box$1, {
    sx: {
      display: "flex"
    },
    children: [/* @__PURE__ */ jsx(CssBaseline, {}), /* @__PURE__ */ jsx(AppBar, {
      position: "fixed",
      sx: {
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "none",
        borderBottom: "1px solid #ddd"
      },
      children: /* @__PURE__ */ jsxs(Toolbar, {
        children: [/* @__PURE__ */ jsxs(Stack$1, {
          direction: "row",
          alignItems: "center",
          spacing: 2,
          sx: {
            flexGrow: 1
          },
          children: [/* @__PURE__ */ jsx("img", {
            src: LogoIcon$1,
            alt: "Logo",
            width: "30px",
            height: "30px"
          }), /* @__PURE__ */ jsx(Typography, {
            variant: "h6",
            noWrap: true,
            children: "e-tady"
          })]
        }), /* @__PURE__ */ jsx(Stack$1, {
          direction: "row",
          spacing: 2,
          alignItems: "center",
          children: /* @__PURE__ */ jsx(ToolbarActionsSearch$1, {})
        })]
      })
    }), /* @__PURE__ */ jsx("nav", {
      children: /* @__PURE__ */ jsxs(Drawer, {
        variant: "permanent",
        sx: {
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "white"
          }
        },
        children: [/* @__PURE__ */ jsx(Toolbar, {}), /* @__PURE__ */ jsx(List, {
          style: {
            fontFamily: " Open Sans",
            fontSize: "14px"
          },
          children: menuItems.map(({
            text,
            path,
            icon
          }) => /* @__PURE__ */ jsx(NavLink, {
            to: path,
            style: ({
              isActive
            }) => ({
              textDecoration: "none",
              color: isActive ? "#023047" : "#333",
              backgroundColor: isActive ? "#c8bdff" : "transparent"
            }),
            children: ({
              isActive
            }) => /* @__PURE__ */ jsxs(ListItemButton, {
              selected: location.pathname === path,
              children: [/* @__PURE__ */ jsx(ListItemIcon, {
                sx: {
                  color: isActive ? "#023047" : "#333"
                },
                children: icon
              }), /* @__PURE__ */ jsx(ListItemText, {
                primary: text,
                primaryTypographyProps: {
                  color: isActive ? "#023047" : "#333"
                }
              })]
            })
          }, path))
        })]
      })
    }), /* @__PURE__ */ jsxs(Box$1, {
      component: "main",
      sx: {
        flexGrow: 1,
        backgroundColor: "#f6f8f9",
        minHeight: "100vh"
      },
      children: [/* @__PURE__ */ jsx(Toolbar, {}), /* @__PURE__ */ jsx(Outlet, {})]
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dash_recrut
}, Symbol.toStringTag, { value: "Module" }));
const partIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU8SURBVHgB7VdNbBtFFH6zu84PNLBJBXFAQlMu/ChVNwekICFhS02kHFBtuCAEiiOVqkQhdpE4cbAtDhztlEBbWuTkgALi4EQCtfmB+FYkJLxVCkKA5M2FOhgRVyTUre0d3szabvyTOI0tVQh/0v7M2/l5896b770FaKGFFlr4j6NX84JdS0Cftkknlh10cskLTYQEjaJPCwEBHzCYghw4wWRp3qbe5RA0CQQawSOaBjLE8e0IJHWjKKa+yxRMJQGS0m2EnWm4r7BrAbxWa31SnnT4xSaaAAUaAQNuJbXWp9w/aQdamXtKhwZR5W46voQulDDwGc2kfg4mv/1UhT/0+Zqj7ZoD79ySZe5GOcV7okp+QMhlCk4sukCWo6hgEq8vNte+MrJ/pyJwyK7BVnKhavRW0oAueze+fYB9buKlwoN2F7bn8LoAG/rney3ecW7Nobw8Ppr7/qobx83hXE/jHNdw3t3jmHpXEnRyMVAm5Fbp1Tb3jC+75sE+cXyyAhX5oA5sn8S1zovXWcfFtQComiq8YtdmxHjLEzUUFPy2zGp963r+lKvv9UsuaCI6L61FhYKV4AexVwvvFFUenJpmPvzcK9yK/JovTOTBux/uBXlwQ0ovHaJb771hwG0I1+g5iyeFz+2rVlJRdDBzKp247DCmR2Jlw4g8CqYZLDb7jnsdue0/11NXPwvA/hDB6L/LAty9PAF0kjCapdwwJvBkUCYrKclJF90dBMkWoW8vBY0Ph2cKJ90PzATI5mPFvu09j0F79+OJVPLdGOwH9opwTutplMXwcHJrnSn7xq1IymmrzN3G2aEAKoodSQifESFkLAZ38k7j/IgBzUQelZOQvuwat/AsWlDFNs/5vB3cVcmiovgI0NOY2joyaSPsrhGnhMsehkbA49OuDaDVQqhgVDA2E/E4Vsmtu2acvS2HRQRIx6rEFrmPCnfd0KeK4ifc71NJVgBjvby/pYwb6kBBToviDu4lxxpgSkHuGupbVUsFhMVtq6IaArhZ7EwnVlwgsTR6KMYrJtvIqEsZHN7vWsAk4lAKCs6KxeuBYF8GXmN6yEm9S2lgOU4VxcCnYo4NvZzIZe5OYlEXrpX75QddHhxaqLsUEbEZ4osW3R1D08fqDSy40ypos+gmBeJ4wLiVgpVdqS+qAusKFZih9J39tnYtc6p/pt5SHefilCg2UZMeuOg1Ph5GXiVuIMxDJ1cSPcdeOiGUw/yPivvB7MICw9SawQwNlWrG9PF5LHB1dKOvs+8ZRw8hFCQpgm3kORY0zg6HoQkoKklrfbR9dF2TJaZm3joaEwLOZRVEa4SFlUpx+NcV2AvruIGa9Scd/1rDDarFbCdjhsJAgczJZ9clXHQBB56oHIQVSkhpgzixkUhJKGE/0kARyy1MoIq66OQ3flDa4vi7ERX8DJzrbfxA69ayDIsGAq6dpZgaifPd+nJ3YODWyf4jQmhRjAcsJjgYbsOMYJNHtYqKynRhZhvDA9jN41ccGiB+ZtEZKslPNcGGjKxfqOMyGcslcru0uUNBiwP3wwK7gedsnvJkLDgsprBACDJB3uCvXEFJsUUJYekiC1iV+VbyClbF3GJzWBlTlvqdyEcHXdkvp3S2lfeg/DxuZBE58DQ0iu3kd7hGJ/DKCNeCB+zkoadeeHW77/AGvPbOixiXM1jUGu1KdiSzcCHDh9yloBuChJ2ojGomfhL8ZP76Y1gQOEFOTOoeaBaSegD4/w9nagKR3Pammj3U5jWBOdDFZzJv9jvTYwP3+Ve4AoL4W2ihhf8h/gVH+exXaPbKtwAAAABJRU5ErkJggg==";
const expressIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAV2SURBVHgB7ZhNbBtVEMfnPdv5BLFFQgKpUo04FdLGPiABAhRHDTkgGpsTiIO9oLZECKWcOcRF3NseoJBEsn1FQk4poqiJ4nDiwMEb1Sn0FFdCordaQpAPe3eYebtONrZ3vSEWRGpHWu/Xe/N++3/zZmcN8Mh6YwL+I8sVy9pmCDISQlOAGKWRo3wdAWoChEEghmWaV6dT8SocCvLpWBRM0CBE2xYYUDNq3bpcK5ajIhTKEc7Y7kWEKgisKgAEDYWIuZBW0TR1N2x3SC2mwQDM0FGGtui+e4JAEa7CfSPfqetXN9ZmECFLg2hEtmoBXh80Ia+n4vsejlXeAkiKkEiT0zHlWsjshbdOXbKH8bOnYjFSrajgEGoO1JoDOEq/Y07LKm0Jgq02ux7Prc++PmhmXxvCmjQt/UIqvti8d/dHHP17E+7FU6JtJr78rpyUKC/b4SDyH549rXtCflEsx5aXb5aK336jKbW2Ids2vTz9QNcB0uS0Ru3iDDo0vz6LgNkhCdXPn6wnmlNXvonR/giUaNATFIv3LAtSI28Io3Xsr2/cnkW0shyvYFrxsBegDMnS5OSb2vbOjv7DfDbf8Um2yMkgKUreaLvuBiTo6l87e4BsfRGYpXZRtE+jUsBl4BlwA36/lkbLBrRMK/ER9ZdegBxHCJYnIMcRAZZoUA76AgFm3IBYrye2pvevVGnt9yFVrLYCQt4FaDjtvAGnz8bz4AG4E5aldPpcYEA2EyhseAqBFwZgA9W5L2AbpOSchbYTKcIn/ABp1cZeevnVwIBsHH+iAXEhQSfAcTrPdwNUD9TqSOU1KUu8utxpoBWQtsL01GhgQC/rBtgR0gv0/wL0hOwECmAlewk4vFBJ9wPkM5pZey7kDegL2QrK570EtBDydFgbGaonfnnPG7ArpBuUpuSnXgM2sJ6on/cHDGwMynsGHJyv4OBCZWPgmn3toICq/3zlQWSuHAvaL3AVpOXK2nYjUqJDdn5l89zIJ3AAO4yCMmjDmh6v9Yfr/Apj5xdZ1aB92wA/1fm9v6EKmF5CspW0GDRBVQERALQjoASekaiqsLgU7BXk3RUc7X8cNn4+HpsJCuoJKOidLWBRgQ7AxW5jB4Ks3MKYacEqcBVtwZp76r1AWwH5WiT1vg0IoMMfRgq4DhVUUHdRsyskA0qpqh2NBtWfnxSqePUD7QQYFpFS+MVxLfLOx7qrki+wX1Iz6ccQ7goYghWwbMBmQdA0BqVVn+BV74BSdYPVToDAlRVaev3KB3s+LFqEtkxRPw7pC8gKWnCsE6Ab1K2oH+DW+dP5ltG7fsgpH56AAlYoiT5hOoC8cKjcX6QSSz81IVa5XbmIWv9j6hvIeOV3I+Hk0WggQDaaISWT8IeVXoB0eMw09wDVwiGAZr3JgH3DKpWMUVyJpqKBAe3Rp9QewTextylJFXOSnkyQavrIpCgoQFPBaI6qhqOgevtQ+/zJCaHSCIPSzqDXXpnbA4pFT0D7Iy4DvMLvG6vgY21KvjAhstt/wrOs4G7qgb24dAPSwxROnhF6qw9s1FPOHwBJnzyac/aX4N8aK3hnGR/cWUKsLGOarzHgb0tY5mu/LmPOrz8XIINzlQ0uKFpBhxbWc5F3P0N4JlaEANZxdbOCDdNO3krBM6LQVJA++LjwzXdS0G1cwqFJ8UmKuvMoAyJiJjL+tgGboEMAE50A3cnbPcXC/tei0A3QbayoCEXsCl+lKYpj2vfRInNiuKtJT0ABmWZujAzT/zTC/r4+CCDbfkUPDgitgOtLTgzewkzrfbo3BYcwVrR/7naR61I4oIkmYFNBUixDahXgCJncTd48xdbRA2STIUFZn5K3IEBO3nBUjVcvPLKHwP4BqFHib2qNxzsAAAAASUVORK5CYII=";
const recrutementIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN5SURBVHgB7Zm/b9NAFMe/51QNlF9BoqgSv9J/ABkh1FYdcAYoY5yqYqPpwMCAWv6CJBsb7Y6UMCEBrdMF0apS3KnNQoyExIJUsyEhRECFNCnx8S6paClNHPvMjyEf6XKO79n5+t2952eHISCKxWKKc67RpkZ9ZuROJgc4KqzlPCRRIEmpVIqQwBIJS9NXlVqOmqnASStghqKOPYAkPZCkWq0KEWrDeyMj6Z8DqmYp6KUNNkNC3znW0iz+BWtra9H19XVOLdvKhqljBahjM5BAypPkvThjTPSPWtm8zN7Xa7WaNjS0BL9IrUkSGBF9OBzeaGVTqVREIBnkdQ0+kQ0cW3zQuhxsZUAXIoIJjuOU4RMpkVtbWyK9lElI6qBxsWZpbJI27dHRUQs+kRIZi8WEdzLUNAoeMaVR7ArUSGCBNqMi8iEBQwCQoPQeb9o7fZRa4yKGh4el0k8gIgU7gZEksRfEd/LeKnU5yp02uvwnSE933MhSrjwSpVM1cmZenzBFH1KvJTmY2F92ULdgrZjwie87Ttx4Fg8xZRrNoiKys9um1siZSvhktl793NipIERWY2LMdMAysF7Y8IDnFBQ3nmqJ/MIGCTSaAlmeguQe343qBmeGbmPg8q1FEhVzABrnItKTCnhBeBke8CRyfNGYDrFQgdZIhFHuq3M2OB/Xpxb08VkGZu+37+3r/0ReM0EVELeWLzngOl0MOJSsol5Pdfq7HU93YtFIoVkzWiROz+sJG16hApirmkl3+yxdVJqEwrGWXRN9R56MG4+jrCnQJoGxvK7b8Itllrm1JDxq0lJJQ72huR3SkUiFhQt7BPouFPZCkT9Fn2Uq9Fwrd1eRCWM+SWtQeHJOyoP7aUb4HBPB5+JNV5GMKaKKKX/HlxwCxkFtVniTIn6ynV0H001PgByreX0qkGn+BbE+wUQJF29n1lbkhPGkUbBSjjPhwsftQ/hW74VXaLpfQdwMVC3SyqZtCnqz2R/ZdA7jWE/F1YvF8jmxNuAdkeTpONZ3As3SzpvIt5unwHoY3leP4k9x+uJNbH/9gOMDV7BRen6gjfRztyyHImepnQfqrW2k32D8Dboig6IrMii6IoOiKzIouiKDoqN7NxU3k30PX19tZ8MdFv3tVQNTtOjdlSzanpyr4JAXicbfHi4WTBjsf6zlQniy7XFu5yV+AIisRwqj7t9dAAAAAElFTkSuQmCC";
const developpementIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOfSURBVHgB7Zi/b9NAFMffOSa0JQhLDKzHX4D7F5AMLSCGJvyYSUYQJeEvaPoXtEGAEEvDhIQEbgfU0IKaTowYiQ5MvUoMiAGlpVVLGt/x7tKGtGA7tkxcpH4l25e7s/Pxu3fv3hngPxCBOGSmDQ2SRQEkjwBUVgkAG8s2BzIJdo1B3JCaOfpBKDiCYGIZFCS5gDDZvS73uf1mer+/DjGIg5YD2GmAXW+IrnphXqYa8DLCT2nmJdgHjWe4fYSWriLaGA79sBx6DY6gODRL0gE0ECX5+0hA0tI8pcW3q7T02lQV6AZ4nsNjTP6MHVICgjixBIIvs+mr9u8WIstUlmKFpCXLUIDAG+zBaN6tX2yQbcCUtCAabSvzZw9h4MxnshSfJcXpKRDCgKaTYdO5xuFmDFNVAT+HZTmWEESLixIwqwCfXGF+/fsezOm9dxM4xHkEHO4FUKovkMr/WgMmEH0CB9KElsj0CigVClL9KU8VMd6mgRBTOrnnDTg30PvR78QztGAhCGAoSCNbprtbu0snBsFAj64gQAWrG543cdGA5Bb72wSJXuaIiQv/6lDmdlVZs0/qfXZLQCAYeLUKt2tlCKCs9QLvTaglj8PG7GyuEMiivQ13CMCsNWNomlEkQiUJHavrIsXwUocA8ocMAXgTLecQ3UJAAw/0WV5vgc4SRKxCCLlD7qX46BFlPCaDAHKiL8mtgCNIYTZ3jcn6rGVRCCkdE0yMXYR2V+KaaWBan5ZZM1qx4Ni1ai8Py1rPaduCfO5l7kYeIhJakqwj1lp3JVphDddOHKYd22nndgfUDs5DMkYa4IDNHo+qFCtBkhPy6kCiBBFK797w+InenU+rVYNjENc6T5jEsy2tiK+XF0LIIY40HvY0u5XlnJSFJk6jL9QRMgP6pr1Xp4T+m8cLe5W7XoWI5QvZyZwJrm2cZNjDkXqnbXyx048Q7SJmNh/hH8jfko4+owB90yqZpLb30FHLE5KOL+TVEDed835JAds2jAQI1/baVwpnBjist5IQKSRompwk1V6ylpUf50BtBTy00ToJ4PEibnKFpHcWTPQxColmBWKW+x4nQdJ4bhzcZh6U09qGfsjVkt8/zxv6qbMMPPTl/SN02eDDF1SukJvfPskvXX1IUv11JL8FHdYxZFQ6hoxKnisOJjhpwN2he7vab3fWa6KR4uDTlVvuTwwXrlwhMemt4/dr3+2k7Kf+Xu5l5AcoLxDZxFsMAuoX3lJwow+u68kAAAAASUVORK5CYII=";
const iconMap = {
  Participants: /* @__PURE__ */ jsx("img", { src: partIcon, style: {}, color: "primary" }),
  Express: /* @__PURE__ */ jsx("img", { src: expressIcon, style: {}, color: "primary" }),
  Recrutement: /* @__PURE__ */ jsx("img", { src: recrutementIcon, style: {}, color: "primary" }),
  Développement: /* @__PURE__ */ jsx("img", { src: developpementIcon, style: {}, color: "primary" })
};
function DashStat() {
  const stats = [
    { label: "Participants", value: 736 },
    { label: "Express", value: 1423 },
    { label: "Recrutement", value: 32 },
    { label: "Développement", value: 1035 }
  ];
  return /* @__PURE__ */ jsx("div", { className: "dash-stat-container px-4", children: stats.map((item) => /* @__PURE__ */ jsxs("div", { className: "dash-stat-card", children: [
    /* @__PURE__ */ jsx("div", { className: "icon-wrapper", children: iconMap[item.label] }),
    /* @__PURE__ */ jsx("div", { className: "label", children: item.label }),
    /* @__PURE__ */ jsx("div", { className: "value", children: item.value })
  ] }, item.label)) });
}
const participants$1 = [
  { name: "Marimar Delmar", email: "mirimar001.delmar@gmail.com" },
  { name: "Jessica Vololona", email: "jessolona24.32@gmail.com" },
  { name: "Irina Menlez", email: "iri43menlez@gmail.com" },
  { name: "Tina Rafaly", email: "tinarafaly007@gmail.com" }
];
const campaigns = [
  { company: "TechNova", position: "Chef de projet" },
  { company: "SoftBridge", position: "Data Analyst" },
  { company: "InnoSphere", position: "UI/UX Designer" },
  { company: "BrightFuture", position: "DevOps Engineer" }
];
const ListParticipant = () => {
  const [activeTab, setActiveTab] = useState("participants");
  const [timeFilter, setTimeFilter] = useState("semaine");
  return /* @__PURE__ */ jsxs("section", { className: "participants-section", children: [
    /* @__PURE__ */ jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxs("div", { className: "tabs-left", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `tab ${activeTab === "participants" ? "active" : ""}`,
            onClick: () => setActiveTab("participants"),
            children: "Participants (10)"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `tab ${activeTab === "campaigns" ? "active" : ""}`,
            onClick: () => setActiveTab("campaigns"),
            children: "Campagnes (14)"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          className: "time-filter",
          value: timeFilter,
          onChange: (e) => setTimeFilter(e.target.value),
          children: [
            /* @__PURE__ */ jsx("option", { value: "semaine", children: "Cette semaine" }),
            /* @__PURE__ */ jsx("option", { value: "mois", children: "Ce mois" }),
            /* @__PURE__ */ jsx("option", { value: "annee", children: "Cette année" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "card-list", children: activeTab === "participants" ? participants$1.map((user) => /* @__PURE__ */ jsxs("li", { className: "card", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: `https://i.pravatar.cc/40?u=${user.email}`,
          alt: user.name,
          className: "avatar"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "card-info", children: [
        /* @__PURE__ */ jsx("h4", { style: { fontWeight: 600 }, children: user.name }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "13px", color: "darkgray" }, children: user.email })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "profile-button", children: "Big Five Profile" }),
      /* @__PURE__ */ jsx("span", { className: "job-title", children: "Recrutement Chef de projet" })
    ] }, user.email)) : campaigns.map((c, i) => /* @__PURE__ */ jsxs("li", { className: "card", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: `https://ui-avatars.com/api/?name=${c.company}&background=random`,
          alt: c.company,
          className: "avatar"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "card-info", children: [
        /* @__PURE__ */ jsx("h4", { style: { fontWeight: 600 }, children: c.company }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "13px", color: "darkgray" }, children: c.position })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "job-title", children: "Campagne active" })
    ] }, i)) })
  ] });
};
createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme"
  },
  colorSchemes: {
    light: true,
    dark: true
  }
});
function DemoPageContent() {
  return /* @__PURE__ */ jsx(Box, {
    sx: {
      py: 0,
      backgroundColor: "#f6f8f9",
      fontFamily: "Open Sans"
    },
    children: /* @__PURE__ */ jsxs(Grid, {
      container: true,
      columns: 12,
      sx: {
        marginX: "20px",
        padding: "5px",
        backgroundColor: "#023047",
        backgroundImage: "url(/app/images/back.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        borderRadius: "8px",
        alignItems: "center"
      },
      children: [/* @__PURE__ */ jsx(Grid, {
        sx: {
          gridColumn: "span 9",
          width: "70%",
          padding: "10px"
        },
        children: /* @__PURE__ */ jsx(Typography$1, {
          variant: "h4",
          sx: {
            color: "#fff"
          },
          children: "Hello Zaza !"
        })
      }), /* @__PURE__ */ jsx(Grid, {
        sx: {
          gridColumn: "span 3",
          width: "30%",
          padding: "10px",
          color: "#fff"
        },
        children: /* @__PURE__ */ jsxs(Box, {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          children: [/* @__PURE__ */ jsx("img", {
            src: "/app/images/portfolio.png",
            alt: "portfolio",
            width: "60px",
            style: {
              marginRight: "10px"
            }
          }), /* @__PURE__ */ jsxs(Box, {
            children: [/* @__PURE__ */ jsx(Typography$1, {
              variant: "subtitle2",
              fontWeight: "bold",
              fontSize: 14,
              children: "Suggestion 1/4"
            }), /* @__PURE__ */ jsx(Typography$1, {
              fontSize: 14,
              children: "Pour une meilleure présentation de votre offre, personnalisez en mieux les informations importantes de votre annonce."
            })]
          })]
        })
      })]
    })
  });
}
const DashboardPage = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(DemoPageContent, {}), /* @__PURE__ */ jsx(DashStat, {}), /* @__PURE__ */ jsx(ListParticipant, {})]
  });
};
const dash_content = withComponentProps(DashboardPage);
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dash_content
}, Symbol.toStringTag, { value: "Module" }));
function CustomAppTitle() {
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", alignItems: "center", spacing: 2, children: [
    /* @__PURE__ */ jsx("img", { src: LogoIcon$1, alt: "Logo", width: "30px", height: "30px" }),
    /* @__PURE__ */ jsx(Typography$1, { variant: "h6", className: "logo-title", style: { fontFamily: "Outfit" }, children: "e-tady" })
  ] });
}
function ToolbarActionsSearch() {
  return /* @__PURE__ */ jsx(Stack, { direction: "row", children: /* @__PURE__ */ jsxs(Stack, { direction: "row", className: "notif mt-2 items-center justify-center", spacing: 2, children: [
    /* @__PURE__ */ jsx("div", { className: "retour", children: /* @__PURE__ */ jsx(Tooltip, { title: "Aide", arrow: true, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 22 22", width: "24px", fill: "#1f1f1f", children: [
      /* @__PURE__ */ jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "retour", children: /* @__PURE__ */ jsx(Tooltip, { title: "Mail", arrow: true, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#1f1f1f", children: [
      /* @__PURE__ */ jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "retour", children: /* @__PURE__ */ jsx(Tooltip, { title: "Notifications", arrow: true, children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#1f1f1f", children: [
      /* @__PURE__ */ jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S11.5 3.17 11.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" })
    ] }) }) }),
    /* @__PURE__ */ jsx(Avatar, { alt: "Remy Sharp", src: "/app/images/avatar1.png" })
  ] }) });
}
function NavbarRecrut() {
  return /* @__PURE__ */ jsxs("div", { className: "flex pt-0 border border-gray-200 w-full ", style: { justifyContent: "space-between", padding: "10px", backgroundColor: "white" }, children: [
    /* @__PURE__ */ jsx(CustomAppTitle, {}),
    /* @__PURE__ */ jsx(ToolbarActionsSearch, {})
  ] });
}
const participants = [{
  id: 1,
  name: "Marimar Delmar",
  role: "Administrateur commercial",
  experience: "6 ans d’expérience",
  image: "/app/images/avatar1.png",
  tags: ["tag1", "tag_long", "tag2"],
  globalScore: 94,
  testMatching: 40,
  feedback: 5,
  cvMatching: 70,
  stage: "1/6",
  stepProgress: "Candidature reçue",
  progress: 16
}, {
  id: 2,
  name: "Jessica Vololona",
  role: "Commercial",
  experience: "2 ans d’expérience",
  image: "/app/images/avatar2.png",
  tags: ["tag1", "tag_long", "tag2"],
  globalScore: 68,
  testMatching: 70,
  feedback: 3,
  cvMatching: 10,
  statusColor: "red",
  stage: "2/6",
  stepProgress: "Candidature reçue",
  progress: 32
}, {
  id: 3,
  name: "Marimar Delmar",
  role: "Administrateur commercial",
  experience: "6 ans d’expérience",
  image: "/app/images/avatar1.png",
  tags: ["tag1", "tag_long", "tag2"],
  globalScore: 94,
  testMatching: 40,
  feedback: 5,
  cvMatching: 70,
  stage: "4/6",
  stepProgress: "Présélection",
  progress: 66
}, {
  id: 4,
  name: "Irina Menlez",
  role: "Commercial",
  experience: "3 ans d’expérience",
  image: "/app/images/avatar3.png",
  tags: ["tag1", "tag_long", "tag2"],
  globalScore: 45,
  testMatching: 98,
  feedback: 5,
  cvMatching: 70,
  stage: "6/6",
  stepProgress: "Proposition",
  progress: 100
}];
const DetailOffrePage = () => {
  var _a, _b;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("participants");
  const {
    id
  } = useParams();
  const [offer, setOffer] = useState(null);
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/offer/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        const data = await res.json();
        console.log("Offer data get:", data);
        if (data && data.id) {
          setOffer(data);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'offre :", err);
      }
    };
    if (id) {
      fetchOffer();
    }
  }, [id]);
  const handleRowClick = (id2) => {
    navigate(`/recruteur/candidat/${id2}`);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen w-full font-sans",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "mb-6 bg-white px-4 w-full pt-6 pb-0 border-b border-gray-200",
      children: [/* @__PURE__ */ jsxs("h2", {
        className: "text-xl font-semibold mb-1",
        children: ["Talent matcher / Détail de l'offre", /* @__PURE__ */ jsx("span", {
          className: "ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full",
          children: "Active"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center space-x-6 pb-2 text-sm text-gray-600 mt-2",
        children: [/* @__PURE__ */ jsxs("button", {
          className: `relative font-semibold ${activeTab === "participants" ? "text-purple-600" : "text-gray-500"}`,
          onClick: () => setActiveTab("participants"),
          children: ["Participants", " ", /* @__PURE__ */ jsx("span", {
            className: "ml-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full",
            children: participants.length
          }), activeTab === "participants" && /* @__PURE__ */ jsx("div", {
            className: "absolute -bottom-2 left-0 h-1 w-full bg-purple-600 rounded-t"
          })]
        }), /* @__PURE__ */ jsxs("button", {
          className: `font-semibold ${activeTab === "description" ? "text-purple-600" : "text-gray-500"}`,
          onClick: () => setActiveTab("description"),
          children: ["Description", activeTab === "description" && /* @__PURE__ */ jsx("div", {
            className: " -bottom-2 left-0 h-1 w-full bg-purple-600 rounded-t"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "p-4 contenu",
      children: activeTab === "participants" ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mb-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx("button", {
              className: "bg-white border border-[#e0e0e0] text-sm px-4 py-2 rounded-lg text-gray-700",
              children: "Quick Reporting"
            }), /* @__PURE__ */ jsxs("button", {
              className: "bg-white border border-[#e0e0e0] text-sm px-4 py-2 rounded-lg text-gray-700",
              children: ["Filtres", /* @__PURE__ */ jsx("span", {
                className: "ml-2 bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs",
                children: "5"
              })]
            })]
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            placeholder: "Rechercher un candidat...",
            className: "border border-[#e0e0e0] bg-white px-4 py-2 rounded-md text-sm w-64 focus:ring-1 focus:ring-purple-500"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            className: "w-full table-auto",
            children: [/* @__PURE__ */ jsx("thead", {
              children: /* @__PURE__ */ jsxs("tr", {
                className: "text-center text-sm text-gray-500 mb-2",
                children: [/* @__PURE__ */ jsx("th", {
                  className: "pb-2",
                  children: "Candidat"
                }), /* @__PURE__ */ jsx("th", {
                  className: "pb-2",
                  children: "Score global"
                }), /* @__PURE__ */ jsx("th", {
                  className: "pb-2",
                  children: "Test matching"
                }), /* @__PURE__ */ jsx("th", {
                  className: "pb-2",
                  children: "Feedback"
                }), /* @__PURE__ */ jsx("th", {
                  className: "pb-2",
                  children: "CV matching"
                }), /* @__PURE__ */ jsx("th", {
                  className: "pb-2",
                  children: "Progression"
                })]
              })
            }), /* @__PURE__ */ jsx("tbody", {
              className: "space-y-4",
              children: participants.map((p, index) => /* @__PURE__ */ jsx("tr", {
                children: /* @__PURE__ */ jsx("td", {
                  colSpan: 6,
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "bg-white p-4 rounded-lg shadow-sm flex items-center justify-between",
                    onClick: () => handleRowClick(p.id),
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "flex items-center w-2/5",
                      children: [/* @__PURE__ */ jsx("input", {
                        type: "checkbox",
                        className: "mr-4"
                      }), /* @__PURE__ */ jsx("img", {
                        src: p.image,
                        alt: p.name,
                        className: "w-10 h-10 rounded-full mr-4"
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsx("p", {
                          className: "font-semibold text-sm",
                          children: p.name
                        }), /* @__PURE__ */ jsxs("p", {
                          className: "text-xs text-gray-500",
                          children: [p.role, " · ", p.experience]
                        }), /* @__PURE__ */ jsx("div", {
                          className: "flex gap-1 mt-2 flex-wrap",
                          children: p.tags.map((tag, i) => /* @__PURE__ */ jsx("span", {
                            className: "bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full",
                            children: tag
                          }, i))
                        })]
                      })]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "w-[80px] text-center text-xl font-semibold text-gray-800",
                      children: [p.globalScore, "%"]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "text-center w-[80px] text-sm",
                      children: [p.testMatching, "%"]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "text-center w-[80px] text-sm",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "text-yellow-500 text-xl",
                        children: "★"
                      }), /* @__PURE__ */ jsxs("div", {
                        children: [p.feedback, "/5"]
                      })]
                    }), /* @__PURE__ */ jsx("div", {
                      className: "text-center w-[80px] text-sm",
                      children: /* @__PURE__ */ jsxs("div", {
                        className: `text-sm font-medium ${p.statusColor === "red" ? "text-red-500" : "text-green-600"}`,
                        children: [p.cvMatching, "%"]
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "text-right text-sm w-1/4",
                      children: [/* @__PURE__ */ jsxs("div", {
                        className: "mb-1",
                        children: [p.stage, /* @__PURE__ */ jsx("span", {
                          className: "ml-2 text-gray-600",
                          children: p.stepProgress
                        })]
                      }), /* @__PURE__ */ jsx("div", {
                        className: "w-full bg-gray-200 rounded-full h-2",
                        children: /* @__PURE__ */ jsx("div", {
                          className: "bg-green-500 h-2 rounded-full",
                          style: {
                            width: `${p.progress}%`
                          }
                        })
                      })]
                    })]
                  })
                })
              }, index))
            })]
          })
        })]
      }) : (
        // DESCRIPTION TAB
        /* @__PURE__ */ jsx("div", {
          className: "bg-white p-6 rounded shadow-sm max-w-4xl mx-auto text-sm leading-6 text-gray-700",
          children: offer && /* @__PURE__ */ jsxs("div", {
            className: "bg-white p-6 rounded shadow-sm max-w-5xl mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex flex-row sm:flex-col  justify-between mb-4",
              style: {
                display: "flex",
                flexDirection: "row"
              },
              children: [/* @__PURE__ */ jsxs("h2", {
                className: "text-2xl font-semibold text-gray-800 mb-2",
                children: [offer.title, " "]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-row  items-center justify-between mt-2",
                children: [/* @__PURE__ */ jsxs("button", {
                  className: " ml-2 text-sm  px-4 py-2 rounded-xl",
                  style: {
                    fontSize: "14px",
                    background: "linear-gradient(273.65deg, #7547DA 1.4%, #1B0939 113.96%), linear-gradient(274.98deg, #7547DA 38.27%, #68E1FD 121.18%)",
                    color: "white"
                  },
                  children: [/* @__PURE__ */ jsx(FreeCancellationRoundedIcon, {
                    className: "mr-1"
                  }), "Fermer l'offre"]
                }), /* @__PURE__ */ jsxs("button", {
                  className: " w- 100 ml-2 text-sm  border boder-purple-700  px-2 py-2 rounded-xl",
                  children: [/* @__PURE__ */ jsx(BorderColorRoundedIcon, {
                    className: "mr-1"
                  }), "Modifier l'offre"]
                })]
              })]
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-sm text-gray-500 mb-2",
              children: [(_a = offer.company) == null ? void 0 : _a.name, " · ", offer.location]
            }), /* @__PURE__ */ jsx("div", {
              className: "text-gray-700 leading-relaxed text-sm mb-4 whitespace-pre-line",
              children: offer.description
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-gray-700 leading-relaxed text-sm mb-4 whitespace-pre-line",
              children: [/* @__PURE__ */ jsx("p", {
                children: "Compétences requises"
              }), offer.competences_requises]
            }), /* @__PURE__ */ jsxs(Box$1, {
              children: [/* @__PURE__ */ jsxs(Box$1, {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1
                },
                children: [/* @__PURE__ */ jsx(Typography, {
                  variant: "body2",
                  children: "Télétravail ou présentiel"
                }), /* @__PURE__ */ jsx(Typography, {
                  variant: "body2",
                  children: offer.mode_travail
                })]
              }), /* @__PURE__ */ jsxs(Box$1, {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1
                },
                children: [/* @__PURE__ */ jsx(Typography, {
                  variant: "body2",
                  children: "Type de contrat"
                }), /* @__PURE__ */ jsx(Typography, {
                  variant: "body2",
                  children: offer.type_offre
                })]
              }), /* @__PURE__ */ jsxs(Box$1, {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1
                },
                children: [/* @__PURE__ */ jsx(Typography, {
                  variant: "body2",
                  children: "Fourchette de salaire"
                }), /* @__PURE__ */ jsxs(Typography, {
                  variant: "body2",
                  children: [offer.salaire, " Ar"]
                })]
              }), /* @__PURE__ */ jsxs(Box$1, {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1
                },
                children: [/* @__PURE__ */ jsx(Typography, {
                  variant: "body2",
                  children: "Catégorie"
                }), /* @__PURE__ */ jsx(Typography, {
                  variant: "body2",
                  children: offer.category
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-md font-semibold text-gray-800 mb-2",
                children: "Compétences requises"
              }), /* @__PURE__ */ jsx("div", {
                className: "flex flex-wrap gap-3",
                children: (_b = offer.skills_required) == null ? void 0 : _b.map((skill, index) => /* @__PURE__ */ jsx("span", {
                  className: "bg-[#fff1cc] text-[#c79202] px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition",
                  children: skill.name
                }, skill.id || index))
              }), /* @__PURE__ */ jsxs(Box$1, {
                sx: {
                  mt: 3
                },
                children: [/* @__PURE__ */ jsx(Typography, {
                  variant: "subtitle2",
                  gutterBottom: true,
                  children: "Documents requis"
                }), /* @__PURE__ */ jsx(Box$1, {
                  sx: {
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap"
                  },
                  children: ["CV", "Lettre de motivation", "Profil LinkedIn"].map((doc) => /* @__PURE__ */ jsx("span", {
                    className: "bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs",
                    children: doc
                  }, doc))
                })]
              })]
            })]
          })
        })
      )
    })]
  });
};
const detail_offre = withComponentProps(DetailOffrePage);
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: detail_offre
}, Symbol.toStringTag, { value: "Module" }));
const talent_matcher = withComponentProps(function TalentMatcherPage() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate$1();
  const handleRowClick = (id) => {
    navigate(`/recruteur/detail-de-l-offre/${id}`);
  };
  useEffect(() => {
    const fetchOffers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/offer/my-offers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        const result = response.data;
        if (result.status === "success") {
          console.log("Offers fetched successfully:", result);
          setOffers(result.offers);
        } else {
          console.error("Failed to fetch offers:", result.message);
        }
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-[#f6f8f9] min-h-screen px-10 py-6 font-sans",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between mb-6",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-row gap-4 items-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-semibold",
          children: "Liste de vos campagnes"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/recruteur/ajouter-offre",
          children: /* @__PURE__ */ jsxs("button", {
            className: "flex items-center bg-white border border-[#4d08a1] text-[#4d08a1] px-4 py-1 rounded-full hover:bg-purple-50 text-sm font-medium",
            children: [/* @__PURE__ */ jsxs("span", {
              className: "mr-2 text-lg",
              children: [" ", /* @__PURE__ */ jsx(AddCircleRoundedIcon, {
                sx: {
                  color: "#4d08a1"
                }
              }), " "]
            }), " Ajouter"]
          })
        })]
      }), /* @__PURE__ */ jsx("input", {
        type: "text",
        placeholder: "Rechercher un candidat...",
        className: "border border-[#eeedf0] bg-white px-4 py-2 rounded-md text-sm w-64 focus:ring-1 focus:ring-purple-500"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "overflow-x-auto",
      children: [/* @__PURE__ */ jsx("table", {
        className: "w-full table-auto border-collapse",
        children: /* @__PURE__ */ jsx("thead", {
          children: /* @__PURE__ */ jsxs("tr", {
            className: "text-center text-sm text-gray-500",
            children: [/* @__PURE__ */ jsx("th", {
              className: "py-2 px-4 font-medium",
              children: "Nom de l’offre"
            }), /* @__PURE__ */ jsx("th", {
              className: "py-2 px-4 font-medium",
              children: "Candidats"
            }), /* @__PURE__ */ jsx("th", {
              className: "py-2 px-4 font-medium",
              children: "Localisation"
            }), /* @__PURE__ */ jsx("th", {
              className: "py-2 px-4 font-medium",
              children: "Type"
            }), /* @__PURE__ */ jsx("th", {
              className: "py-2 px-4 font-medium",
              children: "Date"
            }), /* @__PURE__ */ jsx("th", {
              className: "py-2 px-4 font-medium",
              children: "Statut"
            })]
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "space-y-4 mt-4",
        children: offers.map((offer) => /* @__PURE__ */ jsx("div", {
          className: "bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition cursor-pointer",
          onClick: () => handleRowClick(offer.id),
          children: /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-7 gap-4 text-sm text-gray-700 items-center p-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "col-span-2 text-left",
              children: [/* @__PURE__ */ jsx("p", {
                className: "font-semibold",
                children: offer.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-xs text-purple-600",
                children: offer.category
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "text-center",
              children: "100"
            }), /* @__PURE__ */ jsx("div", {
              className: "text-center",
              children: offer.location
            }), /* @__PURE__ */ jsx("div", {
              className: "text-center",
              children: offer.type_offre
            }), /* @__PURE__ */ jsx("div", {
              className: "text-center",
              children: new Date(offer.posted_at).toLocaleDateString()
            }), /* @__PURE__ */ jsx("div", {
              className: "text-center",
              children: /* @__PURE__ */ jsx("span", {
                className: `px-2 py-1 text-xs rounded-full font-medium ${offer.statut_offre ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`,
                children: offer.statut_offre ? "Ouverte" : "Fermée"
              })
            })]
          })
        }, offer.id))
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "mt-6 flex justify-center",
      children: /* @__PURE__ */ jsx("button", {
        className: "bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold px-6 py-2 rounded-full",
        children: "Voir plus"
      })
    })]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: talent_matcher
}, Symbol.toStringTag, { value: "Module" }));
const models = Array.from({
  length: 10
}, (_, i) => ({
  id: i,
  title: "Administration réseaux",
  description: "Métiers: Personnalité et profil professionnel",
  groupAction: i % 2 === 0
}));
const ModelePredictifPage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-[#f6f8f9] min-h-screen p-10 font-sans",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "mb-6",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-xl font-semibold mb-1",
        children: "Modèle prédictif"
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center space-x-6 border-b pb-2 text-sm text-gray-600",
        children: [/* @__PURE__ */ jsxs("button", {
          className: "relative text-purple-600 font-semibold",
          children: ["Mes modèles ", /* @__PURE__ */ jsx("span", {
            className: "ml-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full",
            children: "10"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute -bottom-2 left-0 h-1 w-full bg-purple-600 rounded-t"
          })]
        }), /* @__PURE__ */ jsxs("button", {
          className: "text-gray-500 hover:text-purple-500 transition",
          children: ["Modèles standards ", /* @__PURE__ */ jsx("span", {
            className: "ml-1 text-xs bg-gray-200 px-2 py-0.5 rounded-full",
            children: "14"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex items-center justify-between mb-6",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2",
        children: [/* @__PURE__ */ jsx("button", {
          className: "bg-purple-600 text-white px-4 py-1.5 text-sm rounded-full",
          children: "Liste"
        }), /* @__PURE__ */ jsx("button", {
          className: "bg-gray-100 text-gray-600 px-4 py-1.5 text-sm rounded-full",
          children: "Groupe"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-3",
        children: [/* @__PURE__ */ jsxs("button", {
          className: "flex items-center bg-white border border-purple-500 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 text-sm font-medium",
          children: [/* @__PURE__ */ jsx("span", {
            className: "mr-2 text-lg",
            children: "＋"
          }), " Ajouter"]
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          placeholder: "Rechercher une campagne…",
          className: "border px-4 py-2 rounded-md text-sm w-64 focus:ring-1 focus:ring-purple-500"
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "text-sm text-gray-500 mb-6",
      children: /* @__PURE__ */ jsx("p", {
        children: "Insérez les modèles ci-dessous dans un (des) groupe(s) afin de les utiliser sur la Talent Map ou sur des rapports personnalisés."
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
      children: models.map((model) => /* @__PURE__ */ jsxs("div", {
        className: "bg-white p-4 rounded-lg shadow-sm",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mb-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "bg-purple-100 w-8 h-8 rounded flex items-center justify-center text-purple-600 text-lg",
              children: "📁"
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "font-semibold text-sm",
                children: model.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-xs text-gray-500",
                children: model.description
              })]
            })]
          }), /* @__PURE__ */ jsx("button", {
            className: "text-gray-400 hover:text-gray-600 text-xl",
            children: "⋮"
          })]
        }), model.groupAction && /* @__PURE__ */ jsx("button", {
          className: "flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full mb-3",
          children: "➕ Ajouter à un groupe"
        }), /* @__PURE__ */ jsx("button", {
          className: "w-full text-sm text-purple-600 border border-purple-200 px-4 py-2 rounded-full font-medium hover:bg-purple-50",
          children: "📄 Afficher les compétences"
        })]
      }, model.id))
    })]
  });
};
const modele_predictif = withComponentProps(ModelePredictifPage);
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: modele_predictif
}, Symbol.toStringTag, { value: "Module" }));
const initialEvaluations = [{
  id: "bfs",
  title: "BFS",
  credit: 25,
  isSelected: true
}, {
  id: "competences2",
  title: "Profil Compétences 2",
  credit: 30,
  isSelected: true
}, {
  id: "ctpir",
  title: "CTPI-R",
  credit: 45,
  isSelected: true
}, {
  id: "entrepreneur",
  title: "Test entrepreneur",
  credit: 20,
  isSelected: true
}, {
  id: "pro2",
  title: "Profil pro 2",
  credit: 40,
  isSelected: false,
  premium: true
}, {
  id: "etix",
  title: "ETIX",
  credit: 30,
  isSelected: false,
  premium: true
}, {
  id: "culture",
  title: "Test de culture générale",
  credit: 30,
  isSelected: false
}, {
  id: "work_old",
  title: "Work profile old",
  credit: 30,
  isSelected: false,
  premium: true
}];
const EvaluationPage = () => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [proctoring, setProctoring] = useState(false);
  const toggleSelect = (id) => {
    setEvaluations((prev) => prev.map((e) => e.id === id ? {
      ...e,
      isSelected: !e.isSelected
    } : e));
  };
  const selected = evaluations.filter((e) => e.isSelected);
  const totalCredits = selected.reduce((acc, curr) => acc + curr.credit, 0);
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-[#f6f8f9] min-h-screen p-10 font-sans",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "text-xl font-semibold mb-6",
      children: "Ajouter des évaluations"
    }), /* @__PURE__ */ jsx("div", {
      className: "flex flex-wrap gap-3 mb-8",
      children: ["Tous", "Personnalité et profil professionnel", "Intérêts et motivations", "Aptitudes commerciales", "Raisonnement et pensée critique", "Intelligence émotionnelle et gestion du stress", "Connaissances métiers", "MyLab", "Smart interview", "Informatique et Technique"].map((cat) => /* @__PURE__ */ jsx("button", {
        className: "px-4 py-1 rounded-full text-sm bg-purple-100 text-purple-700",
        children: cat
      }, cat))
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
      children: [/* @__PURE__ */ jsx("div", {
        className: "lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4",
        children: evaluations.map((evalItem) => /* @__PURE__ */ jsxs("div", {
          className: "bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between mb-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-10 h-10 bg-purple-100 rounded-md"
            }), /* @__PURE__ */ jsxs("span", {
              className: "text-sm font-semibold text-gray-700",
              children: [evalItem.credit, " ", /* @__PURE__ */ jsx("span", {
                className: "text-xs",
                children: "Crédit"
              })]
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm font-semibold mb-1",
            children: evalItem.title
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between mt-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center text-xs text-gray-500 gap-1",
              children: ["🇫🇷 ", /* @__PURE__ */ jsx("span", {
                children: "Language"
              })]
            }), /* @__PURE__ */ jsx("button", {
              onClick: () => toggleSelect(evalItem.id),
              className: `w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-semibold ${evalItem.isSelected ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`,
              children: evalItem.isSelected ? "✓" : "+"
            })]
          })]
        }, evalItem.id))
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white p-6 rounded-lg shadow-sm w-full lg:w-80",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-4",
          children: [/* @__PURE__ */ jsxs("h3", {
            className: "text-sm font-medium mb-2",
            children: ["News ", /* @__PURE__ */ jsx("span", {
              className: "text-xs text-gray-500",
              children: selected.length
            })]
          }), /* @__PURE__ */ jsx("ul", {
            className: "text-sm text-gray-700 space-y-1",
            children: selected.map((e, i) => /* @__PURE__ */ jsxs("li", {
              className: "flex justify-between",
              children: [/* @__PURE__ */ jsxs("span", {
                children: [i + 1, ". ", e.title]
              }), /* @__PURE__ */ jsxs("span", {
                children: [e.credit, /* @__PURE__ */ jsx("span", {
                  className: "text-xs ml-1",
                  children: "crédit"
                })]
              })]
            }, e.id))
          }), /* @__PURE__ */ jsx("div", {
            className: "border-t border-dashed my-3"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex justify-between font-semibold",
            children: [/* @__PURE__ */ jsx("span", {
              children: "Total"
            }), /* @__PURE__ */ jsxs("span", {
              children: [totalCredits, " ", /* @__PURE__ */ jsx("span", {
                className: "text-xs font-normal",
                children: "crédit"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-sm space-y-3",
          children: [/* @__PURE__ */ jsxs("label", {
            className: "flex items-center justify-between cursor-pointer",
            children: [/* @__PURE__ */ jsx("span", {
              className: "flex items-center gap-2",
              children: "🛡️ Activer le proctoring"
            }), /* @__PURE__ */ jsx("input", {
              type: "checkbox",
              checked: proctoring,
              onChange: () => setProctoring(!proctoring),
              className: "toggle toggle-sm"
            })]
          }), /* @__PURE__ */ jsx("button", {
            className: "w-full text-left text-gray-700 hover:text-purple-600 flex items-center gap-2",
            children: "⚙️ Paramétrer l’envoi"
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => setEvaluations((prev) => prev.map((e) => ({
              ...e,
              isSelected: false
            }))),
            className: "w-full text-left text-red-500 hover:text-red-700 flex items-center gap-2",
            children: "🗑️ Enlever tout"
          })]
        }), /* @__PURE__ */ jsx("button", {
          className: "mt-6 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 rounded-full text-sm font-semibold shadow hover:from-purple-700 hover:to-purple-800",
          children: "📤 Envoyer"
        })]
      })]
    })]
  });
};
const evaluation = withComponentProps(EvaluationPage);
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: evaluation
}, Symbol.toStringTag, { value: "Module" }));
const CandidateProfilePage = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-[#f6f8f9] min-h-screen font-sans  pb-6 pt-0",
    children: [/* @__PURE__ */ jsx(NavbarRecrut, {}), /* @__PURE__ */ jsxs(Link, {
      to: "/",
      className: "text-md font-light mb-1 ml-50 my-4",
      children: [" ← Talent matcher / detail de l'offre / Profil de Rasoa ", /* @__PURE__ */ jsx("span", {
        className: "ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full",
        children: "Active"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-white rounded-lg p-6 shadow-sm mb-6 mx-50 mt-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-4",
          children: [/* @__PURE__ */ jsx("img", {
            src: `https://i.pravatar.cc/40?u=7`,
            alt: "Irina Menlez",
            className: "w-20 h-20 rounded-full"
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-semibold",
              children: "Irina Menlez"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-500",
              children: "irina.menlez@gmail.com"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xs bg-gray-200 px-2 py-0.5 rounded-full mt-1 inline-block",
              children: "Candidature reçue"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-4",
          children: [/* @__PURE__ */ jsx("button", {
            className: "bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium",
            children: "Ajouter dans une campagne"
          }), /* @__PURE__ */ jsx("button", {
            className: "bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium",
            children: "📩 Inviter"
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-6 flex gap-6 text-sm text-gray-600 border-b",
        children: ["Aperçu", "Insight", "Résultats", "Évaluation", "Talent map"].map((tab, i) => /* @__PURE__ */ jsx("button", {
          className: `pb-2 ${i === 0 ? "text-purple-700 font-semibold border-b-2 border-purple-700" : ""}`,
          children: tab
        }, i))
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 mx-50",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "bg-green-100 text-green-800 p-4 rounded-lg text-center",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-sm font-semibold mb-1",
          children: "Talent matching"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-2xl font-bold",
          children: "98%"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xs",
          children: "Commercial Grand compte"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white p-4 rounded-lg text-center shadow-sm",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-sm font-semibold text-gray-600 mb-1",
          children: "Score global"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-2xl font-bold",
          children: "45%"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white p-4 rounded-lg text-center shadow-sm",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-sm font-semibold text-gray-600 mb-1",
          children: "Feedback"
        }), /* @__PURE__ */ jsx("div", {
          className: "flex justify-center",
          children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, {
            className: "text-yellow-400"
          }, i))
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm mt-1",
          children: "5/5"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white p-4 rounded-lg text-center shadow-sm",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-sm font-semibold text-gray-600 mb-1",
          children: "CV Matching"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-2xl font-bold text-green-600",
          children: "70%"
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-white p-6 rounded-lg shadow-sm mb-6 mx-50",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-4",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-md font-semibold",
          children: "Curriculum Vitae"
        }), /* @__PURE__ */ jsxs("button", {
          className: "flex items-center bg-purple-600 text-white px-4 py-2 rounded-full",
          children: [/* @__PURE__ */ jsx(CloudDownload, {
            className: "mr-2"
          }), " Télécharger"]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex gap-4 text-sm font-medium text-gray-500 border-b mb-4",
        children: ["Tout", "Expériences", "Formations", "Certifications", "Langues"].map((label, i) => /* @__PURE__ */ jsx("button", {
          className: `pb-2 ${i === 0 ? "text-purple-600 border-b-2 border-purple-600" : ""}`,
          children: label
        }, i))
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h4", {
          className: "text-sm font-bold mb-2",
          children: "Expériences"
        }), /* @__PURE__ */ jsxs("ul", {
          className: "text-sm space-y-4",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-semibold",
              children: "International Key Manager"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "Paris, France · CapsuleSoft · Juin 2013 - aujourd’hui"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 mt-1",
              children: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
            })]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-semibold",
              children: "MachetePix"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "Paris · Commerciale Grand compte · Septembre 2010 - Juin 2013"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 mt-1",
              children: "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-6",
        children: [/* @__PURE__ */ jsx("h4", {
          className: "text-sm font-bold mb-2",
          children: "Formations"
        }), /* @__PURE__ */ jsxs("ul", {
          className: "text-sm space-y-3",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-semibold",
              children: "Université des Elites"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "Master 2 en Marketing – Paris, France"
            })]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-semibold",
              children: "California Institute of the Arts"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "Graphic Design Specialization – Paris, France"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-6",
        children: [/* @__PURE__ */ jsx("h4", {
          className: "text-sm font-bold mb-2",
          children: "Certifications"
        }), /* @__PURE__ */ jsx("ul", {
          className: "text-sm space-y-3",
          children: /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-semibold",
              children: "Canvas - Communication and Children"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "Graphic Design Specialization – Juin 2013 - aujourd’hui"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-6",
        children: [/* @__PURE__ */ jsx("h4", {
          className: "text-sm font-bold mb-2",
          children: "Langues"
        }), /* @__PURE__ */ jsx("ul", {
          className: "flex gap-4 text-sm",
          children: ["Français", "Espagnol", "Mandarin"].map((lang) => /* @__PURE__ */ jsx("li", {
            className: "bg-gray-100 text-gray-700 px-3 py-1 rounded-full",
            children: lang
          }, lang))
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-white p-6 rounded-lg shadow-sm mb-6",
      children: [/* @__PURE__ */ jsx("h4", {
        className: "text-sm font-bold mb-4",
        children: "Documents attachés"
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex gap-3 text-sm",
        children: [/* @__PURE__ */ jsx("span", {
          className: "bg-gray-100 text-gray-700 px-3 py-1 rounded-full",
          children: "📎 Lettre de motivation"
        }), /* @__PURE__ */ jsx("span", {
          className: "bg-gray-100 text-gray-700 px-3 py-1 rounded-full",
          children: "📎 Autre document"
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-white p-6 rounded-lg shadow-sm mb-6",
      children: [/* @__PURE__ */ jsx("h4", {
        className: "text-sm font-bold mb-4",
        children: "Questions préliminaires"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-sm font-medium mb-2",
        children: "Avez-vous un permis de conduire ?"
      }), /* @__PURE__ */ jsx("span", {
        className: "inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm",
        children: "Oui"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "bg-white p-6 rounded-lg shadow-sm",
      children: [/* @__PURE__ */ jsx("h4", {
        className: "text-sm font-bold mb-4",
        children: "Activités"
      }), /* @__PURE__ */ jsxs("ul", {
        className: "space-y-3 text-sm text-gray-700",
        children: [/* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "19.05.2022 – 08:43:"
          }), " White Houzz rejoint l’entreprise."]
        }), /* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "19.05.2022 – 08:43:"
          }), " Sonya Hajj a déplacé la candidate Maria Delmar..."]
        }), /* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "19.05.2022 – 08:43:"
          }), " Rannoyer Clui a envoyé un message à Maria Delmar."]
        }), /* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "01.01.2022 – 08:43:"
          }), " Marte Altz est invitée à prendre AVATAR."]
        }), /* @__PURE__ */ jsxs("li", {
          children: [/* @__PURE__ */ jsx("strong", {
            children: "01.01.2022 – 08:43:"
          }), " Sonya Hajj a donné un retour sur Monome."]
        })]
      })]
    })]
  });
};
const profil_candidat = withComponentProps(CandidateProfilePage);
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profil_candidat
}, Symbol.toStringTag, { value: "Module" }));
const contractTypes = ["CDI", "CDD", "Stage", "Temporaire", "Prestataire", "Autre"];
const workModes = ["100% Télétravail", "Télétravail et présentiel", "100% Présentiel"];
const CreateOfferPage = () => {
  const [generateOffer, setGenerateOffer] = useState(true);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [competences, setCompetences] = useState("");
  const [workMode, setWorkMode] = useState(workModes[0]);
  const [contract, setContract] = useState(contractTypes[0]);
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [positions, setPositions] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("France");
  const [customForm, setCustomForm] = useState(false);
  const [preliminaryQuestions, setPreliminaryQuestions] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      location,
      statut_offre: generateOffer,
      category: positions,
      type_offre: contract,
      competences_requises: competences,
      salaire: `${salaryFrom} - ${salaryTo}`,
      mode_travail: workMode,
      skills: selectedSkills.map((skill) => skill.id)
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:5000/offer", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
          // 🔑 token JWT récupéré après login
        }
      });
      alert("Offre créée avec succès !");
      console.log(response.data.offer);
    } catch (error) {
      if (error.response) {
        alert(`Erreur: ${error.response.data.error}`);
        console.error(error.response.data);
      } else {
        alert("Erreur réseau ou serveur.");
        console.error(error);
      }
    }
  };
  useEffect(() => {
    axios.get("http://localhost:5000/skills", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        // adapte selon ton auth
      }
    }).then((res) => {
      if (Array.isArray(res.data)) {
        setSkills(res.data);
      }
    }).catch((err) => {
      console.error("Erreur récupération skills:", err);
    });
  }, []);
  return /* @__PURE__ */ jsxs(Box$1, {
    sx: {
      backgroundColor: "#f6f8f9",
      minHeight: "100vh",
      marginTop: "0px",
      fontFamily: "Open Sans"
    },
    children: [/* @__PURE__ */ jsx(NavbarRecrut, {}), /* @__PURE__ */ jsxs("h2", {
      className: "text-xl font-semibold mb-1 ml-6 mt-6",
      children: ["Talent matcher / ajouter un nouvel offre ", /* @__PURE__ */ jsx("span", {
        className: "ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full",
        children: "Active"
      })]
    }), /* @__PURE__ */ jsxs(Grid, {
      container: true,
      spacing: 0,
      sx: {
        mt: 6,
        px: 2,
        width: "100%",
        sm: {
          display: "flex",
          flexDirection: "column"
        }
      },
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-white rounded-lg shadow-md p-0 ",
        style: {
          marginRight: "1px",
          width: "50%",
          minWidth: "48%"
        },
        children: /* @__PURE__ */ jsxs(Box$1, {
          sx: {
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 4
          },
          children: [/* @__PURE__ */ jsxs(Box$1, {
            sx: {
              display: "flex",
              justifyContent: "space-between",
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "h6",
              children: "Créer une nouvelle offre"
            }), /* @__PURE__ */ jsx(FormControlLabel, {
              control: /* @__PURE__ */ jsx(Switch, {
                checked: generateOffer,
                onChange: () => setGenerateOffer(!generateOffer),
                color: "primary"
              }),
              label: "Générer offre"
            })]
          }), /* @__PURE__ */ jsx(TextField, {
            fullWidth: true,
            label: "Titre du projet",
            variant: "outlined",
            size: "small",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            sx: {
              mb: 2
            },
            InputProps: {
              startAdornment: /* @__PURE__ */ jsx(WorkOutline, {
                sx: {
                  mr: 1
                }
              })
            }
          }), /* @__PURE__ */ jsx(Grid, {
            xs: 4,
            children: /* @__PURE__ */ jsx(TextField, {
              label: "Catégorie",
              type: "text",
              fullWidth: true,
              size: "small",
              value: positions,
              onChange: (e) => setPositions(e.target.value),
              InputProps: {
                startAdornment: /* @__PURE__ */ jsx(People, {
                  sx: {
                    mr: 1
                  }
                })
              }
            })
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "subtitle1",
              gutterBottom: true,
              children: "Compétences (skills)"
            }), /* @__PURE__ */ jsx(Autocomplete, {
              multiple: true,
              options: skills,
              getOptionLabel: (option) => option.name,
              value: selectedSkills,
              onChange: (event, newValue) => setSelectedSkills(newValue),
              renderTags: (value, getTagProps) => value.map((option, index) => /* @__PURE__ */ jsx(Chip$1, {
                label: option.name,
                ...getTagProps({
                  index
                }),
                sx: {
                  border: "1px solid #4d08a1",
                  color: "#4d08a1",
                  backgroundColor: "#f7f1ff"
                }
              })),
              renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
                ...params,
                fullWidth: true,
                variant: "outlined",
                size: "small",
                label: "Skills Tags",
                InputProps: {
                  ...params.InputProps,
                  startAdornment: /* @__PURE__ */ jsxs(Fragment, {
                    children: [/* @__PURE__ */ jsx(DescriptionIcon, {
                      sx: {
                        mr: 1
                      }
                    }), params.InputProps.startAdornment]
                  })
                }
              })
            })]
          }), /* @__PURE__ */ jsx(TextField, {
            fullWidth: true,
            label: "Description du projet",
            variant: "outlined",
            size: "small",
            multiline: true,
            rows: 4,
            value: description,
            onChange: (e) => setDescription(e.target.value),
            sx: {
              mb: 2
            }
          }), /* @__PURE__ */ jsx(TextField, {
            fullWidth: true,
            label: "Compétences requises",
            variant: "outlined",
            size: "small",
            multiline: true,
            rows: 4,
            value: competences,
            onChange: (e) => setCompetences(e.target.value),
            sx: {
              mb: 2
            }
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "subtitle1",
              gutterBottom: true,
              children: "Télétravail ou présentiel"
            }), /* @__PURE__ */ jsx(Box$1, {
              sx: {
                display: "flex",
                gap: 1
              },
              children: workModes.map((mode) => {
                const isActive = workMode === mode;
                return /* @__PURE__ */ jsx(Button, {
                  variant: isActive ? "contained" : "outlined",
                  onClick: () => setWorkMode(mode),
                  sx: {
                    bgcolor: isActive ? "#6531ad" : "transparent",
                    color: isActive ? "#fff" : "#6531ad",
                    borderColor: "#6531ad",
                    "&:hover": {
                      bgcolor: isActive ? "#3a067e" : "#f3eaff",
                      // un hover plus doux
                      borderColor: "#6531ad",
                      color: "#6531ad"
                    }
                  },
                  children: mode
                }, mode);
              })
            })]
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "subtitle1",
              gutterBottom: true,
              children: "Type de contrat"
            }), /* @__PURE__ */ jsx(Box$1, {
              sx: {
                display: "flex",
                flexWrap: "wrap",
                gap: 1
              },
              children: contractTypes.map((type) => {
                const isActive = contract === type;
                return /* @__PURE__ */ jsx(Button, {
                  variant: isActive ? "contained" : "outlined",
                  onClick: () => setContract(type),
                  sx: {
                    bgcolor: isActive ? "#6531ad" : "transparent",
                    color: isActive ? "#fff" : "#6531ad",
                    borderColor: "#6531ad",
                    "&:hover": {
                      bgcolor: isActive ? "#3a067e" : "#f3eaff",
                      borderColor: "#6531ad",
                      color: "#6531ad"
                    }
                  },
                  children: type
                }, type);
              })
            })]
          }), /* @__PURE__ */ jsxs(Grid, {
            container: true,
            spacing: 2,
            sx: {
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(Grid, {
              xs: 4,
              children: /* @__PURE__ */ jsx(TextField, {
                label: "Salaire min",
                type: "number",
                fullWidth: true,
                size: "small",
                value: salaryFrom,
                onChange: (e) => setSalaryFrom(e.target.value),
                InputProps: {
                  startAdornment: /* @__PURE__ */ jsx(AttachMoney, {
                    sx: {
                      mr: 1
                    }
                  })
                }
              })
            }), /* @__PURE__ */ jsx(Grid, {
              xs: 4,
              children: /* @__PURE__ */ jsx(TextField, {
                label: "Salaire max",
                type: "number",
                fullWidth: true,
                size: "small",
                value: salaryTo,
                onChange: (e) => setSalaryTo(e.target.value),
                InputProps: {
                  startAdornment: /* @__PURE__ */ jsx(AttachMoney, {
                    sx: {
                      mr: 1
                    }
                  })
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Grid, {
            container: true,
            spacing: 2,
            sx: {
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(Grid, {
              xs: 6,
              children: /* @__PURE__ */ jsxs(TextField, {
                label: "Pays",
                select: true,
                fullWidth: true,
                size: "small",
                value: country,
                onChange: (e) => setCountry(e.target.value),
                children: [/* @__PURE__ */ jsx(MenuItem, {
                  value: "France",
                  children: "France"
                }), /* @__PURE__ */ jsx(MenuItem, {
                  value: "Madagascar",
                  children: "Madagascar"
                })]
              })
            }), /* @__PURE__ */ jsx(Grid, {
              xs: 6,
              children: /* @__PURE__ */ jsx(TextField, {
                label: "Ville",
                fullWidth: true,
                size: "small",
                value: location,
                onChange: (e) => setLocation(e.target.value),
                InputProps: {
                  startAdornment: /* @__PURE__ */ jsx(LocationOn, {
                    sx: {
                      mr: 1
                    }
                  })
                }
              })
            })]
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(FormControlLabel, {
              control: /* @__PURE__ */ jsx(Checkbox, {
                checked: customForm,
                onChange: () => setCustomForm(!customForm)
              }),
              label: "Personnaliser le formulaire"
            }), /* @__PURE__ */ jsx(FormControlLabel, {
              control: /* @__PURE__ */ jsx(Checkbox, {
                checked: preliminaryQuestions,
                onChange: () => setPreliminaryQuestions(!preliminaryQuestions)
              }),
              label: "Questions préliminaires"
            })]
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              display: "flex",
              justifyContent: "flex-end",
              gap: 2
            },
            children: [/* @__PURE__ */ jsx(Button, {
              variant: "text",
              children: "Annuler"
            }), /* @__PURE__ */ jsx(Button, {
              variant: "contained",
              color: "primary",
              onClick: handleSubmit,
              children: "Valider"
            })]
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-white rounded-lg shadow-md p-4 w-1/2 ",
        style: {
          marginLeft: "20px",
          width: "48%",
          minWidth: "48%",
          height: "fit-content"
        },
        children: /* @__PURE__ */ jsxs(Box$1, {
          sx: {
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 4
          },
          children: [/* @__PURE__ */ jsx(Typography, {
            variant: "h6",
            gutterBottom: true,
            children: "Aperçu"
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              backgroundColor: "#f0f0f0",
              borderRadius: 1,
              p: 2,
              mb: 2
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "subtitle1",
              children: "Développement Informatique"
            }), /* @__PURE__ */ jsx(Typography, {
              variant: "caption",
              color: "textSecondary",
              children: "Publié le August 7, 2023"
            })]
          }), /* @__PURE__ */ jsxs(Typography, {
            variant: "body2",
            color: "textSecondary",
            children: [/* @__PURE__ */ jsx(LocationOn, {
              sx: {
                mr: 1
              }
            }), " ", location, ", ", country]
          }), /* @__PURE__ */ jsx(Box$1, {
            sx: {
              display: "flex",
              gap: 1,
              my: 1,
              flexWrap: "wrap"
            },
            children: selectedSkills.map((skill, index) => /* @__PURE__ */ jsx("span", {
              className: "bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full",
              children: skill.name
            }, index))
          }), /* @__PURE__ */ jsx(Typography, {
            variant: "body1",
            sx: {
              mb: 2
            },
            children: description || "Description du projet à venir."
          }), /* @__PURE__ */ jsxs(Box$1, {
            children: [/* @__PURE__ */ jsxs(Box$1, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                py: 1
              },
              children: [/* @__PURE__ */ jsx(Typography, {
                variant: "body2",
                children: "Télétravail ou présentiel"
              }), /* @__PURE__ */ jsx(Typography, {
                variant: "body2",
                children: workMode
              })]
            }), /* @__PURE__ */ jsxs(Box$1, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                py: 1
              },
              children: [/* @__PURE__ */ jsx(Typography, {
                variant: "body2",
                children: "Type de contrat"
              }), /* @__PURE__ */ jsx(Typography, {
                variant: "body2",
                children: contract
              })]
            }), /* @__PURE__ */ jsxs(Box$1, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                py: 1
              },
              children: [/* @__PURE__ */ jsx(Typography, {
                variant: "body2",
                children: "Fourchette de salaire"
              }), /* @__PURE__ */ jsxs(Typography, {
                variant: "body2",
                children: [salaryFrom, "€ - ", salaryTo, "€"]
              })]
            }), /* @__PURE__ */ jsxs(Box$1, {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                py: 1
              },
              children: [/* @__PURE__ */ jsx(Typography, {
                variant: "body2",
                children: "Catégorie"
              }), /* @__PURE__ */ jsx(Typography, {
                variant: "body2",
                children: positions
              })]
            })]
          }), /* @__PURE__ */ jsxs(Box$1, {
            sx: {
              mt: 3
            },
            children: [/* @__PURE__ */ jsx(Typography, {
              variant: "subtitle2",
              gutterBottom: true,
              children: "Documents requis"
            }), /* @__PURE__ */ jsx(Box$1, {
              sx: {
                display: "flex",
                gap: 1,
                flexWrap: "wrap"
              },
              children: ["CV", "Lettre de motivation", "Profil LinkedIn"].map((doc) => /* @__PURE__ */ jsx("span", {
                className: "bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs",
                children: doc
              }, doc))
            })]
          })]
        })
      })]
    })]
  });
};
const ajouter_offre = withComponentProps(CreateOfferPage);
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ajouter_offre
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CzQWJRo3.js", "imports": ["/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/index-CNVCymyq.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-D2XS0ib6.js", "imports": ["/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/index-CNVCymyq.js", "/assets/with-props-CxWoRmkF.js"], "css": ["/assets/root-CDnrHn0_.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Bno3MDt-.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/logo-icon2-3sguuZSz.js", "/assets/Typography-Dl5m69Yi.js", "/assets/bg3-Dtz_PR9_.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "auth/sign-in/SignIn": { "id": "auth/sign-in/SignIn", "parentId": "root", "path": "auth/signin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/SignIn-CQjbIm14.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/signstyle-DeWqp0up.js", "/assets/TextField-Bo1Kcyhs.js", "/assets/VisibilityOff-C9ooRaCa.js", "/assets/IconButton-CDJmrjB7.js", "/assets/FormControlLabel-DmP69yjm.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/Popover-ehDyiyj2.js", "/assets/Menu-CfqzC8Vj.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/isMuiElement-bxpgwgQD.js", "/assets/Typography-Dl5m69Yi.js", "/assets/ButtonBase-AlovMshM.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/CircularProgress-jWFtDqlA.js"], "css": ["/assets/signstyle-D7PGk5L6.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "auth/sign-up/SignUp": { "id": "auth/sign-up/SignUp", "parentId": "root", "path": "auth/signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/SignUp-QzLW3hb_.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/signstyle-DeWqp0up.js", "/assets/TextField-Bo1Kcyhs.js", "/assets/VisibilityOff-C9ooRaCa.js", "/assets/IconButton-CDJmrjB7.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/Popover-ehDyiyj2.js", "/assets/Menu-CfqzC8Vj.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/isMuiElement-bxpgwgQD.js", "/assets/Typography-Dl5m69Yi.js", "/assets/ButtonBase-AlovMshM.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/CircularProgress-jWFtDqlA.js"], "css": ["/assets/signstyle-D7PGk5L6.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "auth/sign-up/SignUpRecrut": { "id": "auth/sign-up/SignUpRecrut", "parentId": "root", "path": "auth/recruteur/signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/SignUpRecrut-Cduwc5fA.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/signstyle-DeWqp0up.js", "/assets/TextField-Bo1Kcyhs.js", "/assets/VisibilityOff-C9ooRaCa.js", "/assets/IconButton-CDJmrjB7.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/Popover-ehDyiyj2.js", "/assets/Menu-CfqzC8Vj.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/isMuiElement-bxpgwgQD.js", "/assets/Typography-Dl5m69Yi.js", "/assets/ButtonBase-AlovMshM.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/CircularProgress-jWFtDqlA.js"], "css": ["/assets/signstyle-D7PGk5L6.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "auth/forgotmdp/forgotmdp": { "id": "auth/forgotmdp/forgotmdp", "parentId": "root", "path": "auth/forgotmdp", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/forgotmdp-BBAXUgHb.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/signstyle-DeWqp0up.js", "/assets/TextField-Bo1Kcyhs.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/Popover-ehDyiyj2.js", "/assets/Menu-CfqzC8Vj.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/isMuiElement-bxpgwgQD.js"], "css": ["/assets/signstyle-D7PGk5L6.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employe/dashboard": { "id": "employe/dashboard", "parentId": "root", "path": "employe/dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-BLRR5xss.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/RuleRounded-BolkDSnp.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/useThemeProps-4GIH6D68.js", "/assets/useTheme-BGXANyoT.js", "/assets/Popover-ehDyiyj2.js", "/assets/Chip-Dsjwbnz0.js", "/assets/IconButton-CDJmrjB7.js", "/assets/Button-BcTfHBKO.js", "/assets/listItemTextClasses-CxOMZ5Ha.js", "/assets/isMuiElement-bxpgwgQD.js", "/assets/Box-B5QIj5Xy.js", "/assets/Stack-DJ672RKg.js", "/assets/Typography-Dl5m69Yi.js", "/assets/Grid-D586BZFi.js", "/assets/ButtonBase-AlovMshM.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/index-CNVCymyq.js", "/assets/CircularProgress-jWFtDqlA.js"], "css": ["/assets/dashboard-C72pszPT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employe/accueil": { "id": "employe/accueil", "parentId": "root", "path": "employe/accueil", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/accueil-BI1L_XI6.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/bg3-Dtz_PR9_.js", "/assets/navbar-cli-CwZoKeuF.js", "/assets/index-xsH4HHeE.js", "/assets/logo-icon2-3sguuZSz.js", "/assets/Stack-DJ672RKg.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/useThemeProps-4GIH6D68.js", "/assets/Typography-Dl5m69Yi.js", "/assets/Menu-CfqzC8Vj.js", "/assets/Popover-ehDyiyj2.js", "/assets/MenuItem-DE46lkXZ.js", "/assets/ButtonBase-AlovMshM.js", "/assets/listItemTextClasses-CxOMZ5Ha.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employe/job_detail": { "id": "employe/job_detail", "parentId": "root", "path": "employe/accueil/jobDetail/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/job_detail-BlDtVVh8.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/navbar-cli-CwZoKeuF.js", "/assets/Box-B5QIj5Xy.js", "/assets/Typography-Dl5m69Yi.js", "/assets/Button-BcTfHBKO.js", "/assets/Stack-DJ672RKg.js", "/assets/Grid-D586BZFi.js", "/assets/Popover-ehDyiyj2.js", "/assets/logo-icon2-3sguuZSz.js", "/assets/Menu-CfqzC8Vj.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/MenuItem-DE46lkXZ.js", "/assets/ButtonBase-AlovMshM.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/listItemTextClasses-CxOMZ5Ha.js", "/assets/CircularProgress-jWFtDqlA.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/useThemeProps-4GIH6D68.js", "/assets/isMuiElement-bxpgwgQD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employe/profil": { "id": "employe/profil", "parentId": "root", "path": "employe/profil", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profil-DPwojh6w.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/index-xsH4HHeE.js", "/assets/navbar-cli-CwZoKeuF.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/logo-icon2-3sguuZSz.js", "/assets/Stack-DJ672RKg.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/useThemeProps-4GIH6D68.js", "/assets/Typography-Dl5m69Yi.js", "/assets/Menu-CfqzC8Vj.js", "/assets/Popover-ehDyiyj2.js", "/assets/MenuItem-DE46lkXZ.js", "/assets/ButtonBase-AlovMshM.js", "/assets/listItemTextClasses-CxOMZ5Ha.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employe/postuler/job_test": { "id": "employe/postuler/job_test", "parentId": "root", "path": "employe/test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/job_test-BsREyNnu.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/dash_recrut": { "id": "employeur/dash_recrut", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dash_recrut-B3dnNMXu.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/RuleRounded-BolkDSnp.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/logo-icon2-3sguuZSz.js", "/assets/Box-B5QIj5Xy.js", "/assets/Stack-DJ672RKg.js", "/assets/Typography-Dl5m69Yi.js", "/assets/Popover-ehDyiyj2.js", "/assets/Menu-CfqzC8Vj.js", "/assets/MenuItem-DE46lkXZ.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/ButtonBase-AlovMshM.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/listItemTextClasses-CxOMZ5Ha.js", "/assets/useThemeProps-4GIH6D68.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/dash_content": { "id": "employeur/dash_content", "parentId": "employeur/dash_recrut", "path": "recruteur/dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dash_content-ZGCxTeE6.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Box-B5QIj5Xy.js", "/assets/Grid-D586BZFi.js", "/assets/Typography-Dl5m69Yi.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/useTheme-BGXANyoT.js", "/assets/useThemeProps-4GIH6D68.js", "/assets/isMuiElement-bxpgwgQD.js"], "css": ["/assets/dash_content-DGNHAam3.css", "/assets/dashboard-C72pszPT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/detail_offre": { "id": "employeur/detail_offre", "parentId": "employeur/dash_recrut", "path": "recruteur/detail-de-l-offre/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/detail_offre-pEHzx6Vl.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/Box-B5QIj5Xy.js", "/assets/Typography-Dl5m69Yi.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/talent_matcher": { "id": "employeur/talent_matcher", "parentId": "employeur/dash_recrut", "path": "recruteur/talent_matcher", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/talent_matcher-CkJY5fqy.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/index-xsH4HHeE.js", "/assets/DefaultPropsProvider-D3XoZZZR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/modele_predictif": { "id": "employeur/modele_predictif", "parentId": "employeur/dash_recrut", "path": "recruteur/modele_predictif", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/modele_predictif-D3PSH2To.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/evaluation": { "id": "employeur/evaluation", "parentId": "employeur/dash_recrut", "path": "recruteur/evaluation", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/evaluation-CUnkco__.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/profil_candidat": { "id": "employeur/profil_candidat", "parentId": "root", "path": "recruteur/candidat/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profil_candidat-D1Tz1-FH.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/navbar-recrut-B4AKF_fW.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/logo-icon2-3sguuZSz.js", "/assets/Stack-DJ672RKg.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/Grow-3Z0qnTTb.js", "/assets/index-CNVCymyq.js", "/assets/useTheme-BGXANyoT.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/useThemeProps-4GIH6D68.js", "/assets/Typography-Dl5m69Yi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "employeur/ajouter_offre": { "id": "employeur/ajouter_offre", "parentId": "root", "path": "recruteur/ajouter-offre", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ajouter_offre-CnLfXvLr.js", "imports": ["/assets/with-props-CxWoRmkF.js", "/assets/chunk-LSOULM7L-io0bedPh.js", "/assets/createSvgIcon-Czy4a_wd.js", "/assets/navbar-recrut-B4AKF_fW.js", "/assets/index-xsH4HHeE.js", "/assets/Box-B5QIj5Xy.js", "/assets/Grid-D586BZFi.js", "/assets/Typography-Dl5m69Yi.js", "/assets/FormControlLabel-DmP69yjm.js", "/assets/DefaultPropsProvider-D3XoZZZR.js", "/assets/createSimplePaletteValueFilter-Ci2NaAvL.js", "/assets/TextField-Bo1Kcyhs.js", "/assets/Grow-3Z0qnTTb.js", "/assets/ButtonBase-AlovMshM.js", "/assets/Chip-Dsjwbnz0.js", "/assets/Popover-ehDyiyj2.js", "/assets/Stack-DJ672RKg.js", "/assets/IconButton-CDJmrjB7.js", "/assets/Button-BcTfHBKO.js", "/assets/MenuItem-DE46lkXZ.js", "/assets/logo-icon2-3sguuZSz.js", "/assets/useTheme-BGXANyoT.js", "/assets/useThemeProps-4GIH6D68.js", "/assets/isMuiElement-bxpgwgQD.js", "/assets/Menu-CfqzC8Vj.js", "/assets/index-CNVCymyq.js", "/assets/isFocusVisible-B8k4qzLc.js", "/assets/CircularProgress-jWFtDqlA.js", "/assets/listItemTextClasses-CxOMZ5Ha.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-90807c23.js", "version": "90807c23", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "auth/sign-in/SignIn": {
    id: "auth/sign-in/SignIn",
    parentId: "root",
    path: "auth/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "auth/sign-up/SignUp": {
    id: "auth/sign-up/SignUp",
    parentId: "root",
    path: "auth/signup",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "auth/sign-up/SignUpRecrut": {
    id: "auth/sign-up/SignUpRecrut",
    parentId: "root",
    path: "auth/recruteur/signup",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "auth/forgotmdp/forgotmdp": {
    id: "auth/forgotmdp/forgotmdp",
    parentId: "root",
    path: "auth/forgotmdp",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "employe/dashboard": {
    id: "employe/dashboard",
    parentId: "root",
    path: "employe/dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "employe/accueil": {
    id: "employe/accueil",
    parentId: "root",
    path: "employe/accueil",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "employe/job_detail": {
    id: "employe/job_detail",
    parentId: "root",
    path: "employe/accueil/jobDetail/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "employe/profil": {
    id: "employe/profil",
    parentId: "root",
    path: "employe/profil",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "employe/postuler/job_test": {
    id: "employe/postuler/job_test",
    parentId: "root",
    path: "employe/test",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "employeur/dash_recrut": {
    id: "employeur/dash_recrut",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "employeur/dash_content": {
    id: "employeur/dash_content",
    parentId: "employeur/dash_recrut",
    path: "recruteur/dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "employeur/detail_offre": {
    id: "employeur/detail_offre",
    parentId: "employeur/dash_recrut",
    path: "recruteur/detail-de-l-offre/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "employeur/talent_matcher": {
    id: "employeur/talent_matcher",
    parentId: "employeur/dash_recrut",
    path: "recruteur/talent_matcher",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "employeur/modele_predictif": {
    id: "employeur/modele_predictif",
    parentId: "employeur/dash_recrut",
    path: "recruteur/modele_predictif",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "employeur/evaluation": {
    id: "employeur/evaluation",
    parentId: "employeur/dash_recrut",
    path: "recruteur/evaluation",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "employeur/profil_candidat": {
    id: "employeur/profil_candidat",
    parentId: "root",
    path: "recruteur/candidat/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "employeur/ajouter_offre": {
    id: "employeur/ajouter_offre",
    parentId: "root",
    path: "recruteur/ajouter-offre",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
