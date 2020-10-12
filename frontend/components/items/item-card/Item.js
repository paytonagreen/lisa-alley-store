import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from '../../styles/ItemStyles';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

const Item = ({ item, me }) => {
  return (
    <ItemStyles>
      <Link
        href={{
          pathname: '/item',
          query: { id: item.id },
        }}
      >
        <a>
          <div className="overlay">
          <p>{item.title}</p>
          {item.image && <img src={item.image} alt={item.title} />}
          </div>
</a>
      </Link>
      <div className="description-div"></div>

      {me && me.permissions.includes('ADMIN') && (
        <div className="buttonList">
          <Link
            href={{
              pathname: '/update',
              query: { id: item.id },
            }}
          >
            <a>Edit &#9999;&#65039;</a>
          </Link>
          <AddToCart id={item.id} />
          <DeleteItem id={item.id}>Delete This Item</DeleteItem>
        </div>
      )}
    </ItemStyles>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
export default Item;
