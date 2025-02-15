from django.shortcuts import render
from django.http import JsonResponse
from .models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from .utils import get_scs_from_gemini  # ✅ Importing SCS function

# ✅ Get all products (Fixed duplicate function issue)
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# ✅ Chatbot View for AI-based recommendations
@api_view(['POST'])
def chatbot_view(request):
    try:
        data = request.data
        user_chat_history = data.get("chat_history", "")

        # ✅ Get SCS (Smart Compatibility Score) from Gemini
        ranked_products = get_scs_from_gemini(user_chat_history)

        return Response({"ranked_products": ranked_products})

    except Exception as e:
        return Response({"error": str(e)}, status=400)
