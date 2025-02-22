import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));