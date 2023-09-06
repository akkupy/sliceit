from django.shortcuts import redirect,render
from db.models import Link
# Create your views here.

def home(request):
    return render(request,'index.html')


def forwarder(request,code):
    if Link.objects.filter(code=code).exists():
        data = Link.objects.filter(code=code).values()
        return redirect(data[0]['target_url'])
    else:
        render(request,'404.html')
        