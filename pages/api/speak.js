// pages/api/speak.js

import AWS from 'aws-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text, voiceId } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  AWS.config.update({
    region: 'us-east-1', // Replace with your AWS region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use environment variables for security
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const polly = new AWS.Polly();
  const params = {
    Text: `<speak><prosody rate='110%' pitch='-2%'>${text}</prosody></speak>`,
  TextType: 'ssml', // Important to specify SSML type
    OutputFormat: 'mp3',
    VoiceId: voiceId || 'Brian', // Set default voice ID if not provided
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(data.AudioStream);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).json({ message: 'Error synthesizing speech' });
  }
}
