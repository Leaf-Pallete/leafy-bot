import { env } from '@/utils/env';
import { Webhooks } from '@octokit/webhooks';

const webhooks = new Webhooks({
  secret: env.GITHUB_WEBHOOK_SECRET,
});

export async function verifyGitHubSignature(
  payload: string,
  signature: string,
): Promise<boolean> {
  try {
    return await webhooks.verify(payload, signature);
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}
