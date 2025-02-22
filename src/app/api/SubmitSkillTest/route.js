export default function handler(req, res) {
    const { skill, answers } = req.body;

    const correctAnswers = {
        "React": ["JavaScript XML", "useState"],
        "Node.js": ["A framework"]
    };

    let score = 0;
    const correctList = correctAnswers[skill] || []; // Default empty array if skill not found

    Object.values(answers).forEach((ans, i) => {
        if (correctList[i] && ans === correctList[i]) score++;
    });

    const passed = (score / correctList.length) * 100 >= 70; // Pass if 70% correct

    if (passed) {
        console.log(`User passed the test for ${skill}. Sending confirmation email...`);
    }

    res.status(200).json({ passed, score });
}
