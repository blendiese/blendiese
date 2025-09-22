export type Since =
  | "1 week"
  | "2 weeks"
  | "1 month"
  | "2 months"
  | "3 months"
  | "6 months"
  | "1 year"
  | "custom";

export type Parameter = {
  timeSelect: {
    mode: "relative";
    since: Since;
    customTime?: Date;
  };
};
