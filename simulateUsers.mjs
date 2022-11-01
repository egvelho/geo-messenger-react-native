import axios from 'axios';
import {faker} from '@faker-js/faker';
import firebaseConfig from './src/firebase/firebaseConfig.json' assert {type: 'json'};

const databaseUrl = firebaseConfig.databaseURL;
const userToReceiveMessage = '789-513-1665953209544';
const numberOfUsers = 10;
const messageInterval = 3000;
const shouldDeleteMessages = true;
const movementInterval = 1500;
const movementIncrement = 0.01;
const baseCoords = {
  latitude: -29.6795543,
  longitude: -51.1191832,
};

function generateUserId() {
  return `bot-${Math.round(Math.random() * 1000)}-${Math.round(
    Math.random() * 1000,
  )}-${Date.now().toString()}`;
}

function generateUserFullName() {
  return faker.name.fullName();
}

function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function generateBoolean() {
  return Math.random() > 0.5;
}

function generateInteger(max) {
  return Math.round(Math.random() * max);
}

function generateMessage(user) {
  return {
    text: faker.lorem.text(),
    senderId: user.id,
    timestamp: Date.now(),
  };
}

function randomSingleCoordsPosition(singleCoords) {
  return parseFloat(
    (
      singleCoords +
      (generateBoolean() ? movementIncrement : -movementIncrement) *
        generateInteger(10)
    ).toFixed(7),
  );
}

function getRandomCoords(coords) {
  return {
    latitude: randomSingleCoordsPosition(coords.latitude),
    longitude: randomSingleCoordsPosition(coords.longitude),
  };
}

function delay(timeout) {
  return new Promise(resolve => setTimeout(() => resolve(undefined), timeout));
}

function sendMessage(user) {
  const message = generateMessage(user);
  const chatPath = [userToReceiveMessage, user.id].sort().join('-');
  return axios.put(
    `${databaseUrl}/messages/${chatPath}/${message.timestamp}/.json`,
    message,
  );
}

function deleteMessages(user) {
  const chatPath = [userToReceiveMessage, user.id].sort().join('-');
  return axios.delete(`${databaseUrl}/messages/${chatPath}.json`);
}

function initFirebasePosition(user) {
  return axios.put(`${databaseUrl}/positions/${user.id}/.json`, user);
}

function updateFirebasePosition(user) {
  return axios.patch(
    `${databaseUrl}/positions/${user.id}/coords.json`,
    user.coords,
  );
}

function deleteFirebasePosition(user) {
  return axios.delete(`${databaseUrl}/positions/${user.id}.json`);
}

let exitSignal = false;
let shouldExit = false;
let users = [];

(async function simulateUsers() {
  users = Array.from({length: numberOfUsers}, () => ({
    coords: getRandomCoords(baseCoords),
    id: generateUserId(),
    name: generateUserFullName(),
    color: generateRandomColor(),
  }));

  await Promise.all(
    users.map(user => {
      console.log(`Creating user at ${user.id}`);
      initFirebasePosition(user);
    }),
  );

  users = users.map(user => ({
    ...user,
    coords: getRandomCoords(user.coords),
  }));

  const updatePositionsLoop = async () => {
    while (!exitSignal) {
      users = users.map(user => ({
        ...user,
        coords: getRandomCoords(user.coords),
      }));

      for (const user of users) {
        console.log(`Updating user at ${user.id}`);
        await updateFirebasePosition(user);
        await delay(movementInterval);

        if (exitSignal) {
          return;
        }
      }
    }
  };

  const sendMessagesLoop = async () => {
    while (!exitSignal) {
      for (const user of users) {
        const numberOfMessages = 2 + generateInteger(3);
        for (let index = 0; index < numberOfMessages; index++) {
          console.log(
            `Sending message from ${user.id} to ${userToReceiveMessage}`,
          );
          await sendMessage(user);
          await delay(messageInterval);

          if (exitSignal) {
            return;
          }
        }

        if (exitSignal) {
          return;
        }
      }
    }
  };

  await Promise.all([updatePositionsLoop(), sendMessagesLoop()]);
  shouldExit = true;
})();

process.on('SIGINT', async function () {
  console.log('Sent exit signal');
  exitSignal = true;

  while (shouldExit === false) {
    await delay(1000);
  }

  console.log('Process will exit');

  await Promise.all(
    users.map(user => {
      console.log(`Deleting user at ${user.id}`);
      return deleteFirebasePosition(user);
    }),
  );

  shouldDeleteMessages &&
    (await Promise.all(
      users.map(user => {
        console.log(
          `Deleting messages from ${user.id} to ${userToReceiveMessage}`,
        );
        return deleteMessages(user);
      }),
    ));

  process.exit();
});
