import React from 'react';
import { formatCentsToDollars } from 'clark-utils';

const BillingTotals = ({ totals }) => {
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

export default BillingTotals;