export default function handler(req, res) {
    const questionsDB = {
      "React": [
        { question: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Xtreme"], answer: "JavaScript XML" },
        { question: "Which hook is used for state?", options: ["useState", "useEffect", "useContext"], answer: "useState" }
      ],
      "Node.js": [
        { question: "What is Express.js?", options: ["A database", "A framework", "A UI library"], answer: "A framework" }
      ],
    };
  
    const skill = req.query.skill;
    const questions = (questionsDB[skill] || []).slice(0, 10); // Get max 10 questions
    res.status(200).json(questions);
  }
  