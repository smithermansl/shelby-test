// @flow

import React, { Component } from 'react';
import BillingTotals from './BillingTotals';
import BillList from './BillList';
import { updateAndCountBilling } from './myutils';
import bills from './data';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      updated: [],
      totals: {
        total: 0,
        paid: 0,
        overdue: 0,
        outstanding: 0
      }
    }
  }

  componentDidMount() {
    this.setState(updateAndCountBilling(bills));
  }

  render() {
    const { totals, updated } = this.state;

    return (
      <div>
        <BillingTotals totals={totals} />
        <BillList bills={updated} />
      </div>
    )
  }
}