from django.shortcuts import render
from django.http import JsonResponse
import google.generativeai as genai

# Set up Google Gemini API
genai.configure(api_key="AIzaSyD8beV13xY5E7PTfER5gdCd79vYKsRfahY")
model = genai.GenerativeModel("gemini-2.0-flash")

# Predefined chat context
INITIAL_PROMPT = """
You are a shopping assistant. Help users find the best products based on their preferences.

Example:
User: I am looking for a phone.
Assistant: Sure! What features are important to you?

User: A strong camera, good display, and decent battery life. It would be great if there is some special offer or discount.
Assistant: Here are some great options under ₹30,000:
    
✅ **Samsung Galaxy S21 FE** (*SCS: 88%*)  
📸 **12MP+8MP+12MP triple camera** (great for casual photography)  
📺 **6.4” 120Hz Dynamic AMOLED** (smooth and vibrant)  
🔋 **4500mAh, 25W fast charging**  
⚙️ **Exynos 2100** (decent but not the best for gaming)  
💰 **₹29,999** *(Special Offer: ₹27,999 with bank discount)*  

User: The Galaxy S21 FE looks good, but I'm not sure about its processor. Can you review it and suggest alternatives?
Assistant: The Exynos 2100 is a power-efficient processor but has heating issues and weaker sustained performance. Here are better alternatives with similar features:

✅ **1. iQOO 9 5G** (*SCS: 91%*)  
📸 **50MP GN5 sensor** (flagship-grade camera)  
📺 **120Hz AMOLED, HDR10+** (excellent display)  
🔋 **4350mAh, 120W charging** (fastest charging here)  
⚙️ **Snapdragon 888+** (significantly better performance than Exynos 2100)  
💰 **₹29,999** *(with discounts)*  

Now, respond in a similar way based on the user's query.
"""

def chatbot_response(request):
    if request.method == "POST":
        user_message = request.POST.get("message", "")
        if not user_message:
            return JsonResponse({"error": "No message provided."})

        conversation = f"User: {user_message}\nAssistant:"
        response = model.generate_content(INITIAL_PROMPT + conversation)
        assistant_reply = response.text.strip()

        return JsonResponse({"response": assistant_reply})

    return JsonResponse({"error": "Invalid request method."})

def chat_view(request):
    return render(request, "chat.html")
