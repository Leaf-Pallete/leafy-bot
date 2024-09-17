import type { AllowedMentions } from '@/types';
import type { APIAllowedMentions } from 'discord-api-types/v10';
import { Rest } from 'discord-hono';

export async function sendDiscordMessage(
  content: string,
  discordToken: string,
  channelId: string,
  allowedMentions: AllowedMentions = { parse: [] },
): Promise<void> {
  const rest = new Rest(discordToken);
  try {
    await rest.post('/channels/{channel.id}/messages', [channelId], {
      content: content,
      allowed_mentions: allowedMentions as APIAllowedMentions,
    });
  } catch (error) {
    console.error('Failed to send Discord message:', error);
    throw new Error('Failed to send Discord message');
  }
}
