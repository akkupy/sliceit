from django.shortcuts import render

# Create your views here.

def signup(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        password1 = request.POST.get('password1')
        print(email,password)

