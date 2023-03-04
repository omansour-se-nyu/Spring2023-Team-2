from django.contrib.auth.models import User
from rest_framework import serializers
from mentcarebackend.models import MentcareModel, MentcareLoginsModel


class MentcareSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentcareModel
        fields = "__all__"


class MentcareLoginsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentcareLoginsModel
        fields = "__all__"