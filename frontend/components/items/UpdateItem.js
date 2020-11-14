import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import Router from 'next/router';

import { ALL_ITEMS_QUERY } from './Items'
import Form from '../styles/Form';
import useForm from '../../lib/useForm'
import Error from '../utils/ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      quantity
      featured
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: String
    $largeImage: String
    $quantity: Int
    $featured: Boolean
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      quantity: $quantity
      featured: $featured
    ) {
      id
      title
      description
      price
      image
      largeImage
      quantity
      featured
    }
  }
`;

const UpdateItem = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  const itemMutation = useMutation(UPDATE_ITEM_MUTATION);
  const [updateItem] = itemMutation;
  const mutationLoading = itemMutation[1].loading;
  const mutationError = itemMutation[1].error;

  const [savingStarted, setSavingStarted] = useState(false);
  const [ image, setImage ] = useState('');
  const [ largeImage, setLargeImage ] = useState('');


  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        updateItem({
          variables: { id, image, largeImage, ...values },
          refetchQueries: [{ query: ALL_ITEMS_QUERY }],
        });
        Router.push({
          pathname: '/item',
          query: { id },
        });
      } catch(error) {
        console.log(error);
      }
    }
  }

  async function uploadFile(e) {
    console.log('uploading file...');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dtqqdu0so/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  const { item } = data;
  return (
    <Form onSubmit={handleSubmit}>
      <Error error={mutationError} />
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
      <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
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
            defaultValue={data.item.title}
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
            defaultValue={data.item.price}
            value={values.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="quantity">
          Quantity
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            required
            defaultValue={data.item.quantity}
            value={values.quantity}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
            defaultValue={data.item.description}
            value={values.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="featured">
            Featured
            <select id="featured" name="featured" onChange={handleChange}>
              <option value=""></option>
              <option value={true} selected={item.featured === true}>Yes</option>
              <option value={false} selected={item.featured === false}>No</option>
            </select>
          </label>

        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
