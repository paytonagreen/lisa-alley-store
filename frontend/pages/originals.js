import React from 'react';

import Originals from '../components/items/views/Originals';

function OriginalsPage(props) {
  return (
    <Originals page={parseFloat(props.query.page || 1)} />
    )
}

export default OriginalsPage