from importlib.resources import _

from django.db import models
from django.contrib.auth.models import User, AbstractUser

from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.


class DoctorInformationModel(models.Model):
    doctor_id = models.IntegerField(auto_created=True, primary_key=True, unique=True)  # unique ID for each doctor
    name = models.CharField(max_length=100)  # name of doctor
    email = models.CharField(max_length=100, unique=True)  # email of doctor
    department = models.CharField(max_length=100)  # doctor's department


class PatientInformationModel(models.Model):
    patient_id = models.IntegerField(auto_created=True, primary_key=True)  # unique ID for each patient/SSN
    first_name = models.CharField(max_length=100)  # patient first name
    last_name = models.CharField(max_length=100)  # patient last name
    # patient genders
    # option are 1 = Male 2 = Female, 3 = Genderfluid, 4= Genderqueer, 5 = Bigender, 6 = Agender,
    # 7 = Non-binary, 8 = Polygender, 9 = Unknown
    gender = models.PositiveSmallIntegerField(_('gender'),
                                              choices=[
                                                  (1, 'Male'),
                                                  (2, 'Female'),
                                                  (3, 'Genderfluid'),
                                                  (4, 'Genderqueer'),
                                                  (5, 'Bigender'),
                                                  (6, 'Agender'),
                                                  (7, 'Non-binary'),
                                                  (8, 'Polygender'),
                                                  (9, 'Unknown')
                                              ],
                                              blank=True,
                                              null=True)
    dob = models.DateField()  # patient date of birth, format YYYY-MM-DD
    address = models.TextField()  # address of patient
    phone_num = PhoneNumberField(blank=True)  # phone number of patient
    allergies = models.TextField(blank=True)  # any allergies of the patient
    # doctor_id = models.ForeignKey(DoctorInformationModel, on_delete=models.CASCADE)
    # ID number of primary doctor of patient, referenced in DoctorInformationModel


class AdminInformationModel(models.Model):
    admin_id = models.IntegerField(auto_created=True, primary_key=True, unique=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    position = models.CharField(max_length=100)


class AppointmentInformationModel(models.Model):
    appointment_id = models.IntegerField(auto_created=True, primary_key=True, unique=True)
    # unique ID for each appointment
    patient_id = models.ForeignKey(PatientInformationModel, on_delete=models.CASCADE)
    # ID number of patient
    doctor_id = models.ForeignKey(DoctorInformationModel, null=True, on_delete=models.CASCADE)
    # ID number of each doctor
    appointment_start_time = models.CharField(max_length=100)  # scheduled start time to meet doctor
    appointment_end_time = models.CharField(max_length=100)  # scheduled end time of doctor's appointment
    room_num = models.IntegerField()  # room number where patient and doctor meet


class MedicationModel(models.Model):
    medication_id = models.IntegerField(auto_created=True, primary_key=True)  # unique medication ID
    medication_name = models.CharField(max_length=255)  # name of medicine
    cost = models.IntegerField()  # cost of medicine
    application_method = models.CharField(max_length=255, default=None)  # how the medication will be taken/applied


class PrescribeMedicationModel(models.Model):
    doctor_id = models.ForeignKey(DoctorInformationModel, on_delete=models.CASCADE)
    # ID number of doctor referenced in DoctorInformationModel
    patient_id = models.ForeignKey(PatientInformationModel, on_delete=models.CASCADE)
    # ID of patient receiving medication, referenced in PatientInformationModel
    medication_id = models.ForeignKey(MedicationModel, on_delete=models.CASCADE)
    # ID number of medication being prescribed, referenced in MedicationModel
    appointment_id = models.ForeignKey(AppointmentInformationModel, on_delete=models.CASCADE)
    # ID of appointment when doctor prescribed medication to patient
    date = models.DateField()  # date medication was prescribed
    dosage = models.TextField()  # dose prescribed by the doctor


class StayInformationModel(models.Model):
    stay_id = models.IntegerField(auto_created=True, primary_key=True, unique=True)
    # unique ID for each patient admission
    patient_id = models.ForeignKey(PatientInformationModel, on_delete=models.CASCADE)
    # ID of patient referenced in PatientInformationModel
    room_num = models.ForeignKey("RoomInformationModel", on_delete=models.CASCADE)
    # room number ID of where patient is staying, referenced in RoomInformationModel
    start_time = models.TimeField()  # time when patient was admitted
    end_time = models.TimeField()  # time when patient left


class RoomInformationModel(models.Model):
    room_number = models.IntegerField(auto_created=True, primary_key=True, unique=True)  # unique ID of each room
    is_available = models.BooleanField()  # logical column, indicating if room is free or not


class DepartmentInformationModel(models.Model):
    department_id = models.IntegerField(auto_created=True, primary_key=True, unique=True)
    # ID number for the department
    department_name = models.CharField(max_length=255)  # department name
    department_head = models.ForeignKey(DoctorInformationModel, on_delete=models.CASCADE)
    # ID number of the doctor that's head of the department
    # referencing column doctor_id of DoctorInformationModel
