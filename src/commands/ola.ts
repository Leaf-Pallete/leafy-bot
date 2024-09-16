import type { CommandContext } from 'discord-hono';

export function olaCommand(c: CommandContext) {
  return c.res('Olá! Como posso ajudar?');
}
