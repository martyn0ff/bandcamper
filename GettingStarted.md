# Initialization

`npx create-react-app . --template typescript`

<br>

# Preparing your favorite packages

## Tools

- React Router: `npm i react-router-dom @types/react-router-dom`
- Axios: `<npm command>`
- Bootstrap: `npm i bootstrap @types/bootstrap`
- React Bootstrap: `npm i react-bootstrap @types/react-bootstrap`
- Shallow Equal: `npm i shallowequal @types/shallowequal`

> **Note!** React Bootstrap's styling depends on a particular version of Bootstrap. At the time of writing, latest React Bootstrap wants `5.2.0-beta1` version of Bootstrap CSS for proper styling. Consult [stylesheets section](https://react-bootstrap.github.io/getting-started/introduction/#stylesheets) on React Bootstrap's website for more info.

## Design

- React Bootstrap Icons: `<npm command>`
- Font Awesome: `<npm command>`

<br>

# Preparing TypeScript, ESLint & Prettier

Make sure that extensions for ESLint and Prettier are installed and enabled in VSCode.

## TypeScript

<br>

> Reference: https://www.typescriptlang.org/download

<br>

Then, install TypeScript: `npm install --save-dev typescript`, this will install it for a project. I prefer to have it installed globally, so I would use `npm install --global typescript`.

## Prettier

For Prettier, make sure if Format On Save option is used sensibly, e.g. if its a production code, make sure that all team members adhere to the same style. However, with Formatting Toggle extension, it's even easier, simply turn it off for a project and you're good to go.

<br>

> Reference: https://prettier.io/docs/en/install.html

<br>

Following recommendation from prettier team, let's install prettier with `npm install --save-dev --save-exact prettier`, and we're good to go.

<br>

> `--save-exact` saves package with an exact version, and consequently during `npm update` it will not updated.

<br>

## ESLint + TypeScript + Prettier + Airbnb Style Guide

We want ESLint to interact nicely with prettier, recognize TypeScript and enforce Airbnb Style Guide.

<br>

> Reference: https://typescript-eslint.io/docs/

<br>

Let's install ESLint with TypeScript support:

- **Without** TypeScript installed globally: `npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript`.

- **With** TypeScript installed globally: `npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint`.

Then, let's install plugins to support prettier and config file that turns off all conflicting settings: `npm install --save-dev eslint-plugin-prettier eslint-config-prettier`

Next let's install Airbnb style guide:

- **Without React**, see https://npmjs.com/eslint-config-airbnb-base.

- **With React**:

<br>

> Reference: https://www.npmjs.com/package/eslint-config-airbnb

<br>

Install correct versions of each package: `npx install-peerdeps --dev eslint-config-airbnb`.

And finally, let's install TypeScript support for Airbnb style guide:

<br>

> Reference: https://www.npmjs.com/package/eslint-config-airbnb-typescript

<br>

```bash
npm install --save-dev eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin@^5.13.0 @typescript-eslint/parser@^5.0.0
```

<br>

## One-line install (React)

`npm install --save-dev --save-exact prettier && npm install --save-dev && npx install-peerdeps --dev eslint-config-airbnb && npm install --save-dev eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin@^5.13.0 @typescript-eslint/parser@^5.0.0`

<br>

# Folder Structure

https://dev.to/jamesmh/the-life-changing-and-time-saving-magic-of-feature-focused-code-organization-1708
https://dev.to/dchowitz/7-reasons-why-i-favour-feature-slices-4kl3

<br>

# Configuration

## TypeScript

<br>

> Reference: https://www.typescriptlang.org/tsconfig

<br>

If you're using `create-react-app` with TypeScript template, it already comes with sensible `tsconfig.json` configuration. Otherwise, you have to create one yourself with `tsc --init`.

<br>

## Prettier

<br>

> Reference: https://prettier.io/docs/en/configuration.html

> Reference: https://prettier.io/docs/en/options.html

<br>

Create empty config file to let editors and other tools know that you're using Prettier:

```bash
echo {}> .prettierrc.json
```

Prettier comes with sensible defaults. Below is my configuration of prettierrc:

```json
{
  "printWidth": 80,
  "proseWrap": "preserve",
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "consistent",
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "requirePragma": false,
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "off",
  "singleAttributePerLine": true
}
```

Next, create a [`.prettierignore`](https://prettier.io/docs/en/ignore.html) file to let the Prettier CLI and editors know which files to not format. Here’s an example:

```gitignore
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
*.html
```

<br>

## ESLint

**Assuming you have `package.json` file**, you run `npm init @eslint/config`. This will prompt you to answer some questions and generate `.eslintrc` file with some defaults. The following configuration makes use of Airbnb style guide, including React Hooks:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb", "airbnb-typescript", "airbnb/hooks", "prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"]
  },
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
    // your own rules go here...
  }
}
```

<br>

> Reference: https://typescript-eslint.io/rules/

<br>

Now you're ready to start programming. As you go, see if any rule is too cumbersome for you and enforce it in a way that you prefer as a part of a value associated with `rules` key in your `.eslintrc` file. Example:

```json
{
  "rules": {
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["error", "double"]
  }
}
```

<br>

# CSS / Sass Styling

`App.scss`:

```scss
// other custom SCSS

