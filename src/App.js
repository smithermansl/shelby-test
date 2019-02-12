// @flow

import React from 'react';
import { formatCentsToDollars } from 'clark-utils';
import { sortByStatusThenDate, updateStatus } from './utils/sort';
import bills from './data';
const billArr = Object.values(bills);
const tings = updateStatus(billArr).sort(sortByStatusThenDate);

const App = () =>
  <div>
    <header>
      <h3>Let's add some numbers!</h3>
    </header>
    <ul>
      {
        tings.map(bill => {
          return (
            <li key={bill.id}>{bill.id}:{' '}
            {formatCentsToDollars(bill.amountInCents)},{' '}
            {bill.status},{' '}
            {bill.dueDate}
            </li>
          )
        })
      }
    </ul>
  </div>

export default App;
