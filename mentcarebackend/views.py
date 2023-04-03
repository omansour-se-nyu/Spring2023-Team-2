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
import pandas as pd
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

            if request.user.is_superuser:
                # user logged in is admin, return int 0 indicating user is admin
                user_id = 0
            else:
                # user logged in is staff, return int 1
                user_id = 1

            first_name = request.user.first_name
            last_name = request.user.last_name

            if user is not None:
                login(request, user)
                return JsonResponse({'status': 'Success',
                                     'message': 'Login successful',
                                     'code': status.HTTP_200_OK,
                                     'staff_username': username,
                                     'user_id': user_id,
                                     'first_name': first_name,
                                     'last_name': last_name
                                     })
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

    @param JSON body: a patient's first name, last name, gender, date of birth, address, phone
    @return: JSON response stating patient record was successfully created
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
            allergies = data['allergies']

            if (first_name is None or last_name is None or gender is None or dob is None
                    or address is None or phone_num is None):
                return JsonResponse({'status': 'Error',
                                     'message': 'Missing field. Cannot create patient record',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                record = PatientInformationModel.objects.create(
                    patient_id=random.randint(1001, 10000),
                    first_name=first_name,
                    last_name=last_name,
                    gender=gender,
                    dob=dob,
                    address=address,
                    phone_num=phone_num,
                    allergies=allergies
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

    @param patient_id in JSON body: ID number of the patient's to be retrieved
    @return: JSON response body of patient records
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

   @param JSON body of field to update:
   @return: JSON response stating patient record was successfully updated
   """
    if request.method == 'PUT':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            patient_id = data['patient_id']

            # check that a patient ID is given
            if patient_id is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Patient ID not given',
                                     'code': status.HTTP_400_BAD_REQUEST})
            else:
                # fills missing fields with pre-existing data from database, to ensure it doesn't
                # accidentally get changed
                if "first_name" not in data:
                    first_name = PatientInformationModel.objects.get(patient_id=patient_id).first_name
                else:
                    first_name = data['first_name']
                if "last_name" not in data:
                    last_name = PatientInformationModel.objects.get(patient_id=patient_id).last_name
                else:
                    last_name = data['last_name']
                if "gender" not in data:
                    gender = PatientInformationModel.objects.get(patient_id=patient_id).gender
                else:
                    gender = data['gender']
                if "dob" not in data:
                    dob = PatientInformationModel.objects.get(patient_id=patient_id).dob
                else:
                    dob = data['dob']
                if "address" not in data:
                    address = PatientInformationModel.objects.get(patient_id=patient_id).address
                else:
                    address = data['address']
                if "phone_num" not in data:
                    phone_num = PatientInformationModel.objects.get(patient_id=patient_id).phone_num
                else:
                    phone_num = data['phone_num']
                if "allergies" not in data:
                    allergies = PatientInformationModel.objects.get(patient_id=patient_id).allergies
                else:
                    allergies = data['allergies']

                record = PatientInformationModel.objects.filter(patient_id=patient_id).update(
                    first_name=first_name,
                    last_name=last_name,
                    gender=gender,
                    dob=dob,
                    address=address,
                    phone_num=phone_num,
                    allergies=allergies
                )

                json_records = PatientInformationModel.objects.filter(patient_id=patient_id)
                json_records = serializers.serialize("json", json_records)

                return JsonResponse({'status': 'Success',
                                     'message': 'Patient record successfully updated',
                                     'patient_information': json_records,
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

    @param patient_id in JSON body: ID number of the patient's to be deleted
    @return: JSON response stating patient record was successfully deleted
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


@csrf_exempt
def administer_doctor_account(request):
    """
    An administrator user will work with doctor accounts within the Mentcare database system.
    @todo: allow admins to create, modify, and delete doctor accounts
    @param request:
    """
    pass


@csrf_exempt
def daily_patient_summary(request):
    """
    Create a summary of statuses of all patients assigned to the specific doctor.
    @param request:
    @param doctor_id: ID number of doctor from which to gather all relevant patient information
    @return: JSON response of all patient statuses assigned to that particular doctor
    """
    # @todo: create all mock data for database in order to do monthly reports/status summaries
    # @todo: create this function
    pass

@csrf_exempt
def monthly_reports(request):
    """
    This function is a general function to deal with all aspects of monthly reports required by doctors.
    @param request:
    @return: JSON response body of relevant information
    @todo: for story "receive monthly reports on the number of patients treated" use stay information model
    @todo: same todo as below, edit stay information model to include actual dates/times of patient stays
    @todo: for story "receive monthly reports on number of patients who have entered/left system" use stay
    @todo: for story "receive monthly reports on drugs prescribed to each patient" use prescribe medication
    model, and sort by patient ID (use for individual doctor, their patients)
    @todo: for story "receive monthly reports on cost of drugs prescribed" sum the cost of drugs per patient ID
    """
