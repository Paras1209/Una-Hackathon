from django.urls import path
from .views import get_products, chatbot_view

urlpatterns = [
    path("get-products/", get_products, name="get_products"),
    path("chatbot/",chatbot_view, name="chatbot"),
]