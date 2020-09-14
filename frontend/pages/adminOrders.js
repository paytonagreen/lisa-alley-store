import React from 'react';
import AdminOrderList from '../components/AdminOrderList'

const AdminOrders = props => (
  <div>
    <AdminOrderList page={parseFloat(props.query.page || 1)} />
  </div>
)

export default AdminOrders;