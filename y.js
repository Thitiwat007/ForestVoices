const launcher = document.getElementById("chat-launcher");
const chatbot = document.getElementById("chatbot-container");
const chatBody = document.getElementById("chat-body");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("chat-input");

let step = "idle";

launcher.onclick = () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
};

function startFlow() {
  const buttons = document.querySelectorAll(".chat-button");
  buttons.forEach(btn => btn.remove());

  step = "mainMenu";
  showMainMenu();
}

sendBtn.onclick = () => handleInput();
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleInput();
});

function handleInput() {
  const text = input.value.trim();
  if (!text) return;

  addUser(text);
  input.value = "";

  const greetingWords = ["สวัสดี", "มีคำถาม", "hello", "โหล"];

  if (greetingWords.some(word => text.toLowerCase().includes(word))) {
    step = "mainMenu";
    showMainMenu();
    return;
  }

  const randomReplies = [
    "พิมพ์ใหม่ได้ไหมค่ะ?",
    "ไม่เข้าใจ ช่วยพิมพ์อีกทีได้ไหมคะ?",
    "ลองพิมพ์อีกทีได้ไหมคะ?"
  ];

  const randomPick = randomReplies[Math.floor(Math.random() * randomReplies.length)];
  addBot(randomPick);
}

function showMainMenu() {
  addBot("กรุณาเลือกหัวข้อค่ะ");

  addButtons([
    { text: "แนะนำ/ติชมเว็บไซต์", action: openFeedback },
  ]);
}

function openFeedback() {
  addBot("กำลังนำคุณไปยังแบบฟอร์มแนะนำ/ติชมเว็บไซต์ค่ะ...");

  const googleLink = "https://forms.gle/itp8rNdbYbcGe7Bx6";

  setTimeout(() => {
    window.open(googleLink, "_blank");
  }, 600);
}

function finalStep(choiceText) {
  addUser(choiceText);

  setTimeout(() => {
    addBot("ขอบคุณค่ะ ขอให้มีความสุขนะคะ ❤️");
  }, 400);

  step = "idle";
}

function addBot(text) {
  const msg = document.createElement("div");
  msg.className = "bot-msg";
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addUser(text) {
  const msg = document.createElement("div");
  msg.className = "user-msg";
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addButtons(btnList) {
  const box = document.createElement("div");
  box.className = "button-group";

  btnList.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "chat-button";
    btn.innerText = item.text;

    btn.onclick = () => {
      box.remove();
      item.action(item.text);
    };

    box.appendChild(btn);
  });

  chatBody.appendChild(box);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function toggleMenu() {
    let menu = document.getElementById("mobileMenu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}
document.querySelectorAll(".dropdown .dropbtn").forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
    });
});

function toggleMenu() {
    let menu = document.getElementById("mobileMenu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}
