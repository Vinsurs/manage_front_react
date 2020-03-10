export default function(time) {
  if (!time) return "";
  let oDate = new Date(time);
  return (
    oDate.getFullYear() +
    "-" +
    (oDate.getMonth() + 1) +
    "-" +
    oDate.getDate() +
    " " +
    oDate.getHours() +
    ":" +
    oDate.getMinutes() +
    ":" +
    oDate.getSeconds()
  );
}
