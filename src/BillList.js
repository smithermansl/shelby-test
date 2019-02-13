import React from 'react';
import { formatCentsToDollars } from 'clark-utils';

const BillList = ({ bills }) => {
  return (
    <table id="list">
      <thead>
        <tr>
          <th>Id</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {
          bills.map(bill => {
            return (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>{formatCentsToDollars(bill.amountInCents)}</td>
                <td>{bill.status}</td>
                <td>{bill.dueDate}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default BillList;