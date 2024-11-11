export const capitalize = (s: string) => {
  return String(s[0]).toUpperCase() + String(s).slice(1);
};

export const getColor = (type: "grass" | "poison") => {
  if (type == "grass") return "success";
  if (type == "poison") return "danger";

  return "default";
};
