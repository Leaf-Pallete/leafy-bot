import type { PullRequestPayload } from '@/types';
import { sanitizeString } from '@/utils/sanitizer';
import type { Context } from 'hono';
import { sendDiscordMessage } from '../discord/api';

export async function handleGitHubWebhook(
  c: Context,
  payload: any,
  event: string,
) {
  try {
    if (event === 'pull_request' && payload.action === 'opened') {
      const prPayload = payload as PullRequestPayload;

      const sanitizedTitle = sanitizeString(prPayload.pull_request.title);
      const sanitizedAuthor = sanitizeString(prPayload.pull_request.user.login);
      const sanitizedRepo = sanitizeString(prPayload.repository.full_name);
      const sanitizedUrl = sanitizeString(prPayload.pull_request.html_url);

      const message = `🌿 Novo Pull Request aberto!\n\nTítulo: ${sanitizedTitle}\nAutor: ${sanitizedAuthor}\nRepositório: ${sanitizedRepo}\nLink: ${sanitizedUrl}`;

      await sendDiscordMessage(message, { parse: [] });
      console.log(`Processed pull request: ${sanitizedTitle}`);
      return c.text('Webhook processed successfully', 200);
    }
    console.log(`Received event: ${event}, action: ${payload.action}`);
    return c.text('Event processed', 200);
  } catch (error) {
    console.error('Error processing webhook:', error);
    return c.text('Error processing webhook', 500);
  }
}
