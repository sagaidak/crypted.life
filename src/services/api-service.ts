

export const postData = async (data = {}, headers = {'Content-Type': 'application/json'}) => {
  const response = await fetch(`https://crypted.life:3001/graphql`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });
  return await response.json(); 
}

