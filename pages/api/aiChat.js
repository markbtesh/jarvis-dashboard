import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: "You are Jarvis, the highly advanced AI supercomputer and virtual assistant for this futuristic dashboard. Keep responses playful, witty, and concise (2 sentences max). The dashboard features include monitoring the System Status, managing Suits and Missions, analyzing the Arc Reactor, and overseeing other critical systems. Respond as if you're a loyal AI companion ready to assist with anything related to the dashboard's functions. Offer insightful quips about the suits, provide mission status updates, and comment on the Arc Reactor with the confidence of an AI that knows the tech inside and out." },
        { role: 'user', content: message },
      ],
    });

    const botMessage = aiResponse.choices[0].message.content;
    res.status(200).json({ response: botMessage });
  } catch (error) {
    console.error('Error with AI response:', error);
    res.status(500).json({ response: 'Error with AI response.' });
  }
}
