export default function getFullType(item) {
  const isObj = typeof item === "object";
  if (isObj && !item.defs) {
    return "unknown";
  }
  const [type] = isObj ? item?.defs[0].split("\t") : item.split("\t");
  switch (type) {
    case "n":
      return "noun";
    case "v":
      return "verb";
    case "adj":
      return "adjective";
    case "adv":
      return "adverb";
    default:
      return "unknown";
  }
}
