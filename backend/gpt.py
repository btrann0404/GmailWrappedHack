from openai import OpenAI

client = OpenAI(api_key="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")

def truncate_text(text, max_length=6000):
    """Truncate the text to a maximum approximate length, considering token limits."""
    if len(text) > max_length:
        return text[:max_length] + "..."
    return text

def categorize(email_body, categories):
    prompt = "I want you to categorize this into separate categories and only respond with a the single word: "
    catstring = ", ".join(categories)
    prompt += catstring

    chat_log = [
    #ai personality and role (Generic Prompt) 
    {"role": "system", "content": prompt},
     #establish tone and how you want the ai answer
    {"role": "assistant", "content": "I will give you a one word answer that makes the most sense for the category I believe it should be in."},
    ]

    email_body = truncate_text(email_body)

    chat_log.append({"role": "user", "content": email_body})
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages = chat_log
    )

    assistant_response = response.choices[0].message.content
    result = assistant_response.strip("\n").strip()
    chat_log.append({"role": "assistant", "content": result})

    return result

def summarize(input_text):
    chat_log = [
    #ai personality and role
    {"role": "system", "content": "Summarize trying to include as much important information for the user as possible and use transitions for the best readability. The email is targeted at the reader."},
     #establish tone and how you want the ai answer
    {"role": "assistant", "content": "I will give you a summarized one of the text with important point you should know in only a few sentences, 5 sentences max."},
    ]

    input_text = truncate_text(input_text)

    chat_log.append({"role": "user", "content": input_text})
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages = chat_log
    )

    assistant_response = response.choices[0].message.content
    result = assistant_response.strip("\n").strip()
    chat_log.append({"role": "assistant", "content": result})

    return result

if __name__ == "__main__":
    print(1)