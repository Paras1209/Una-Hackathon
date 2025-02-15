# from django.urls import path
# from .views import get_products

# urlpatterns = [
#     path("get-products/", get_products, name="get_products"),
# ]

from django.urls import path
from .views import get_products

urlpatterns = [
    path("get-products/", get_products, name="get_products"),
]