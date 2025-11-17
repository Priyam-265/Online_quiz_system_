// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());

// // ✅ Allowed origins (must include your frontend!)
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://127.0.0.1:3000",
//   "https://online-quiz-system-front.onrender.com", // ✅ frontend, not backend
// ];

// // ✅ Global CORS middleware
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));

// const client = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// });

// // ✅ Health check
// app.get("/", (req, res) => {
//   res.send("✅ Backend is live!");
// });

// // ✅ Chat endpoint
// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await client.chat.completions.create({
//       model: "deepseek/deepseek-chat",
//       messages: [
//         { role: "system", content: "You are Nat, a friendly and cute AI assistant." },
//         { role: "user", content: message },
//       ],
//     });

//     res.json({ reply: response.choices[0].message.content });
//   } catch (err) {
//     console.error("❌ AI error:", err.response?.data || err.message || err);
//     res.status(500).json({ error: err.response?.data || err.message });
//   }
// });

// // ✅ Use Render’s provided PORT
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// ✅ CORS setup - Updated for Vite port 5173
const allowedOrigins = [
  "http://localhost:5173",        // ✅ Your Vite frontend
  "http://127.0.0.1:5173",        
  "http://localhost:3000",        
  "http://127.0.0.1:3000",
  "https://online-quiz-system-front.onrender.com",
  "https://online-quiz-system-react-front.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST"],
}));

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is live!");
});

// ✅ Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    console.log("📩 Received message:", message); // Debug log

    const response = await client.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: "You are Nat, a friendly and cute AI assistant for a quiz website. Keep responses short and friendly!" },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    console.log("✅ Sending reply:", reply); // Debug log
    
    res.json({ reply });
  } catch (err) {
    console.error("❌ AI error:", err.response?.data || err.message || err);
    res.status(500).json({ 
      error: "Sorry, I'm having trouble connecting right now. 😢",
      details: err.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Accepting requests from: ${allowedOrigins.join(", ")}`);
});