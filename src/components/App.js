// @flow

import React, { Component } from 'react';
import BillingTotals from './BillingTotals';
import BillList from './BillList';
import { updateStatusAndCountBills } from '../myutils';
import type { BillType } from './BillList';
import type { TotalType } from './BillingTotals';
import bills from '../data';


export default class App extends Component<{}, { updatedBills: BillType[], totals: TotalType }> {
  constructor() {
    super();
    this.state = {
      updatedBills: [],
      totals: {
        total: 0,
        paid: 0,
        overdue: 0,
        outstanding: 0
      }
    }
  }

  componentDidMount() {
    this.setState(updateStatusAndCountBills(bills));
  }

  render() {
    const { totals, updatedBills } = this.state;
    return (
      <div>
        <BillingTotals totals={totals} />
        <BillList bills={updatedBills} />
      </div>
    )
  }
}