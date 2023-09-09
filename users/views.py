from django.shortcuts import render,redirect
from .models import User
from django.contrib.admin.forms import AuthenticationForm
from django.contrib.auth import authenticate,login,logout
from django.urls import reverse
# Create your views here.

def signup(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.create_user(name=name,email=email,password=password)
        user.save()
        user = authenticate(email=email,password=password)
        if user:
            if user.is_active:
                login(request,user)
                return redirect(reverse('profile'))
    

def signin(request):
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(email=email,password=password)
        if user:
            if user.is_active:
                login(request,user)
                return redirect(reverse('profile'))
        else:
            return render(request,'errorHome.html')
