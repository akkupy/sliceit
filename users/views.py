from django.shortcuts import render,redirect
from .models import User
from django.contrib.auth import authenticate,login,logout
from django.urls import reverse
# Create your views here.

def signup(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        if User.objects.filter(email=email).exists():
            error_message = {
                'error' : 'Account already exists !'
            }
            return render(request,'login.html',error_message)
        else:
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
        remember_me = request.POST['remember_me']
        user = authenticate(email=email,password=password)
        if user:
            if user.is_active:
                login(request,user)
                if remember_me == 'True':
                    request.session.set_expiry(604800)
                else:
                    request.session.set_expiry(0)
                return redirect(reverse('profile'))
        else:
            error_message = {
                'error' : 'Incorrect Email or Password !'
            }
            return render(request,'login.html',error_message)

def signout(request):
    logout(request)
    return redirect(reverse('home'))