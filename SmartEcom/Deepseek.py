from google import genai

client = genai.Client(api_key="AIzaSyD8beV13xY5E7PTfER5gdCd79vYKsRfahY")  # Replace with your actual API key

prompt = """
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

✅ **2. OnePlus 11R** (*SCS: 93%*)  
📸 **50MP Sony IMX890** (high-end camera sensor)  
📺 **6.7” 120Hz AMOLED** (curved, vibrant colors)  
🔋 **5000mAh, 100W charging** (great battery life)  
⚙️ **Snapdragon 8+ Gen 1** (far superior to Exynos 2100, no heating issues)  
💰 **₹31,999** *(slightly above budget, but worth it)*  

✅ **3. Realme GT 2 Pro** (*SCS: 90%*)  
📸 **50MP Sony IMX766** (strong night mode & details)  
📺 **2K LTPO 120Hz AMOLED** (higher resolution than S21 FE)  
🔋 **5000mAh, 65W charging**  
⚙️ **Snapdragon 8 Gen 1** (far better stability than Exynos 2100)  
💰 **₹30,000** *(with offers)*  

---

Now, respond in a similar way based on the user's query.
"""

# Chat loop
chat_history = prompt  # Store conversation history

print(" Welcome! I'm your personal shopping assistant.")

while True:
    user_query = input("You: ")  # Get user input

    if user_query.lower() == "exit":  # Exit condition
        print("Assistant: Happy shopping! 😊")
        break

    chat_history += f"\nUser: {user_query}\nAssistant: "  # Append query to history

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=chat_history,
    )

    assistant_reply = response.text.strip()
    print("Assistant:", assistant_reply)

    chat_history += assistant_reply  # Append response to history
