import { Button, Components, DiscordHono } from 'discord-hono';

const app = new DiscordHono()
  .command('ola', (c) => c.res('Olá! Como posso ajudar?'))
  .command('help', (c) =>
    c.res({
      content: `text: ${c.var.text}`,
      components: new Components().row(
        new Button('https://discord-hono.luis.fun', 'Docs', 'Link'),
        new Button('delete-self', 'Deletar', 'Secondary').emoji({ name: '🗑️' }),
      ),
    }),
  )
  .component('delete-self', (c) => c.resDeferUpdate(c.followupDelete))
  .command('apresentar', (c) => {
    return c.res(`🍃 **Bem-vindo à Leaf Palette!** 🎨
Olá, eu sou a Leafy, sua companheira criativa no universo do design! 🌿✨
🔍 **O que você encontrará aqui?**
- Networking valioso para o crescimento profissional
- Desafios reais para o aprimoramento de habilidades
- Reuniões Semanais para a discussão de novas features para o projeto
Seja você iniciante no mundo do design ou um desenvolvedor experiente, a Leaf Palette tem algo especial reservado para você. Venha fazer parte deste projeto! 💡🚀
`);
  })
  .component('delete-self', (c) => c.resDeferUpdate(c.followupDelete));
export default app;
