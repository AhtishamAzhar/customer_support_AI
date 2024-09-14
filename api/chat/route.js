export async function POST(req) {
  try {
    const data = await req.json();
    const userMessage = data.content;

    
    const responses = {
      "hello": "Hi there! How can I help you today?",
      "how are you": "I'm just a bot, I'm doing great! How about you?",
      "bye": "Goodbye! Have a great day!",
    };

    const responseMessage = responses[userMessage.toLowerCase()] || "Sorry, I don't understand that.";

    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(responseMessage));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}