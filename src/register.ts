import { Command, Option, register } from 'discord-hono';

const commands = [
  new Command('ola', 'Responde com uma saudação'),
  new Command('help', 'response help').options(new Option('text', 'with text')),
];

register(
  commands,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  process.env.DISCORD_TEST_GUILD_ID,
);
