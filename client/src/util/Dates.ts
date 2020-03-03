export const getTimeCreated = () => {
  let d = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  )
    .toString()
    .slice(0, 24);
  let mt = d.substring(16);
  return `${d.slice(0, 15)} ${toStandardTime(mt)}`;
};

const toStandardTime = (militaryTime: any) => {
  militaryTime = militaryTime.split(":");
  return militaryTime[0].charAt(0) === "1" && militaryTime[0].charAt(1) > 2
    ? militaryTime[0] - 12 + ":" + militaryTime[1] + " P.M."
    : militaryTime[0] + ":" + militaryTime[1] + " A.M.";
};
