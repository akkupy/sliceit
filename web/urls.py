from django.urls import path

from .views import home,forwarder,data

urlpatterns = [
    path('', home,name='home'),
    path('<str:code>', forwarder),
    path('data/',data,name='data')
]
