import React from 'react';
import { useQuery, gql } from "@apollo/client"
import Loader from './Loader';
import Error from './ErrorMessage'

export const NUMBERWANG_QUERY = gql`
  query NUMBERWANG_QUERY {
    bullshit {
      number
      wang
    }
  }
`;

const Numberwang = () => {
  const {data, loading, error } = useQuery(NUMBERWANG_QUERY)
  if (loading) return <Loader/>
  if (error) return <Error error={error}/>
  if (data) return (
    <>
    <h1>{data.bullshit.number}</h1>
    <h2>sup</h2>
    <p>{data.bullshit.wang}</p>
    </>
  )
}

export default Numberwang;