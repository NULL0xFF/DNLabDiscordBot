import 'dotenv/config';
import express from 'express';
import {InteractionResponseType, InteractionType,} from 'discord-interactions';
import {getRandomEmoji, VerifyDiscordRequest} from './utils.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const {type, id, data} = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({type: InteractionResponseType.PONG});
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const {name} = data;

    // "hello" command
    if (['hello', '안녕', '안녕하세요'].includes(name)) {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ' + getRandomEmoji(),
        },
      });
    }
    // "help" command
    if (['help', 'commands', '도움', '명령어'].includes(name)) {
    }
    // "select" command
    if (['select', 'poll', '선택', '랜덤', '투표'].includes(name)) {
    }

    // "dice" command
    if (['dice', '주사위'].includes(name)) {
    }
    // "search" command
    if (['search', '검색'].includes(name)) {
    }
    // "rps" command
    if (['rps', 'rockpaperscissor', 'gbb', 'gawibawibo', '가위바위보'].includes(
        name)) {
    }
    // "fortune" command
    if (['fortune', '타로'].includes(name)) {
    }
    // "out" command
    if (['out', '에바', '에반데'].includes(name)) {
    }
    // "food" command
    if (['food', '밥', '식단'].includes(name)) {
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
