import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import Router from 'next/router';

import { ALL_ITEMS_QUERY } from './Items';
import useForm from '../../lib/useForm';

import Form from '../styles/Form';
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
      image
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $quantity: Int
    $featured: Boolean
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
      quantity: $quantity
      featured: $featured
    ) {
      id
      title
      description
      price
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

  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        updateItem({
          variables: { id, ...values },
          refetchQueries: [{ query: ALL_ITEMS_QUERY }],
        });
        Router.push({
          pathname: '/item',
          query: { id },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;
  const { item } = data;
  return (
    <Form onSubmit={handleSubmit}>
      <Error error={mutationError} />
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <div className='image-block'>
          <a className='image-link' href={`/updateImage?id=${id}`}>
            Edit Image
          </a>
          {item.image && <img src={item.image} alt='Upload Preview' />}
        </div>
        <label htmlFor='title'>
          Title
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            required
            defaultValue={data.item.title}
            value={values.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            required
            defaultValue={data.item.price}
            value={values.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='quantity'>
          Quantity
          <input
            type='number'
            id='quantity'
            name='quantity'
            placeholder='Quantity'
            required
            defaultValue={data.item.quantity}
            value={values.quantity}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Enter A Description'
            required
            defaultValue={data.item.description}
            value={values.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='featured'>
          Featured
          <select id='featured' name='featured' onChange={handleChange}>
            <option value=''></option>
            <option value={true} selected={item.featured === true}>
              Yes
            </option>
            <option value={false} selected={item.featured === false}>
              No
            </option>
          </select>
        </label>

        <button type='submit'>Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
