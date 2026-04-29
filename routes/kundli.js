import express from "express";
import { verifyToken } from "../middleware/auth.js";
import axios from "axios";

const router = express.Router();

router.post("/generate", verifyToken, async (req, res) => {
  try {
    const { name, dob, time, place } = req.body;

    const prompt = `તમે એક અનુભવી જ્યોતિષ છો. નીચેની વ્યક્તિની જન્મ વિગતો આધારે ગુજરાતીમાં સંક્ષિપ્ત કુંડળી વિશ્લેષણ આપો:

નામ: ${name}
જન્મ તારીખ: ${dob}
જન્મ સમય: ${time}
જન્મ સ્થળ: ${place}

આ વિષયો આવરી લો:
1. રાશિ અને લગ્ન
2. વ્યક્તિત્વ
3. કારકિર્દી
4. પ્રેમ અને લગ્ન
5. સ્વાસ્થ્ય
6. ભાગ્ય

ટૂંકમાં અને સ્પષ્ટ જવાબ આપો.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const kundliText = response.data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      name,
      dob,
      time,
      place,
      kundli: kundliText,
    });
  } catch (err) {
    res.json({ message: "Error", error: err.message });
  }
});

export default router;
