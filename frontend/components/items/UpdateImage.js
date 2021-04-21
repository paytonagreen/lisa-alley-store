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
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $image: String, $largeImage: String) {
    updateItem(id: $id, image: $image, largeImage: $largeImage) {
      image
      largeImage
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
  const [image, setImage] = useState('');
  const [largeImage, setLargeImage] = useState('');

  const { handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        updateItem({
          variables: { id, image, largeImage },
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
  console.log(item);
  console.log(image);
  console.log(largeImage);
  return (
    <Form onSubmit={handleSubmit}>
      <Error error={mutationError} />
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <label htmlFor='file'>
          Image
          <input
            type='file'
            id='file'
            name='file'
            placeholder='Upload an image'
            onChange={uploadFile}
          />
          {image && <img src={image} alt='Upload Preview' />}
        </label>

        <button type='submit'>Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
