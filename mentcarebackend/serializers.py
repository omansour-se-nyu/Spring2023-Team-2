from django.contrib.auth.models import User
from rest_framework import serializers
from mentcarebackend.models import MentcareModel


class MentcareSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentcareModel
        fields = "__all__"
