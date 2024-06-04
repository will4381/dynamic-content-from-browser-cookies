Based on the cookies the user has been assigned from the webpage, /set-cookies, we can dynamically change the content they see to create hyper personalization. Not sure if this would be worth pursuing more, as to create a highly personalized landscape you would need extensive behavioural tracking.

This implementation uses Groq.ai due to the low latency and the ~1250 tokens per second on Llama 3-8b model. Latency usually runs about ~400ms with OpenAI's GPT-3.5 latency was inconsistent sitting around 1-3 seconds.
