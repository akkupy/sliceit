from django.urls import path

from .views import home,forwarder

urlpatterns = [
    path('', home),
    path('<str:code>', forwarder),
]
