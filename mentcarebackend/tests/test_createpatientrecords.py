import json
import pytest
import unittest

from django.urls import reverse
from django.test import TestCase, Client
from rest_framework import status
from mentcarebackend.models import PatientInformationModel


@pytest.mark.django_db
class CreatePatientRecordsTest(TestCase):

    def setUp(self):
        self.client = Client()
        self.url = reverse('Create Patient Records')
        self.valid_data_record = {
            'first_name': 'John',
            'last_name': 'Doe',
            'gender': '1',
            'dob': '1990-01-01',
            'address': '123 Main St',
            'phone_num': '555-555-1234',
            'allergies': 'peanuts'
        }
        self.invalid_data_record = {
            'first_name': 'John',
            'gender': 'M',
            'dob': '1990-01-01',
            'phone_num': '555-555-1234'
        }

    def test_create_patient_records_valid_params(self):
        response = self.client.post(
            self.url,
            data=json.dumps(self.valid_data_record),
            content_type='application/json'
        )

        assert response.status_code == 201
        assert response.json() == {
            'status': 'Success',
            'message': 'Patient record created successfully',
            'code': 201
        }

    def test_create_patient_records_invalid_params(self):
        response = self.client.post(
            self.url,
            data=json.dumps(self.invalid_data_record),
            content_type='application/json'
        )

        assert response.status_code == 400
        assert response.json() == {'status': 'Error',
                                   'message': 'Missing field. Cannot create patient record',
                                   'code': 400}

    def test_create_patient_records_invalid_method(self):
        response = self.client.get(self.url)

        assert response.status_code == 400
        assert response.json() == {
            'status': 'Error',
            'message': 'Invalid request method',
            'code': 400
        }

    def test_create_patient_records_missing_request_body(self):
        response = self.client.post(
            self.url,
            content_type='application/json'
        )

        assert response.status_code == 400
        assert response.json() == {'status': 'Error',
                                   'message': 'No patient information given',
                                   'code': 400}
