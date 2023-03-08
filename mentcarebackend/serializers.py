from rest_framework import serializers
from mentcarebackend.models import *


class PatientInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInformationModel
        fields = "__all__"