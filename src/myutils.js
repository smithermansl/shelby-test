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

export const sortByStatusAndDate = (arr: BillType[]): BillType[] => {
  return arr.sort(sortWithTwoFns(sortByStatus, sortByDate));
}

export const sortWithTwoFns =
  (f1: (a: BillType, b: BillType) => number, f2: (a: BillType, b: BillType) => number) => {
    // f1 takes precedence over f2
    return (a: BillType, b: BillType) => f1(a, b) || f2(a, b);
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

export const updateAndCountBills = (billsObj: BillsType): AppStateType => {
  // using `any` is temp solution, Object.values is treating output vals as `mixed` type
  const updatedBills = sortByStatusAndDate(updateStatus((Object.values(billsObj): any)));
  const totals = calculateTotals(updatedBills);
  return { updatedBills, totals };
}