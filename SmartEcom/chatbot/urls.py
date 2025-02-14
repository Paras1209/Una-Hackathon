from django.urls import path
from .views import chatbot_response, chat_view

urlpatterns = [
    path("", chat_view, name="chat_view"),
    path("chat/", chatbot_response, name="chatbot_response"),
]
