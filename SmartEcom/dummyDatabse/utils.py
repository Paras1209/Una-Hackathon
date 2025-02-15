import google.generativeai as genai
import requests
import json

def get_scs_from_gemini(user_chat_history):
    """Uses Gemini to rank products based on inferred user preferences."""

    response = requests.get("http://127.0.0.1:8000/products/get-products/")
    response_data = response.json() 
    print("✅ API Response:", response_data) 

    if isinstance(response_data, list):
        products = response_data 
    elif isinstance(response_data, dict):
        products = response_data.get("products", [])
    else:
        products = []


    if not products:
        print("⚠️ No products found in API response!")
        return {"ranked_products": []}

    print("✅ Products Fetched:", products)  

    prompt = f"""
    You are an AI shopping assistant. Based on the user's chat history, determine their preferences.
    Rank the following products based on how well they match the user's needs.

    User Chat History:
    {user_chat_history}

    Products:
    {json.dumps(products, indent=2)}

    Output a JSON list with "product_id" and "scs" score (0-100), like this:
    [
      {{"product_id": "P123", "scs": 95}},
      {{"product_id": "P124", "scs": 90}}
    ]
    """

    print("🔹 Gemini Prompt Sent:\n", prompt) 

    # Get response from Gemini
    response = genai.GenerativeModel("gemini-pro").generate_content(prompt)


    print("🔹 Gemini Response:\n", response.text)  

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        print("⚠️ Gemini returned invalid JSON!")
        return {"ranked_products": []}
