const accessToken =
  'ya29.a0AeTM1ifJY_PayBjK71X2pZsifTyKu4O_tTRtPNFQ_XNpHM6D3FC8Di1YwtYShYt7CrvQ0dyWVQVGxAeGz0dp55VvnZliKee328Rplmed-U-hf5Y7dLA1eU_jufp49qNumm3giroOWifWwXfXAehcz163YnawaCgYKAe4SARASFQHWtWOmzQ_CQZWjXvsck0SnDsRSVw0163';

const tokens = [
  'dGgzgNEkQ-K4R8akBUbTRR:APA91bFRhYeJBwVhH6xu6Py824y3J8cfEYM4FW7cfFpUv89MK4hQXifhHVqDxMiToqjQEfy2HVDnx-yKZY47Ir3mXwZ65NFSIBvAsa2KcoBETFP6L8WCwyZKJhO4QQe9PC8bxD6FbZyl',
];

const config = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
};

const url =
  'https://fcm.googleapis.com/v1/projects/geomessenger-365217/messages:send';

export async function notifyUsers({title, body, image, data}) {
  const getMessage = token =>
    JSON.stringify({
      message: {
        token,
        data,
        notification: {
          body,
          title,
          image,
        },
      },
    });

  const responses = await Promise.all(
    tokens.map(token => fetch(url, {...config, body: getMessage(token)})),
  );
  for (const response of responses) {
    console.log(await response.json());
  }
}
