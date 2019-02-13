// @flow

import React from 'react';
import { formatCentsToDollars } from 'clark-utils';

export type TotalType = {
  total: number,
  paid: number,
  overdue: number,
  outstanding: number
}

type BillingTotalsProps = { totals: TotalType }

const BillingTotals = ({ totals }: BillingTotalsProps ) => {
  return (
    <table id="totals">
      <caption>Billing Totals</caption>
      <tbody>
        {
          Object.keys(totals).map(total => {
            return (
              <tr key={total} >
                <td>{total}</td>
                <td>{formatCentsToDollars(totals[total])}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

BillingTotals.defaultProps = {
  totals: {
    total: 0,
    paid: 0,
    overdue: 0,
    outstanding: 0
  }
}

export default BillingTotals;