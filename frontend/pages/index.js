import Prints from '../components/items/views/HomePrints';
import Originals from '../components/items/views/HomeOriginals';

function PrintsPage(props) {
  return (
    <>
      <Prints page={parseFloat(props.query.page || 1)} />
      <Originals page={parseFloat(props.query.page || 1)} />
    </>
  );
}

export default PrintsPage;
