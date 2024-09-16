import { Button, type CommandContext, Components } from 'discord-hono';

export function helpCommand(c: CommandContext) {
  return c.res({
    content: `Texto de ajuda: ${c.var.text}`,
    components: new Components().row(
      new Button('https://discord-hono.luis.fun', 'Documentação', 'Link'),
      new Button('delete-self', 'Deletar', 'Secondary').emoji({ name: '🗑️' }),
    ),
  });
}
