from fastapi import FastAPI
from google import genai
from pydantic import BaseModel

app = FastAPI()

client = genai.Client(api_key="YOUR_API_KEY")

class AnswerRequest(BaseModel):
    question: str
    answer: str

@app.get("/question")
def list_models(topic: str):
    response = client.models.generate_content(
        model = "models/gemini-2.5-flash",
        contents=f"""Generate ONLY one short {topic} interview question.

        Rules:
        - Only return the question
        - No explanation
        - No examples
        - No extra text
        - Max 1 sentence
        """

    )
    return {"question": response.text}

@app.post("/evaluate")
def evaluate_answer(req: AnswerRequest):
    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
       contents=f"""
            You are a helpful and friendly technical interviewer.

            Question: {req.question}
            Answer: {req.answer}

            Evaluate briefly.

            Rules:
            - Give score out of 10
            - Give 2–3 lines feedback only
            - Be polite and constructive
            - No long paragraphs
            - Keep it simple

            Format:
            Score: X/10
            Feedback: <short response>
            """
    )

    return {"result": response.text.strip()}
