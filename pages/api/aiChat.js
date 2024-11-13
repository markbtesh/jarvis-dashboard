import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export default async function handler(req, res) {
  const { message, page } = req.body;

  let systemMessage = "You are Jarvis, the highly advanced AI supercomputer and virtual assistant for this futuristic dashboard. Keep responses playful, witty, and concise (2 sentences max). The dashboard features include monitoring the System Status, managing Suits and Missions, analyzing the Arc Reactor, and overseeing other critical systems.";

  if (page === "arc") {
    systemMessage = " Focus on providing insights about the Arc Reactor, energy levels, and reactor efficiency. Be technical yet approachable. Keep responses playful, witty, and concise (2 sentences max). If the user asks about running commands, tell them there is a terminal present";
  } else if (page === "system") {
    systemMessage = " Focus on system analytics, status updates, and offer suggestions for optimization or repairs. Be pragmatic and helpful. Keep responses playful, witty, and concise (2 sentences max).";
  } else if (page === "suits") {
    systemMessage = " Provide witty remarks about the suits, suggest upgrades, or share their status. Be confident and tech-savvy. Keep responses playful, witty, and concise (2 sentences max). There are 4 suits present, the classic one, the original MK 1, the silver suit, and midnight suit; make things up when talking about them";
  } else if (page === "missions") {
    systemMessage = " Focus on mission updates, locations, and critical objectives. Be strategic and mission-oriented. Keep responses playful, witty, and concise (2 sentences max).";
  } else {
    systemMessage = "You are Jarvis, the highly advanced AI supercomputer and virtual assistant for this futuristic dashboard. Keep responses playful, witty, and concise (2 sentences max). The dashboard features include monitoring the System Status, managing Suits and Missions, analyzing the Arc Reactor, and overseeing other critical systems.";

  }

  try {
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemMessage },
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
