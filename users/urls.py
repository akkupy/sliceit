from django.urls import path
from .views import signup,signin,signout

urlpatterns = [
    path('signup/', signup),
    path('login/', signin),
    path('logout/',signout),
]
