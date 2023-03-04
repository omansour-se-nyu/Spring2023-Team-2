import http

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from django.utils.html import escape
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseForbidden
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from mentcarebackend.serializers import MentcareSerializer, MentcareLoginsSerializer
from mentcarebackend.models import MentcareModel, MentcareLoginsModel
from rest_framework.permissions import IsAuthenticated, AllowAny


class AuthenticatedView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        if request.user.is_authenticated:
            return Response(status.HTTP_200_OK)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


class ListMentcareLoginsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]
    queryset = MentcareLoginsModel.objects.all()
    serializer_class = MentcareLoginsSerializer

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'password': str(request.auth),  # None
        }
        return Response(content)


# Create your views here.
class ListMentcareAPIView(ListAPIView):
    """This endpoint list all the available items from the database"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["get"]


class CreateMentcareAPIView(CreateAPIView):
    """This endpoint allows for creation of a item"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["post"]


class UpdateMentcareAPIView(UpdateAPIView):
    """This endpoint allows for updating a specific item"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["put"]


class DeleteMentcareAPIView(DestroyAPIView):
    """This endpoint allows for deletion of a specific item from the database"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["delete"]
