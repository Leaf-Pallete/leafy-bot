import { Webhooks } from '@octokit/webhooks';

export async function verifyGitHubSignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const webhooks = new Webhooks({
    secret,
  });

  try {
    return await webhooks.verify(payload, signature);
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}
