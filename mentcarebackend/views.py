import json
from json import JSONDecodeError

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from mentcarebackend.models import *


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
def register_user(reqeust):
    pass


@csrf_exempt
def create_patient_records(request):
    if request.method == 'POST':
        try:
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            gender = request.POST.get('gender')
            dob = request.POST.get('dob')
            address = request.POST.get('address')
            phone_num = request.POST.get('phone_num')

            # test all fields are present
            if (first_name is None or last_name is None or gender is None or dob is None
                    or address is None or phone_num is None):
                return JsonResponse({'status': 'Error',
                                     'message': 'Missing field. Cannot create patient record',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                record = PatientInformationModel.objects.create(
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
                                     'code': status.HTTP_200_OK})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error', 'message': 'No username or password given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})
