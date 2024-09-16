import { Command, register } from 'discord-hono';
import { env } from './utils/env';

const commands = [
  new Command('ola', 'Responde com uma saudação'),
  new Command('help', 'Mostra informações de ajuda'),
  new Command(
    'apresentar',
    'Faz a Leafy se apresentar (apenas para administradores)',
  ),
];

async function registerCommands() {
  const applicationId = env.DISCORD_APPLICATION_ID;
  const token = env.DISCORD_TOKEN;

  if (!applicationId || !token) {
    console.error(
      'DISCORD_APPLICATION_ID ou DISCORD_TOKEN não estão definidos no arquivo .env',
    );
    process.exit(1);
  }

  try {
    await register(commands, applicationId, token);
    console.log('Comandos registrados globalmente com sucesso');
  } catch (error) {
    console.error('Erro ao registrar os comandos:', error);
    process.exit(1);
  }
}

registerCommands();
