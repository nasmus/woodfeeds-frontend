import { useContext } from "react";
import { Store } from "../../Store";
import LogInShippingInfo from "../../components/LogInShippingInfo";
import LogOutShippingInfo from "../../components/LogOutShippingInfo";
import { Helmet } from "react-helmet-async";

export default function ShippingInformation() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, paymentMethod, cartItems },
  } = state;
  return userInfo ? (
    <div>
      <Helmet>
        <title>Shipping Information</title>
      </Helmet>
      <LogInShippingInfo />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>Shipping Information</title>
      </Helmet>
      <LogOutShippingInfo />
    </div>
  );
}
