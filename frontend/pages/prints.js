import React from 'react';

import Prints from '../components/items/views/Prints';

function PrintsPage(props) {
  return (
    <>
    <Prints page={parseFloat(props.query.page || 1)} />
    </>
    )
}

export default PrintsPage