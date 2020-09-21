import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import useForm from "../../lib/useForm";
import Form from "../styles/Form";
import Error from "../utils/ErrorMessage";
import { ALL_ITEMS_QUERY } from "./Items";
import { PAGINATION_QUERY } from './Pagination';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.modify("ROOT_QUERY", {
    allItems(items, { readField }) {
      return [payload.data.createItem, ...items];
    },
  });
}

function CreateItem() {
  const { values, handleChange } = useForm();
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");

  const [createItem, { loading, error } ] = useMutation(CREATE_ITEM_MUTATION, {
    variables: { ...values, image, largeImage },
    update,
    refetchQueries: [
      { query: ALL_ITEMS_QUERY },
      { query: PAGINATION_QUERY },
    ],
  });

  async function uploadFile(e) {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtqqdu0so/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);
  }

  return (
    <Form data-test="form" onSubmit={
      async e => {
        e.preventDefault();
        const res = await createItem();
        Router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id }
        })
      }
    }>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            required
            onChange={uploadFile}
          />
          {image && <img src={image} alt="Upload Preview" />}
        </label>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={values.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            value={values.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          description
          <textarea
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
            value={values.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };