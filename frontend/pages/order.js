import PleaseSignIn from '../components/utils/PleaseSignIn';
import Order from '../components/orders/Order';

const OrderPage = (props) => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);

export default OrderPage;
