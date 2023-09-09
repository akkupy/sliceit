from django.shortcuts import render,redirect
from .models import User
from django.contrib.admin.forms import AuthenticationForm
from django.contrib.auth import authenticate,login,logout
from django.urls import reverse
# Create your views here.

def signup(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.create_user(email=email,password=password)
        user.save()
        login(request,user)
        return redirect('data')
    

def signin(request):
    if request.method == "POST":
        form = AuthenticationForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)
        if user:
            if user.is_active:
                login(request,user)
                return redirect(reverse('data'))
