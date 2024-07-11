export interface Report {
  id: number;
  type: "sales" | "stock";
  data: unknown; // Данные отчета (зависит от типа)
}
