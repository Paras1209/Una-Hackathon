from django.shortcuts import render
from django.http import JsonResponse
from .models import Product

# Create your views here.
def get_products(request):
    products = Product.objects.all().values(
        "product_id", "title", "category", "price", "rating", "discountPrice"
    )
    return JsonResponse({"products": list(products)})