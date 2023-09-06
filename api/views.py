from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['GET'])
def slice(request):
    print(request.GET.get('url'))

    json = {
        'ok' : 'true',
        'result' : {
            'code' : 'vizmaya.tech'
        }
    }
    return Response(json,status=status.HTTP_200_OK)