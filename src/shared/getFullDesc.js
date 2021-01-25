export default function getFullDesc(item) {
  const isObj = typeof item === "object";
  if (isObj && !item.defs) {
    return "";
  }
  const [, desc] = isObj ? item?.defs[0].split("\t") : item.split("\t");
  return desc;
}
