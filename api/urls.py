from django.urls import path

from .views import slice,remove

urlpatterns = [
    path('slice/', slice),
    path('remove/', remove),
]
