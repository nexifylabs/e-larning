export default async function checkQuiz(req, res) {
    const data = JSON.parse(req.body);

    const passedQuiz = checkAnswers(data);

    res.status(200).json({ success: passedQuiz });
}
