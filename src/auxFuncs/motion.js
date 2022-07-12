//AUXILLIARY FUNCTIONS.................

export function easeInOut(t) {
  let sqt = t * t;
  return sqt / (2 * (sqt - t) + 1);
}

//....................................
