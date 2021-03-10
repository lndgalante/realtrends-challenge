import { NextApiRequest, NextApiResponse } from 'next';

// env
const apiKey = process.env.ROOMSERVICE_API_KEY;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const { room, user } = body;

  const resources = [
    {
      object: 'room',
      reference: room,
      permission: 'join',
    },
  ];

  if (!apiKey) {
    const error = `
      API key not set. Grab yours from https://app.roomservice.dev and add ROOMSERVICE_API_KEY=<your_api_key> to a .env file in this directory.
      After that, restart the "yarn dev" command. Don't worry, the .env file is ignored in the .gitignore file so your API key won't be stored on GitHub.
    `;

    res.statusCode = 500;
    res.write(error);

    throw error;
  }

  const response = await fetch('https://super.roomservice.dev/provision', {
    method: 'POST',
    body: JSON.stringify({ user, resources: resources }),
    headers: { Authorization: `Bearer: ${process.env.ROOMSERVICE_API_KEY}`, 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  res.json(data);
};
