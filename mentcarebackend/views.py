import json
from json import JSONDecodeError

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from mentcarebackend.models import *

import random
import logging
import re  # use to match string in Update


# Create your views here.

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        # print(data)

        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)
            username = data['username']
            # print(username)
            password = data['password']

            if username is None or password is None:
                return JsonResponse({'status': 'Error', 'message': 'No username or password given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            # print(password)
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({'status': 'Success', 'message': 'Login successful',
                                     'code': status.HTTP_200_OK})
            else:
                return JsonResponse({'status': 'Unauthorized', 'message': 'Access Forbidden',
                                     'code': status.HTTP_403_FORBIDDEN})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error', 'message': 'No username or password given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
# todo: add logout functionality
def logout_user(request):
    pass


@csrf_exempt
# todo: add user registration functionality
def register_user(request):
    pass


@csrf_exempt
def create_patient_records(request):
    """
    Create a patient record, and add to the database. Patient ID number is randomly generated

    :param JSON body: a patient's first name, last name, gender, date of birth, address, phone
    :return: JSON response stating patient record was successfully created
    """
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)
            first_name = data['first_name']
            last_name = data['last_name']
            gender = data['gender']
            dob = data['dob']
            address = data['address']
            phone_num = data['phone_num']

            if (first_name is None or last_name is None or gender is None or dob is None
                    or address is None or phone_num is None):
                return JsonResponse({'status': 'Error',
                                     'message': 'Missing field. Cannot create patient record',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                record = PatientInformationModel.objects.create(
                    patient_id=random.randint(1001,10000),
                    first_name=first_name,
                    last_name=last_name,
                    gender=gender,
                    dob=dob,
                    address=address,
                    phone_num=phone_num
                )

                record.save()

                return JsonResponse({'status': 'Success',
                                     'message': 'Patient record created successfully',
                                     'code': status.HTTP_201_CREATED})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error', 'message': 'No patient information given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def retrieve_patient_records(request):
    """
    Retrieve a patient's records from the database

    :param patient_id in JSON body: ID number of the patient's to be retrieved
    :return: JSON response body of patient records
    """

    if request.method == 'GET':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            patient_id = data['patient_id']

            # tests that patient_id was given and isn't NULL
            if patient_id is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Patient ID not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                record = PatientInformationModel.objects.filter(patient_id=patient_id)
                json_records = serializers.serialize("json", record)

                return JsonResponse({'status': 'Success',
                                     'message': 'Patient record successfully retrieved',
                                     'patient_information': json_records,
                                     'code': status.HTTP_200_OK})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error', 'message': 'Missing patient ID to retrieve',
                                 'code': status.HTTP_400_BAD_REQUEST})

    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def update_patient_records(request):
    """
   Update some parameter in a patient record

   :param JSON body of field to update:
   :return: JSON response stating patient record was successfully updated
   """
    if request.method == 'PUT':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            first_name = data['first_name']
            last_name = data['last_name']
            gender = data['gender']
            dob = data['dob']
            address = data['address']
            phone_num = data['phone_num']

            return JsonResponse({'status': 'Success',
                                 'message': 'Patient record successfully updated',
                                 'code': status.HTTP_200_OK})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'Missing field to update',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def delete_patient_records(request):
    """
    Delete a patient's records from the database

    :param patient_id in JSON body: ID number of the patient's to be deleted
    :return: JSON response stating patient record was successfully deleted
    """
    if request.method == 'DELETE':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)
            patient_id = data['patient_id']

            # tests that patient_id was given and isn't NULL
            if patient_id is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Patient ID not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                record = PatientInformationModel.objects.get(patient_id=patient_id)
                record.delete()

                return JsonResponse({'status': 'Success',
                                     'message': 'Patient record successfully deleted',
                                     'code': status.HTTP_200_OK})
        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No patient ID given, cannot delete patient record',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})
