# 🤖 AI Interview Coach Chatbot  

An **AI-powered chatbot** designed to help users practice interview questions, gain confidence, and receive professional guidance.  
This chatbot features **light/dark mode**, real-time AI responses, and a clean interactive UI.  

---

## 🚀 Features  
- 🌓 **Light & Dark Theme Toggle**  
- 💬 **Interactive Chat Window** (open/close functionality)  
- 🤖 **AI-powered Responses** using **Google Gemini 1.5 Flash API**  
- 📱 **Responsive Design** with floating chat button  
- 🎨 **Modern UI/UX** with animations  

---

## 📂 Project Structure  

Inside **index.html**, update the API section:  

```javascript
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  }
);
👉 Replace YOUR_API_KEY with your actual Gemini 1.5 Flash API key from Google AI Studio
.
