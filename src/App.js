// @flow

import React from 'react';
import { formatCentsToDollars } from 'clark-utils';
import bills from './data';
const billArr = Object.values(bills);

const App = () =>
  <div>
    <header>
      <h1>Let's add some numbers!</h1>
    </header>
    <ul>
      {
        billArr.map(bill => {
          return (
            <li>{bill.id}:{' '}
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
