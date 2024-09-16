import type { AllowedMentions } from '@/types';
import { env } from '@/utils/env';
import type { APIAllowedMentions } from 'discord-api-types/v10';
import { Rest } from 'discord-hono';

const rest = new Rest(env.DISCORD_TOKEN);

export async function sendDiscordMessage(
  content: string,
  allowedMentions: AllowedMentions = { parse: [] },
): Promise<void> {
  try {
    await rest.post(
      '/channels/{channel.id}/messages',
      [env.DISCORD_CHANNEL_ID],
      {
        content: content,
        allowed_mentions: allowedMentions as APIAllowedMentions,
      },
    );
  } catch (error) {
    console.error('Failed to send Discord message:', error);
    throw new Error('Failed to send Discord message');
  }
}
