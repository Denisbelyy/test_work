export default function getFullType(item) {
  let fullType;
  if (!item.defs) {
    return "unknown";
  }
  const [type] = item?.defs[0].split("\t");
  switch (type) {
    case "n":
      fullType = "noun";
      break;
    case "v":
      fullType = "verb";
      break;
    case "adj":
      fullType = "adjective";
      break;
    case "adv":
      fullType = "adverb";
      break;
    default:
      fullType = "unknown";
      break;
  }
  return fullType;
}
