// @flow

import React, { Component } from 'react';
import { formatCentsToDollars } from 'clark-utils';
import { updateAndCountBilling } from './myutils';
import bills from './data';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      updated: [],
      totals: {} // should probably initialize all to 0
    }
  }

  componentDidMount() {
    this.setState(updateAndCountBilling(bills));
  }

  render() {
    const { totals, updated } = this.state;

    return (
      <div>

        {
          Object.keys(totals).map(total => <p key={total}>{total}: {formatCentsToDollars(totals[total])}</p>)
        }
       
        <ul>
          {
            updated.map(bill => {
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
    )
  }
}
