// @flow

import React from 'react';
import { formatCentsToDollars } from 'clark-utils';

export type BillType = {
  id: string,
  amountInCents: number,
  status: 'paid' | 'overdue' | 'outstanding',
  dueDate: string
}

type BillListProps = { bills: BillType[] }

const BillList = ({ bills }: BillListProps) => {
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

BillList.defaultProps = {
  bills: [{
    id: ' ',
    amountInCents: 0,
    status: 'outstanding',
    dueDate: ' '
  }]
}

export default BillList;