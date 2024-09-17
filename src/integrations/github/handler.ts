import type { PullRequestPayload } from '@/types';
import type { Context } from 'hono';
import { sendDiscordMessage } from '../discord/api';

export async function handleGitHubWebhook(
  c: Context,
  payload: any,
  event: string,
  discordToken: string,
  channelId: string,
) {
  try {
    if (event === 'pull_request' && payload.action === 'opened') {
      const prPayload = payload as PullRequestPayload;
      const message = formatPullRequestMessage(prPayload);
      await sendDiscordMessage(message, discordToken, channelId, {
        parse: ['users', 'roles'],
      });
      console.log(`Processed pull request: ${prPayload.pull_request.title}`);
      return c.text('Webhook processed successfully', 200);
    }
    console.log(`Received event: ${event}, action: ${payload.action}`);
    return c.text('Event processed', 200);
  } catch (error) {
    console.error('Error processing webhook:', error);
    return c.text('Error processing webhook', 500);
  }
}

function formatPullRequestMessage(payload: PullRequestPayload): string {
  const { pull_request, repository } = payload;
  const title = escapeMarkdown(pull_request.title);
  const author = escapeMarkdown(pull_request.user.login);
  const repoName = escapeMarkdown(repository.full_name);
  const prUrl = pull_request.html_url;

  return `
🌟 **Novo Pull Request Aberto!** 🌟

Temos uma nova contribuição chegando! 🎉 Aqui um breve resumo da PR:

📌 **Título:** ${title}
👤 **Autor:** ${author}
📂 **Repositório:** \`${repoName}\`
🔗 **Link:** ${prUrl}

Bora lá dar uma olhada? 👀
`;
}

function escapeMarkdown(text: string): string {
  return text.replace(/([*_`~\\])/g, '\\$1');
}
