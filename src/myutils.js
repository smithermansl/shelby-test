// @flow

import { isPastDate } from 'clark-utils';
import type { BillsType } from './data';
import type { BillType } from './components/BillList';
import type { TotalType } from './components/BillingTotals';

export const calculateTotals = (arr: BillType[]): TotalType => {
  return arr.reduce((totals, obj) => {
    let { amountInCents, status } = obj;
    totals.total += amountInCents;
    totals[status] += amountInCents;
    return totals
  }, {
    total: 0,
    paid: 0,
    overdue: 0,
    outstanding: 0
  });
}

export const sortByDate = (a: BillType, b: BillType): number => {
  return new Date(b.dueDate) - new Date(a.dueDate);
}

export const sortByStatus = (a: BillType, b: BillType): number => {
  switch (a.status) {
    case 'outstanding':
      if (b.status === 'outstanding') return 0;
      else return -1;
    case 'overdue':
      if (b.status === 'outstanding') return 1;
      else if (b.status === 'paid') return -1;
      else return 0;
    case 'paid':
      if (b.status === 'paid') return 0;
      else return 1;
    default:
      throw new Error(`Incorrect status label found.`);
  }
}

export const sortByStatusThenDate = (a: BillType, b: BillType): number => {
  return sortByStatus(a, b) || sortByDate(a, b);
}

export const updateStatus = (arr: BillType[]): BillType[] => {
  return arr.map(obj => {
    let copy = {...obj};
    if (copy.status === 'pending') {
      copy.status = isPastDate(obj.dueDate) ? 'overdue' : 'outstanding';
    }
    return copy;
  });
}

type AppStateType = {
  updatedBills: BillType[],
  totals: TotalType
}

export const updateStatusAndCountBills = (billsObj: BillsType): AppStateType => {
  // temp solution to Object.values treating values as mixed type
  const billsArr = (Object.values(billsObj): any);
  const updatedBills = updateStatus(billsArr).sort(sortByStatusThenDate);
  const totals = calculateTotals(updatedBills);
  return { updatedBills, totals };
}