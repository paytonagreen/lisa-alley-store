import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";

const Item = ({ item, me }) => {
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
      <Title>
        <Link
          href={{
            pathname: "/item",
            query: { id: item.id },
          }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <div className="description-div">
        <p>{item.description}</p>
      </div>

      <div className="buttonList">
        {me && me.permissions.includes("ADMIN") && (
          <Link
            href={{
              pathname: "/update",
              query: { id: item.id },
            }}
          >
            <a>Edit &#9999;&#65039;</a>
          </Link>
        )}
        <AddToCart id={item.id} />
        {me && me.permissions.includes("ADMIN") && (
          <DeleteItem id={item.id}>Delete This Item</DeleteItem>
        )}
      </div>
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
