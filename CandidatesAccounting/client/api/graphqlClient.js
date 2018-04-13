export default function sendGraphQLQuery(query, variables) {
  return fetch('/graphql',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: variables ?
        JSON.stringify({query: query, variables: variables})
        :
        JSON.stringify({query: query})
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
          .then((response) => {
            return response.data
          });
      } else {
        throw response.status
      }
    })
}