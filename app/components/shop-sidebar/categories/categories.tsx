import CategoryLink from "./category-link";
import { categories } from "../../../lib/category-items";

const Categories = () => {
  return (
    <ul className="flex flex-col gap-1">
      {categories.map((category) => (
        <CategoryLink key={category.id} category={category} />
      ))}
    </ul>
  );
};

export default Categories;
