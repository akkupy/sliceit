from os import environ
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import validators,secrets
from dotenv import find_dotenv,load_dotenv
from db.models import Link
# Create your views here.


load_dotenv(find_dotenv())

BASE_URL = environ.get('BASE_URL')

@api_view(['GET'])
def slice(request):
    url = request.GET.get('url')
    backHalf = request.GET.get('backhalf')
    if not validators.url(url):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if backHalf == '':
        code = "".join(secrets.choice(chars) for _ in range(6))
    else:
        code = backHalf
    unique_code = Link.objects.filter(code=code).exists()
    if unique_code:
        json = {
            'stat' : 'false',
            'result' : ''
        }
        return Response(json,status=status.HTTP_200_OK)
    else:
        if request.user.is_anonymous:
            name = 'anonymous@akkupy.me'
        else:
            name = request.user.email
        data = Link(code=code)
        data.name = name
        data.short_url = BASE_URL+'/'+code
        data.full_short_url = 'https://'+BASE_URL+'/'+code
        data.target_url = url
        data.is_active = True
        data.clicks = 0
        data.save()
        json = {
            'stat' : 'true',
            'result' : {
                'code' : BASE_URL+'/'+code,
            }
        }
        return Response(json,status=status.HTTP_200_OK)


@api_view(['GET'])
def remove(request):
    code = request.GET.get('code')
    deleteElement = Link.objects.get(code=code)
    deleteElement.delete()
    json = {
            'stat' : 'true',
        }
    return Response(json,status=status.HTTP_200_OK)