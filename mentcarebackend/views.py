import json
import random
from datetime import datetime
from json import JSONDecodeError

from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

from mentcarebackend.models import *


# Create your views here.
@csrf_exempt
def login_view(request):
    """
    An authorized user can log in, as log as the HTTP method is POST
    @param request:
    @return: JSON body stating login of user was successful
    """
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
def logout_user(request):
    """
    Logs out a user who is logged in
    @param request:
    @return: JSON body stating log out of session was successful
    """
    if request.method == 'POST':
        logout(request)

        return JsonResponse({'status': 'Error',
                             'message': 'Sucessfully logged user out',
                             'code': status.HTTP_200_OK})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def change_password(request):
    """
    Any user that is logged in is able to change their own password.
    Immediately after password change, they will be logged out
    @param request:
    @return: JSON body stating password change was a success
    """
    if request.method == 'PUT':
        data = request.body.decode('utf-8')
        data = json.loads(data)

        username = data['username']

        if username is None:
            return JsonResponse({'status': 'Error',
                                 'message': 'No username given',
                                 'code': status.HTTP_400_BAD_REQUEST})

        password = data['password']

        if password is None:
            return JsonResponse({'status': 'Error',
                                 'message': 'New password for account is required',
                                 'code': status.HTTP_400_BAD_REQUEST})

        account = User.objects.get(username=username)

        account.set_password(password)

        account.save()

        return JsonResponse({'status': 'Success',
                             'message': 'Successfully updated password',
                             'code': status.HTTP_200_OK})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def register_user(request):
    """
    Any user can add themselves to the database of authorized users.
    This can work to add either an admin user or a doctor user.
    @param request:
    @return: JSON body stating user registration was successful
    """
    if request.method == 'POST':
        # create a user in the system
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            name = data['name']
            user_type = data['user_type']

            # split name of user by space
            name_str = [i for j in name.split() for i in (j, ' ')][:-1]

            # username of user is first letter of first name plus all of last name
            username = name[0] + name_str[2]

            email = username.lower() + "@mentcare.org"

            if name is None or user_type is None:
                # need int representing account as admin or doctor is present
                return JsonResponse({'status': 'Error',
                                     'message': 'Cannot create user. '
                                                'Missing name  or user type',
                                     'code': status.HTTP_400_BAD_REQUEST})

            # check combinations of account type, and inclusion of position/department
            # if user is an admin and there's no position given
            match user_type:
                case 0:
                    # admin user
                    position = data['position']

                    if "position" not in data:  # admin user has no position
                        return JsonResponse({'status': 'Error',
                                             'message': 'Cannot create user. No admin position given',
                                             'code': status.HTTP_400_BAD_REQUEST})
                    elif "department" not in data:
                        department = ''
                case 1:
                    # doctor user
                    department = data['department']

                    if department is None:  # doctor has no department
                        return JsonResponse({'status': 'Error',
                                             'message': 'Cannot create user. No department for doctora',
                                             'code': status.HTTP_400_BAD_REQUEST})
                    elif "position" not in data:
                        position = ''

            if user_type == 0:
                record = AdminInformationModel.objects.create(
                    admin_id=random.randint(1001, 10000),
                    name=name,
                    email=email,
                    position=position
                )
            elif user_type == 1:
                record = DoctorInformationModel.objects.create(
                    doctor_id=random.randint(1001, 10000),
                    name=name,
                    email=email,
                    department=department
                )
            else:
                return JsonResponse({'status': 'Error',
                                     'message': 'Account type is invalid',
                                     'code': status.HTTP_400_BAD_REQUEST})

            # save new record of the user created into appropriate database table
            record.save()

            # full name of the user
            first_name = name_str[0]
            last_name = name_str[2]

            # create temporary password for user, which should be changed immediately
            # temp password for admin user is different from temp password for doctor
            # also set value of if the user is an administrator in the table
            if user_type == 0:
                password = "AdminPassword2023!"
                superuser_check = True
            elif user_type == 1:
                password = "Mentcare2023!"
                superuser_check = False

            new_account = User.objects.create_user(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                email=email,
                date_joined=datetime.now(),
                last_login=None,
                is_active=True,
                is_superuser=superuser_check,
                is_staff=False
            )

            new_account.save()

            return JsonResponse({'status': 'Success',
                                 'message': 'New user created successfully',
                                 'email is': new_account.email,
                                 'temporary password is': new_account.password,
                                 'code': status.HTTP_201_CREATED})
        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No valid information given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
