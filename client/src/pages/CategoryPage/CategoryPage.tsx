import ProductCard from "../../components/ProductCard/ProductCard";

const CategoryPage = (props: any) => {
  return (
    <div>
      <h1>{props.category}</h1>
      <ProductCard productName="Loreal" productCategory={props.category} />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default CategoryPage;
