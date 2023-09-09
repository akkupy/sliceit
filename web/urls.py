from django.urls import path

from .views import home,forwarder,profile
urlpatterns = [
    path('', home,name='home'),
    path('profile/',profile,name='profile'),
    path('<str:code>', forwarder),
    
]
