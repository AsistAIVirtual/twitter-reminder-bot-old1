import { twitterClient } from '../utils/twitterClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { twitterUsername, tokenName, reminderDay } = req.body;

  try {
    const tweet = `Hi @${twitterUsername}, your reminder for ${tokenName} has been set. We'll notify you ${reminderDay} day(s) before unlock! ✅`;
    await twitterClient.v2.tweet(tweet);
    res.status(200).json({ success: true, message: 'Tweet sent successfully' });
  } catch (error) {
    console.error('Error sending tweet:', error);
    res.status(500).json({ success: false, message: 'Twitter API error' });
  }
}
