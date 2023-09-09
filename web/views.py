from django.shortcuts import redirect,render
from db.models import Link
from django.contrib.auth.decorators import login_required
# Create your views here.

def home(request):
    return render(request,'index.html')


def forwarder(request,code):
    if Link.objects.filter(code=code).exists():
        data = Link.objects.filter(code=code)[0]
        data.clicks+=1
        data.save()
        return redirect(data.target_url)
    else:
        return render(request,'404.html')
        
@login_required(login_url='home')
def profile(request):
    userData = Link.objects.filter(name=request.user.name).values()
    context = {
        'linkData' : userData,
    }
    return render(request,'profile.html',context)