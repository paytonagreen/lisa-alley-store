import React from "react";
import { useMutation, gql } from "@apollo/client";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = ({ id, children }) => {
  function update(e, payload) {
    //manually update cache on client so it maches server
    // 1. Read cache for items that we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter deleted Item out
    data.items = data.items.filter(
      (item) => item.id !== payload.data.deleteItem.id
    );
    // 3. Put items back!
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  }
  const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    update: update,
  });
  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          deleteItem().catch((err) => {
            alert(err.message);
          });
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteItem;
