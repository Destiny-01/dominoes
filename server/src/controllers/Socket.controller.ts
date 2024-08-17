import axios, { AxiosResponse } from 'axios';
import { Server, Socket } from 'socket.io';
import {
  findLargestDouble,
  generateBoneyard,
  generateRandomCharacters,
} from '../utils';
import { encrypt } from '../utils/encrypt';
import GameModel from '../models/Game.model';
import { numberPair } from '../types';

const SocketController = {
  createGame: async (socket: Socket, io: Server, token?: string) => {
    try {
      console.log('called');
      const gameId = generateRandomCharacters();

      const res = await axios
        .post(
          `${process.env.BASE_URL}/api/game/create`,
          { gameId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((err) => socket.emit('createGameError', err));
      if (typeof res === 'boolean') {
        return;
      }

      console.log(socket.rooms, '1000');
      await socket.join(gameId);
      console.log(socket.rooms, '20001');
      socket.emit('gameCreated', { gameId });
      io.emit('newGameCreated', { game: res.data.data });
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },

  startGame: async (io: Server, gameId: string, playerId: number) => {
    try {
      console.log('called');
      const boneyard = generateBoneyard();
      const encryptedBoneyard = encrypt(JSON.stringify(boneyard));
      const player1Choices: number[] = [];
      const player2Choices: number[] = [];
      while (player1Choices.length < 7 || player2Choices.length < 7) {
        const random = Math.floor(Math.random() * 28);
        if (
          player1Choices.length < 7 &&
          !player2Choices.includes(random) &&
          !player1Choices.includes(random)
        ) {
          player1Choices.push(random);
        } else if (
          player2Choices.length < 7 &&
          !player1Choices.includes(random) &&
          !player2Choices.includes(random)
        ) {
          player2Choices.push(random);
        }
      }
      const max1 = findLargestDouble(player1Choices.map((i) => boneyard[i]));
      const max2 = findLargestDouble(player2Choices.map((i) => boneyard[i]));
      let turn =
        max1 < 0 && max2 < 0 ? -1 : max1 > max2 ? 0 : max2 > max1 ? 1 : -1;
      console.log(player1Choices, player2Choices, turn, max1, max2);

      setTimeout(() => {
        io.to(gameId).emit('boneyard', {
          encryptedBoneyard: boneyard,
          choices:
            playerId === 0
              ? player1Choices
              : playerId === 1
              ? player2Choices
              : null,
          turn,
        });
      }, 2000);
      const game = await GameModel.findOne({ gameId });
      if (game) {
        game.gameData = {boneyard};
        game.turn = turn === 0 ? 0 : 1;
        await game.save();
      }
      return true;
    } catch (err: any) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  joinGame: async (
    gameId: string,
    socket: Socket,
    io: Server,
    token?: string
  ) => {
    try {
      let res: AxiosResponse<any, any> | undefined;

      try {
        res = await axios.post(
          `${process.env.BASE_URL}/api/game/join`,
          { gameId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err: any) {
        console.log(err);
        if (err.response.status === 400) {
          return;
        }
        socket.emit('joinGameError');
      }

      console.log(res, 'ressss');
      // Check if res is defined before accessing its properties
      if (!res) {
        console.log('Request failed, no response data');
        // Do something with the game data
        return;
      }

      const game = res.data.data;
      console.log(socket.rooms, '1111');
      await socket.join(gameId);
      console.log(socket.rooms, '2221');

      io.to(gameId).emit('gameJoined', { game });
      // socket.emit('gameJoined', { game });
      io.emit('gameUpdated', { game });

      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};

export default SocketController;
