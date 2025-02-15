from django.shortcuts import render
from django.http import JsonResponse
from .models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
def get_products(request):
    products = Product.objects.all().values(
        "product_id", "title", "category", "price", "rating", "discountPrice"
    )
    return JsonResponse({"products": list(products)})
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)