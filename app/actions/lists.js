//Create new list
export const CREATE_LIST = 'CREATE_LIST';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE';
export const RESET_NEW_LIST = 'RESET_NEW_LIST';

export function createList(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: '/api/list/create'
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  });

  return {
    type: CREATE_LIST,
    payload: request
  };
}
