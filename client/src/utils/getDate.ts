export const getDate = (ogDate: string) => {
  const d = new Date(ogDate);
  const date = d.getDate() < 10 ? "0" + d.getDate().toString() : d.getDate();
  const mon = d.getMonth() < 10 ? "0" + d.getMonth().toString() : d.getMonth();
  const year = d.getFullYear();
  return year + "-" + mon + "-" + date;
};
