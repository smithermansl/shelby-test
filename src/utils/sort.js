import { isPastDate } from 'clark-utils';

export const sortByStatus = (a, b) => {
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
      throw new Error(`Incorrect status label found.`)
  }
}

export const sortByDate = (a, b) => {
  return new Date(b.dueDate) - new Date(a.dueDate);
}

export const sortByStatusThenDate = (a, b) => {
  return sortByStatus(a, b) || sortByDate(a, b);
}

// new folder
export const updateStatus = arr => {
  return arr.map(obj => {
    let copy = {...obj};
    if (copy.status === 'pending') {
      copy.status = isPastDate(obj.dueDate) ? 'overdue' : 'outstanding';
    }
    return copy;
  });
}