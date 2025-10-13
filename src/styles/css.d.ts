// src/types/css.d.ts
// Hace que TypeScript entienda imports de CSS/CSS Modules.
// Sin esto, te lanza: "Cannot find module or type declarations for side-effect import of '../styles/globals.css'."

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.css";
