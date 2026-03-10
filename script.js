
console.log("Script loaded"); 
const input = document.getElementById("user-input"); 
const button = document.getElementById("send-button"); 
const chatBox = document.getElementById("chat-box"); 
const uploadButton = document.getElementById("upload-button");
const resumeFile = document.getElementById("resume-upload");

button.addEventListener("click", async () => {
    const userInput = input.value; 
    if(userInput === "") return alert("Enter a valid message"); 
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);
    const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userInput }) // sends the user's input to the server in JSON format; the server expects a JSON object with a "message" field
    });
    const data = await response.json(); 
    console.log("Response from server:", data); 
    const aiMessage = document.createElement("div");
    aiMessage.classList.add("message", "ai");
    aiMessage.textContent = data.reply;
    chatBox.appendChild(aiMessage); 
    input.value = ""; 
    chatBox.scrollTop = chatBox.scrollHeight;
  }); 

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    button.click();
  }
});



uploadButton.addEventListener("click", async () => {

  const file = resumeFile.files[0];

  if (!file) {
    return alert("Please upload a resume PDF");
  }

  const fileMessage = document.createElement("div");
  fileMessage.classList.add("message", "user");
  fileMessage.innerHTML = `
    <div class="file-name">📄 ${file.name}</div>
   <div class="file-type">PDF Resume</div>
    `;
  chatBox.appendChild(fileMessage);
  fileMessage.scrollIntoView({ behavior: "smooth", block: "start" });
  resumeFile.value = "";
  const loading = document.createElement("div");
  loading.classList.add("message", "ai");
  loading.textContent = "Analyzing resume...";
  chatBox.appendChild(loading);

  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });

const data = await response.json();
loading.remove();

const aiMessage = document.createElement("div");
aiMessage.classList.add("analysis-card");

aiMessage.innerHTML = `
<h3>Resume Analysis</h3>
<button class="copy-btn">Copy</button>
<pre>${data.analysis}</pre>
`;

chatBox.appendChild(aiMessage);
aiMessage.scrollIntoView({ behavior: "smooth", block: "start" });

const copyButton = aiMessage.querySelector(".copy-btn");

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(data.analysis);
  copyButton.textContent = "Copied!";
});

});
