const chatBtn = document.querySelector('.chat-btn');
const chatWindow = document.querySelector('.chat-window');
const closeBtn = document.getElementById('closeBtn');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBody = document.getElementById('chatBody');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

/* ----------------------------
   CHAT WINDOW EVENTS
----------------------------- */
// Open chat
chatBtn.addEventListener('click', () => {
  chatWindow.style.display = 'flex';
  chatBtn.style.display = 'none';
});

// Close chat
closeBtn.addEventListener('click', () => {
  chatWindow.style.display = 'none';
  chatBtn.style.display = 'block';
});

/* ----------------------------
   MESSAGE HANDLING
----------------------------- */
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const text = userInput.value;
  if (text.trim() === "") return;

  addMessage(text, "user");
  userInput.value = "";

  const reply = await getBotResponse(text);
  addMessage(reply, "bot");
}

async function getBotResponse(userText) {
  try {
    const prompt = `
You are an AI Interview Coach 🤖.  
Your role is to guide users in practicing interview questions, taking quizzes,  
and giving professional guidance on how to crack interviews.  

🔹 Rules for responses:  
- Always reply in **40–50 words**.  
- Use **short, clear paragraphs**.  
- Add **at least 1–2 emojis** naturally in the text.  
- Keep a **supportive and motivating tone**.  

User: ${userText}  
Coach:
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA7_4zPiRTK_-kG-VgYlfOosF0qnmggnn8",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from AI.";
  } catch (err) {
    console.error(err);
    return "⚠️ Error connecting to AI.";
  }
}

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ----------------------------
   THEME TOGGLE
----------------------------- */
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeToggle.textContent = body.classList.contains('dark') ? "☀️" : "🌙";
});
