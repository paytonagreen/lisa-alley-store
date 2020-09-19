import SingleItem from '../components/items/SingleItem'

const Item = props => (
  <div>
    <SingleItem id={props.query.id}></SingleItem>
  </div>
)

export default Item;