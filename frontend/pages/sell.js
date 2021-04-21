import CreateItem from '../components/items/CreateItem';
import PleaseSignIn from '../components/utils/PleaseSignIn';

const Sell = (props) => (
  <div>
    <PleaseSignIn>
      <CreateItem />
    </PleaseSignIn>
  </div>
);

export default Sell;
