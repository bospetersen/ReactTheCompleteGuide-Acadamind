export const createDatabaseURL = (setParams, params) => {
  const paramScript = setParams ? `/${params}` : '';
  const url = `https://react-hooks-updates-1e201-default-rtdb.firebaseio.com/ingredients${paramScript}.json`;
  console.log(url)
  return url;
}

