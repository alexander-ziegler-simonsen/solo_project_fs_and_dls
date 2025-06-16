import { Container } from "@chakra-ui/react"
import { useCartStore } from "../useCartStore";

function Cart() {
    const cartItems = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <Container>
            <div className="cart">
                <h2>Cart</h2>
                {cartItems.map(({ product, amount }) => (
                    <div key={product._id}>
                        <span>{product.name} | count | {amount} |</span>
                        <button onClick={() => removeFromCart(product._id)}>Remove</button>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Cart