from django.urls import path

from .views import slice

urlpatterns = [
    path('slice/', slice),
]