@cache_page(60 * 15)
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
                    or address is None or phone_num is None or allergies is None):
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

    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            patient_id = data['patient_id']

            # checks if there is no request body
            # this will return all patient records
            if patient_id == 0:
                patients_records_list = PatientInformationModel.objects.all()
                records_json = serializers.serialize('json', patients_records_list)

                return JsonResponse({'status': 'Success',
                                     'message': 'All records successfully retrieved',
                                     'patient_information': records_json,
                                     'code': status.HTTP_200_OK})

            # otherwise, info for a specific patient is wanted
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

                PatientInformationModel.objects.filter(patient_id=patient_id).update(
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
def delete_patient_records(request, patient_id=None):
    """
    Delete a patient's records from the database

    @param patient_id in JSON body: ID number of the patient's to be deleted
    @return: JSON response stating patient record was successfully deleted
    """
    if request.method == 'DELETE':
        try:
            # tests that patient_id was given and isn't NULL
            if patient_id is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Patient ID not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                record = PatientInformationModel.objects.get(patient_id=patient_id)
                behavior = PatientBehaviorModel.objects.get(patient_id=patient_id)
                record.delete()
                behavior.delete()

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
def create_doctor_account(request):
    """
    An administrator user will create doctor accounts within the Mentcare database system.
    @param request:
    @return: JSON request body stating doctor account creation was successful
    """
    if request.method == 'POST':
        # create a new doctor account in system
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)
            name = data['name']
            department = data['department']

            name_str = [i for j in name.split() for i in (j, ' ')][:-1]

            # doctor's username is first letter of first name plus all of last name
            doctor_username = name[0] + name_str[2]

            doctor_first_name = name_str[0]
            doctor_last_name = name_str[2]

            email = doctor_first_name[0] + doctor_last_name + "@mentcare.org"

            if name is None or department is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Missing field. Cannot create doctor account',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                # Creates record of the new doctor in the Doctor Information table
                record = DoctorInformationModel.objects.create(
                    doctor_id=random.randint(1001, 10000),
                    name=name,
                    department=department,
                    email=email
                )

                record.save()

                # create a temporary password for the doctor, this password should be changed
                doctor_password = "Mentcare2023!"

                new_doctor_account = User.objects.create_user(
                    username=doctor_username,
                    first_name=doctor_first_name,
                    last_name=doctor_last_name,
                    email=email,
                    date_joined=datetime.now(),
                    last_login=None,
                    is_active=True,
                    is_superuser=False,  # user would have all permissions without explicit allow
                    is_staff=False,  # user would have access to Django admin site, no need
                    password=doctor_password
                )

                new_doctor_account.save()

                return JsonResponse({'status': 'Success',
                                     'message': 'Doctor created successfully',
                                     'code': status.HTTP_201_CREATED})
        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No valid doctor information given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def retrieve_doctor_accounts(request):
    """
    Retrieve a doctor's records from the database

    @param doctor_id in JSON body: ID number of the doctor's to be retrieved
    @return: JSON response body of doctor accounts
    """

    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            doctor_id = data['doctor_id']

            # checks if there is no request body for a specific doctor
            # this will return info on all doctors
            if doctor_id == 0:
                doctor_records_list = DoctorInformationModel.objects.all()
                records_json = serializers.serialize('json', doctor_records_list)

                return JsonResponse({'status': 'Success',
                                     'message': 'All records successfully retrieved',
                                     'doctor_information': records_json,
                                     'code': status.HTTP_200_OK})

            # otherwise, info for a specific doctor is wanted
            else:
                record = DoctorInformationModel.objects.filter(doctor_id=doctor_id)
                json_records = serializers.serialize("json", record)

                return JsonResponse({'status': 'Success',
                                     'message': 'Doctor record successfully retrieved',
                                     'patient_information': json_records,
                                     'code': status.HTTP_200_OK})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error', 'message': 'Missing doctor ID to retrieve',
                                 'code': status.HTTP_400_BAD_REQUEST})

    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def modify_doctor_account(request):
    """
    An administrator user be able to modify doctor accounts within the Mentcare database system.
    @param request:
    @return: JSON body response of successful doctor information edit
    """
    if request.method == 'PUT':
        # modify doctor information in the system
        try:
            data = request.body.decode("utf-8")
            data = json.loads(data)

            # modifying specific doctor information in Doctor Information Model
            doctor_id = data['doctor_id']

            # check that a doctor ID was given
            if doctor_id is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Doctor ID not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            else:
                # fill any missing data with pre-existing data to prevent data overwrite
                if "name" not in data:
                    name = DoctorInformationModel.objects.get(doctor_id=doctor_id).name
                else:
                    name = data["name"]
                if "email" not in data:
                    email = DoctorInformationModel.objects.get(doctor_id=doctor_id).email
                else:
                    email = data["email"]
                if "department" not in data:
                    department = DoctorInformationModel.objects.get(doctor_id=doctor_id).department
                else:
                    department = data['department']

                DoctorInformationModel.objects.filter(doctor_id=doctor_id).update(
                    name=name,
                    email=email,
                    department=department
                )

                json_records = DoctorInformationModel.objects.filter(doctor_id=doctor_id)
                json_records = serializers.serialize("json", json_records)

                return JsonResponse({'status': 'Success',
                                     'message': 'Doctor information successfully updated',
                                     'patient_information': json_records,
                                     'code': status.HTTP_200_OK})
        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No doctor information given to modify',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def delete_doctor_account(request):
    """
    An administrator user will be able to delete doctor accounts using this
    @param request:
    @return:
    """
    if request.method == 'DELETE':
        # delete the doctor's whole account/row in database
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            doctor_id = data['doctor_id']

            # Find doctor name from list of doctors in hospital table
            doctor_name = DoctorInformationModel.objects.get(doctor_id=doctor_id).name

            # check that a valid doctor ID was given
            if doctor_id is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Doctor ID not given',
                                     'code': status.HTTP_400_BAD_REQUEST})
            else:
                try:

                    # comparing unique email addresses
                    doctor_email = DoctorInformationModel.objects.get(doctor_id=doctor_id).email

                    account_email = User.objects.get(email=doctor_email)
                    doctor_email_stripped = doctor_email.rstrip("@mentcare.org")

                    # If the two tables' doctor emails match, first delete doctor account
                    if doctor_email_stripped == account_email:
                        # if the two username part of unique emails match
                        account_email.delete()

                    # Now delete record of doctor
                    DoctorInformationModel.objects.get(doctor_id=doctor_id).delete()

                    return JsonResponse({'status': 'Success',
                                         'message': 'Doctor account successfully deleted',
                                         'code': status.HTTP_200_OK})

                except doctor_name is None:
                    return JsonResponse({'status': 'Error',
                                         'message': 'Doctor does not exist',
                                         'code': status.HTTP_400_BAD_REQUEST})
        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No doctor information given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def daily_patient_summary(request):
    """
    Create a summary of statuses of all patients assigned to the specific doctor.
    @param request:
    @param doctor_id: ID number of doctor from which to gather all relevant patient information
    @return: JSON response of all patient statuses assigned to that particular doctor
    """
    # using POST method, as frontend doesn't like GET request body
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            # first, get the doctor's ID number
            doctor_id = data['doctor_id']

            # patient_dosages contains all patients under doctor with doctor_id, and their
            # dosage
            patient_dosages = PrescribeMedicationModel.objects.filter(doctor_id=doctor_id)

            # patient_information contains all patient's information
            patient_information = PatientInformationModel.objects.filter(
                patient_id=patient_dosages.get().patient_id_id
            )

            # patient_behaviors contains the patient's behavior "last night"
            patient_behaviors = PatientBehaviorModel.objects.filter(
                patient_id=patient_information.get().patient_id
            )

            # serialize all necessary information to send to frontend
            patient_dosages = serializers.serialize("json", patient_dosages)
            patient_information = serializers.serialize("json", patient_information)
            patient_behaviors = serializers.serialize("json", patient_behaviors)

            return JsonResponse({'status': 'Success',
                                 'message': 'Patient summaries return successfully',
                                 'all patients under this doctor': patient_dosages,
                                 'all patients information': patient_information,
                                 'behaviors since yesterday': patient_behaviors,
                                 'code': status.HTTP_200_OK})
        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No doctor ID given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def number_of_patients_treated(request):
    """
    Find the total number of patients who have been treated (prescribed medication) this month
    :param request:
    :param month:
    :param year:
    :return: total count of patients who have been treated in this month, year
    """
    # using POST method, as frontend doesn't like GET request body
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            month = data['month']
            year = data['year']

            # ensures both month and year are given
            if month is None or year is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Month or year not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            elif isinstance(month, str) and isinstance(year, str):
                month_of_interest = PrescribeMedicationModel.objects.filter(
                    date__month=month,
                    date__year=year
                )

                # get count of number of patients treated that month
                patients_count = month_of_interest.count()

                return JsonResponse({'status': 'Success',
                                     'message': 'Retrieved number of patients treated this month'
                                                'successfully',
                                     'count of patients treated this month': patients_count,
                                     'code': status.HTTP_200_OK})
            else:
                return JsonResponse({'status': 'Error',
                                     'message': 'Month or year is not string',
                                     'code': status.HTTP_400_BAD_REQUEST})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No valid date information given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def patients_in_system(request):
    """
    Describes the number of patients who have entered this month, and left this month
    :param request:
    :param month:
    :param: year:
    :return: count of patients who have entered and exited this month
    """
    # using POST method, as frontend doesn't like GET request body
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            month = data['month']
            year = data['year']

            # ensures both month and year are given
            if month is None or year is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Month or year not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            elif isinstance(month, str) and isinstance(year, str):
                patients_entered = StayInformationModel.objects.filter(
                    start_date__month=month,
                    start_date__year=year,
                )

                patients_exit = StayInformationModel.objects.filter(
                    end_date__month=month,
                    end_date__year=year
                )

                # # get count of number of patients who came in/out of system
                in_patients = patients_entered.count()
                out_patients = patients_exit.count()

                return JsonResponse({'status': 'Success',
                                     'message': 'Retrieved number of patients who entered/exited '
                                                'successfully',
                                     'incoming patients': in_patients,
                                     'outgoing patients': out_patients,
                                     'code': status.HTTP_200_OK})
            else:
                return JsonResponse({'status': 'Error',
                                     'message': 'Month or year is not string',
                                     'code': status.HTTP_400_BAD_REQUEST})
        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No valid date information given',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def patients_drugs(request):
    """
    For a patient, receive the drugs that were prescribed to each
    :param request:
    :param month:
    :param year:
    :return: information about dosage of drug and patient_id
    """

    # using POST method, as frontend doesn't like GET request body
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            month = data['month']
            year = data['year']

            # ensures all params are given
            if month is None or year is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Month or year not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            # checks all params are in format str
            elif isinstance(month, str) and isinstance(year, str):
                prescription_info = PrescribeMedicationModel.objects.filter(
                    date__year=year,
                    date__month=month,
                )

                prescription_info = serializers.serialize("json", prescription_info)

                return JsonResponse({'status': 'Success',
                                     'message': 'Retrieved patient drug info successfully for '
                                                'the month',
                                     'medication info': prescription_info,
                                     'code': status.HTTP_200_OK})
            else:
                return JsonResponse({'status': 'Error',
                                     'message': 'Parameters are not in format str',
                                     'code': status.HTTP_400_BAD_REQUEST})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No valid date information given, ',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def drugs_cost(request):
    """
    For an administrator, find the total cost of drugs that were prescribed that month
    :param request:
    :param month:
    :param year:
    :return: total cost
    """
    # using POST method, as frontend doesn't like GET request body
    if request.method == 'POST':
        try:
            data = request.body.decode('utf-8')
            data = json.loads(data)

            month = data['month']
            year = data['year']

            # ensures all params are given
            if month is None or year is None:
                return JsonResponse({'status': 'Error',
                                     'message': 'Month or year not given',
                                     'code': status.HTTP_400_BAD_REQUEST})

            # checks all params are in format str
            elif isinstance(month, str) and isinstance(year, str):
                prescription_info = PrescribeMedicationModel.objects.filter(
                    date__year=year,
                    date__month=month,
                )

                prescription_info = prescription_info.select_related('medication_id')

                prescription_info = serializers.serialize("json", prescription_info)
                print(prescription_info)

                return JsonResponse({'status': 'Success',
                                     'message': 'Retrieved total cost for the month',
                                     'medication info': prescription_info,
                                     'code': status.HTTP_200_OK})
            else:
                return JsonResponse({'status': 'Error',
                                     'message': 'Parameters are not in format str',
                                     'code': status.HTTP_400_BAD_REQUEST})

        except (json.JSONDecodeError, JSONDecodeError):
            return JsonResponse({'status': 'Error',
                                 'message': 'No valid date information given, ',
                                 'code': status.HTTP_400_BAD_REQUEST})
    else:
        return JsonResponse({'status': 'Error', 'message': 'Invalid request method',
                             'code': status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def monthly_reports(request):
    """
    This function is a general function to deal with all aspects of monthly reports required by
    doctors.
    @param request:
    @return: JSON response body of relevant information
    @todo: for story "receive monthly reports on cost of drugs prescribed" sum the
    cost of drugs per patient ID
    """
