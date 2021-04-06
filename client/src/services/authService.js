

export const authenticate = async (url, body, onSuccess, onFailure) => {

  try {
    const promise = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const authToken = promise.headers.get('Authorization');
    // document.cookie = `x-auth-token=${authToken}`;
   localStorage.setItem('x-auth-token', authToken);
    const response = await promise.json()

    if (response.username && authToken) {
      onSuccess({
        username: response.username,
        id: response._id
      })
    } else {
      onFailure(response.message);
    }

  } catch (e) {
    onFailure(e)
  }
}

export const getAll = () => {
  const url = 'http://localhost:4000/api/auth';
  return  fetch(url)
  .then(res => res.json())
  .catch(error => console.log(error));

}


// export const getOne = (userId) => {
//   const url = 'http://localhost:4000/api/auth';
//   return fetch(`${url}/${userId}`)
//       .then(res => res.json())
//       .catch(error => console.log(error));
// };