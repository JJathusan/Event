import { CraftsModule } from "../Crafts/CraftsModule";

export default function CraftsPage() {
  const handleAddToCart = (product: any) => {
    console.log("Add to cart:", product);
  };

  const handleViewProduct = (product: any) => {
    console.log("View product:", product);
  };

  return (
    <div className="min-h-screen">
      <CraftsModule
        onAddToCart={handleAddToCart}
        onViewProduct={handleViewProduct}
      />
    </div>
  );
}
