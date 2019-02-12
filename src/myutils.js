import { isPastDate } from 'clark-utils';

export const updateAndCountBilling = billsObj => {
  const billsArr = Object.values(billsObj);
  const updated = updateStatus(billsArr).sort(sortByStatusThenDate);
  const totals = calcTotals(updated);
  return { updated, totals };
}

export const updateStatus = arr => {
  return arr.map(obj => {
    let copy = {...obj};
    if (copy.status === 'pending') {
      copy.status = isPastDate(obj.dueDate) ? 'overdue' : 'outstanding';
    }
    return copy;
  });
}

export const calcTotals = arr => {
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

export const sortByStatusThenDate = (a, b) => {
  return sortByStatus(a, b) || sortByDate(a, b);
}

const sortByStatus = (a, b) => {
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

const sortByDate = (a, b) => {
  return new Date(b.dueDate) - new Date(a.dueDate);
}