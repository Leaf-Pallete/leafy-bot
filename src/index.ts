import { env } from 'node:process';
import { DiscordHono } from 'discord-hono';
import { Hono } from 'hono';
import { apresentarCommand } from './commands/apresentar';
import { helpCommand } from './commands/help';
import { olaCommand } from './commands/ola';
import { handleGitHubWebhook } from './integrations/github/handler';
import { verifyGitHubSignature } from './integrations/github/webhook';

export type Env = {
  Bindings: {
    DISCORD_APPLICATION_ID: string;
    DISCORD_PUBLIC_KEY: string;
    DISCORD_TOKEN: string;
    DISCORD_GUILD_ID: string;
    DISCORD_CHANNEL_ID: string;
    GITHUB_WEBHOOK_SECRET: string;
  };
};

// Main Hono app
const app = new Hono<Env>();

// Discord bot setup
const discord = new DiscordHono<Env>();

discord.command('ola', (c) => {
  console.log('Comando ola recebido', c.env);
  return olaCommand(c);
});
discord.command('help', helpCommand);
discord.command('apresentar', apresentarCommand);

discord.component('delete-self', (c) => c.resDeferUpdate(c.followupDelete));

// Rota raiz para verificação básica
app.get('/', (c) => c.text('Leafy Bot is running!'));

// Mount Discord interactions
app.mount('/interaction', discord.fetch);

// GitHub webhook routes
app.get('/github-webhook', (c) => c.text('GitHub Webhook endpoint is active'));
app.post('/github-webhook', async (c) => {
  const payload = await c.req.json();
  const signature = c.req.header('X-Hub-Signature-256');
  const event = c.req.header('X-GitHub-Event');
  const githubSecret = c.env.GITHUB_WEBHOOK_SECRET;
  const discordToken = c.env.DISCORD_TOKEN;
  const channelId = c.env.DISCORD_CHANNEL_ID;

  if (!signature || !event) {
    return c.text('Missing signature or event type', 400);
  }

  if (
    !verifyGitHubSignature(JSON.stringify(payload), signature, githubSecret)
  ) {
    return c.text('Invalid signature', 403);
  }

  return handleGitHubWebhook(c, payload, event, discordToken, channelId);
});

export default app;
