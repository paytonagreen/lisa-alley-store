import UpdateItem from '../components/items/UpdateItem';

const Sell = (props) => (
  <div>
    <UpdateItem id={props.query.id} />
  </div>
);

export default Sell;