@import "bootstrap-custom";
```

`bootstrap-custom.scss`:

```scss
// Sass Bootstrap variable overrides

@import "~bootstrap/scss/bootstrap";
```

`index.css`

```
(leave as is or remove it altogether if using Bootstrap)
```

Remember that **order in which CSS styles appear on page matters**. CSS styles that are further down the list take precedence. If you are using Bootstrap, you can load your CSS in following way:

- `index.tsx`:

```tsx
import "./index.css"; // base CSS, remove this line if you've removed this file
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
```

- `App.tsx`:

```tsx
import "./App.css";
```

> Note that working with Sass requires `sass` npm package to be installed: `npm install --save-dev sass`

<br>

# Template for Dashboard

![dashboard template](./md-assets/dashboard-template.png)

# Packages to check out

### Localforage

https://localforage.github.io/localForage/

### Craco

https://github.com/dilanx/craco

<br>

# React Router for Web Applications

With React Router, you can achieve client-side routing on your app. What this means is that it allows to control the URL that is shown in address bar without actually traversing the directory, hence, without sending additional requests to the server. By using client-side routing, you can achieve faster perceived performance of your application.

In nutshell:

<br>

### **Preparation**

<br>

1. [`createBrowserRouter()`](https://reactrouter.com/en/main/routers/create-browser-router) - create a router, use code example from there (in `index.ts`, **NOT** in `App.ts`!)
2. Create custom error page component and bind it to the root route (default page is kinda ugly). You do that by passing [`errorElement`](https://reactrouter.com/en/main/route/error-element) prop to your route. **Your `ErrorPage` should use [`useRouteError()`](https://reactrouter.com/en/main/hooks/use-route-error) hook to catch those errors.**

<br>

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />, // <-- like this
  },
]);
```

Now any thrown `Error`s or `Response`s (yes, [you can throw a response](https://reactrouter.com/en/main/route/error-element#throwing-responses)) will be caught by your `errorElement` and rendered to the user.

<br>

3. Create your DAO layer from where you fetch your data from database.
4. Nest all your other routes inside your root route:

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

5. Place [`<Outlet>`](https://reactrouter.com/en/main/components/outlet) component in your root component where you want all children to render.

6. Make sure that all internal `a` tags are [`Link`](https://reactrouter.com/en/main/components/outlet)s (that use `to` instead of `href`) - this will delegate routing to client. Otherwise any click on internal link will lead to sending a request to a server and reloading your page, and we don't want that! **Make sure that your `Link` has route associated with it!**

<br>

### **Fetching data**

<br>

7. Use [`<Route loader>`](https://reactrouter.com/en/main/route/loader) and [`useLoaderData()`](https://reactrouter.com/en/main/hooks/use-loader-data) to dynamically load data to your route:

```tsx
// example-component.tsx

export async function loader() {
  // fetch data from API (e.g. all user contacts)
  // and return it
}
```

<br>

Then, `import` this `loader` in your `index.ts` and you can pass it to your route using `loader` prop.

<br>

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: // <- your loader here!
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

Now this loader will be avaiable for all of root route children. To access it from any child route, use `useLoaderData()`.

<br>

### Writing data

<br>

[React Router mimics old-school HTML forms behavior](https://reactrouter.com/en/main/start/tutorial#data-writes--html-forms). Instead of issuing a request to a server, it will be issued to React Router's [`action`](https://reactrouter.com/en/main/route/action) callbacks.

8. In order to use React Router's form handling mechanism, we are going to use `<Form>` component instead of default `<form>` in a component where we're implementing data writing. We will also define `action` route, which performs new object creation logic:

```tsx
export async function action() {
  // create new db entry via API
}
```

Now you can bind this callback to a route by using `action` prop:

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction, // <- here it is!
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
```

And just like that, your form submission will be routed to `action` route. When your `Form` sends a POST request, once it is executed, React Router will update the UI of a route with new data [through `useLoaderData()` hooks you've set up earlier](#fetching-data).

9. Dynamic segments allow your routes to be dynamic. Look at the following route:

```tsx
// child of root route
{
  path: "contacts/:contactId",
  element: <Contact />,
  loader: contactLoader,
  action: contactAction,
}
```

<br>

By the use of colon `:` prefix, `contactId` will be treated as dynamic segment - when the user accesses `/contacts/12345` route, `"12345"` will be stored as `contactId` field of [`params`](https://reactrouter.com/en/main/route/loader#params). Loader function optionally accepts a `loader` route as its parameter, that we can use to our benefit:

<br>

```tsx
export async function loader({ params }) {
  return getContact(params.contactId); // <- now we can pass contact ID that interests us!
}
```

<br>

### Updating data

https://reactrouter.com/en/main/start/tutorial#updating-contacts-with-formdata
