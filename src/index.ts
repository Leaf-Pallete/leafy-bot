import { DiscordHono } from 'discord-hono';
import { Hono } from 'hono';
import { apresentarCommand } from './commands/apresentar';
import { helpCommand } from './commands/help';
import { olaCommand } from './commands/ola';
import { handleGitHubWebhook } from './integrations/github/handler';
import { verifyGitHubSignature } from './integrations/github/webhook';

// Discord bot setup
const discord = new DiscordHono();

discord.command('ola', olaCommand);
discord.command('help', helpCommand);
discord.command('apresentar', apresentarCommand);

discord.component('delete-self', (c) => c.resDeferUpdate(c.followupDelete));

// Main Hono app
const app = new Hono();

// Mount Discord interactions
app.mount('/interaction', discord.fetch);

// GitHub webhook routes
app.get('/github-webhook', (c) => c.text('GitHub Webhook endpoint is active'));
app.post('/github-webhook', async (c) => {
  const payload = await c.req.json();
  const signature = c.req.header('X-Hub-Signature-256');
  const event = c.req.header('X-GitHub-Event');

  if (!signature || !event) {
    return c.text('Missing signature or event type', 400);
  }

  if (!verifyGitHubSignature(JSON.stringify(payload), signature)) {
    return c.text('Invalid signature', 403);
  }

  return handleGitHubWebhook(c, payload, event);
});

export default app;
