#!/bin/bash

# Initialize create-react-app
# npx create-react-app . --template typescript

# Get rid of unnecessary files
mkdir .trash
mv ./src/App.css .trash
mv ./src/App.tsx .trash
mv ./src/App.test.tsx .trash
mv ./src/reportWebVitals.ts .trash
mv ./src/setupTests.ts .trash
rm -r md-assets

# Add more stuff to .gitignore
echo ".trash" >> .gitignore
echo "examples" >> .gitignore
echo "layout-templates" >> .gitignore

# Remind yourself that React Bootstrap expects older bootstrap version
touch .CHECK_REACT_BOOTSTRAP_VERSION

# Install necessary packages & type definitions

# Bootstrap
npm install bootstrap@5.2.0-beta1
npm install --save-dev @types/bootstrap

# React-Bootstrap
npm install react-bootstrap
npm install --save-dev 

# React Router
npm install react-router react-router-dom
npm install --save-dev @types/react-router @types/react-router-dom

# Sass
npm install --save-dev sass
npm install --save-dev @types/sass

# Axios
npm install axios

# React Icons
npm install react-icons

# Prettier
npm install --save-dev prettier

# ESLint
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint

# Prettier support for ESLint
npm install --save-dev eslint-plugin-prettier eslint-config-prettier

# Peer dependencies for Airbnb style guide
npx install-peerdeps --dev eslint-config-airbnb

# TypeScript support for Airbnb style guide
npm install --save-dev eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin@^5.13.0 @typescript-eslint/parser@^5.0.0