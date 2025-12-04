// ==== Chat Bot (Portfolio Section) ====

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// If the chat section exists on this page
if (chatWindow && chatForm && userInput) {
  // Welcome message
  window.addEventListener("load", () => {
    addBotMessage("Hi, I'm your portfolio bot 🤖. Ask me about my projects or skills!");
  });

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = userInput.value.trim();
    if (text === "") return;

    addUserMessage(text);
    userInput.value = "";

    setTimeout(() => {
      const reply = getBotReply(text);
      addBotMessage(reply);
    }, 500);
  });
}

function addMessage(text, sender = "bot") {
  const row = document.createElement("div");
  row.classList.add("message-row", sender);

  const meta = document.createElement("div");
  meta.classList.add("message-meta");

  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.textContent = text;

  if (sender === "user") {
    msg.classList.add("user-msg");
  } else {
    msg.classList.add("bot-msg");
  }

  const time = document.createElement("div");
  time.classList.add("time");
  time.textContent = getCurrentTime();

  meta.appendChild(msg);
  meta.appendChild(time);
  row.appendChild(meta);

  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addUserMessage(text) {
  addMessage(text, "user");
}

function addBotMessage(text) {
  addMessage(text, "bot");
}

// Simple auto-reply logic (custom for portfolio)
function getBotReply(userText) {
  const msg = userText.toLowerCase();

  if (msg.includes("hi") || msg.includes("hello")) {
    return "Hello 👋, thanks for visiting my portfolio!";
  }
  if (msg.includes("project") || msg.includes("projects")) {
    return "I have projects like portfolio site, chess game, shopping app, food order app, and movie ticket booking. Which one do you want to know about? 🎯";
  }
  if (msg.includes("skills") || msg.includes("skill")) {
    return "My main skills are HTML, CSS, JavaScript and full-stack Python (Flask/Django basics). 💻";
  }
  if (msg.includes("contact") || msg.includes("email")) {
    return "You can contact me through the Contact section below or via the email shown there. 📧";
  }
  if (msg.includes("github")) {
    return "Check the Projects section for my GitHub links. I’ve added each project there. 🧑‍💻";
  }
  if (msg.includes("bye") || msg.includes("thank")) {
    return "Thank you for chatting! 😊";
  }

  return "Nice question! You can scroll through my portfolio sections for more details, or ask me about projects, skills, or contact info. 🙂";
}

function getCurrentTime() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  if (m < 10) m = "0" + m;
  return h + ":" + m;
}