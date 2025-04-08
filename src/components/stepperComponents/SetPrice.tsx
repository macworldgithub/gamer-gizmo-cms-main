import { Input } from "antd";

interface SetPriceProps {
  price: string;
  quantity: string;
  setPrice: (price: string) => void;
  setQuantity: (quantity: string) => void;
}

const SetPrice: React.FC<SetPriceProps> = ({
  price,
  quantity,
  setPrice,
  setQuantity,
}) => {
  return (
    <div>
      <h3>Set Price</h3>

      {/* Price Input */}
      <label>Price</label>
      <Input
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Quantity Input */}
      <label>Quantity</label>
      <Input
        type="number"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
  );
};

export default SetPrice;
