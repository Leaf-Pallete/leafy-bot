import type { CommandContext } from 'discord-hono';

export function apresentarCommand(c: CommandContext) {
  return c.res(`🍃 **Bem-vindo à Leaf Palette!** 🎨
Olá, eu sou a Leafy, sua companheira criativa no universo do design! 🌿✨
🔍 **O que você encontrará aqui?**
- Networking valioso para o crescimento profissional
- Desafios reais para o aprimoramento de habilidades
- Reuniões Semanais para a discussão de novas features para o projeto
Seja você iniciante no mundo do design ou um desenvolvedor experiente, a Leaf Palette tem algo especial reservado para você. Venha fazer parte deste projeto! 💡🚀
`);
}
