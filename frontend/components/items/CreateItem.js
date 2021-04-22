import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';

import useForm from '../../lib/useForm';
import { ALL_ITEMS_QUERY } from './Items';

import Form from '../styles/Form';
import Error from '../utils/ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
    $type: String!
    $size: String!
    $lowercaseTitle: String!
    $lowercaseDescription: String!
    $quantity: Int!
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      type: $type
      size: $size
      lowercaseTitle: $lowercaseTitle
      lowercaseDescription: $lowercaseDescription
      quantity: $quantity
    ) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.modify({
    id: cache.identify(payload.data.createItem),
    fields: {
      allItems(items, { readField }) {
        return [payload.data.createItem, ...items];
      },
    },
  });
}

function CreateItem() {
  const { values, lowercaseValues, handleChange } = useForm();
  const [image, setImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [lowercaseTitle, setLowercaseTitle] = useState('');
  const [lowercaseDescription, setLowercaseDescription] = useState('');

  useEffect(() => {
    setLowercaseTitle(lowercaseValues.title);
    setLowercaseDescription(lowercaseValues.description);
  }, [values.title, values.description])

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    variables: {
      ...values,
      image,
      largeImage,
      lowercaseTitle,
      lowercaseDescription,
    },
    // update,
    refetchQueries: [{ query: ALL_ITEMS_QUERY }],
  });

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

  return (
    <Form
      data-test="form"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const res = await createItem();
          Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id },
          });
        } catch(error) {
          console.log(error);
        }
      }}
    >
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
          Price (In Cents)
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
        <label htmlFor="type">
          Type
          <select id="type" name="type" onChange={handleChange}>
            <option value="">Select An Option</option>
            <option value="print">Print</option>
            <option value="original">Original</option>
            <option value="gallery">Gallery</option>
            <option value="shirt">Shirt</option>
            <option value="hat">Hat</option>
          </select>
        </label>
        {values.type === 'print' && (
          <label htmlFor="size">
            Size
            <select id="size" name="size" onChange={handleChange}>
              <option value="">Select An Option</option>
              <option value="11x14">11x14</option>
              <option value="30x30">30x30</option>
            </select>
          </label>
        )}
        {values.type === 'gallery' && (
          <label htmlFor="size">
            Size
            <select id="size" name="size" onChange={handleChange}>
              <option value=""></option>
              <option value="Gallery">Gallery Example</option>
            </select>
          </label>
        )}
        {values.type === 'original' && (
          <label htmlFor="size">
            Size
            <input
            type="text"
            id="size"
            name="size"
            placeholder="Size"
            required
            value={values.size}
            onChange={handleChange}
          />
          </label>
        )}
        <label htmlFor="quantity">
          Quantity
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            required
            value={values.quantity}
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
