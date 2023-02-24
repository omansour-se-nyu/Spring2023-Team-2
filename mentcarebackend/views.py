from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from mentcarebackend.serializers import MentcareSerializer
from mentcarebackend.models import MentcareModel
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class ListMentcareAPIView(ListAPIView):
    """This endpoint list all of the available items from the database"""
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
