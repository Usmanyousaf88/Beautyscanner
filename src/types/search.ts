export interface Ingredient {
  name: string;
  category: string;
  safety: "Safe" | "Moderate" | "Toxic";
  description: string;
  impacts: string[];
  alternatives: string[];
  products: string[];
}