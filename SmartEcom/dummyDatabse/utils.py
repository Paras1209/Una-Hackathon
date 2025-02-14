import google.generativeai as genai
import requests
import json

def get_scs_from_gemini(user_chat_history):
    """Uses Gemini to rank products based on inferred user preferences."""
    
    # Fetch products from Django API
    response = requests.get("http://127.0.0.1:8000/products/get-products/")
    products = response.json().get("products", [])

    # Generate prompt for Gemini
    prompt = f"""
    You are an AI shopping assistant. Based on the following user chat history, infer the user's preferences.
    Then, rank the following products based on how well they match the user's preferences.

    User Chat History:
    {user_chat_history}

    Products:
    {json.dumps(products)}

    Return a 1-5 JSON list of product_id with an "scs" score from 0 to 100.
    """

    # Get response from Gemini
    response = genai.generate_text(prompt)
    
    return json.loads(response.text)
