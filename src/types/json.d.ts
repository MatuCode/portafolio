// Permite importar JSON tipándolo como objeto genérico seguro
declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}
