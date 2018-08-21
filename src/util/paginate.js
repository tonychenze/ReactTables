import _ from "lodash";
export function paginate(items, currentPage, pageSize) {
  const currentIndex = (currentPage - 1) * pageSize;
  return _(items)
    .slice(currentIndex)
    .take(pageSize)
    .value();
}
