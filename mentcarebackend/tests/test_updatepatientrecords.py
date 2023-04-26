import unittest
import json
import pytest
import django_db
from django.test import Client, TestCase
from django.urls import reverse
from mentcarebackend.models import PatientInformationModel


@pytest.mark.django_db
class UpdatePatientRecordsTest(TestCase):

    def setUp(self):
        self.patient_record = PatientInformationModel.objects.create(
            first_name='John',
            last_name='Doe',
            gender='1',
            dob='1980-01-01',
            address='123 Main Street',
            phone_num='444-555-1234',
            allergies='none'
        )

        self.valid_data = {
            'patient_id': self.patient_record.patient_id,
            'first_name': 'Jane',
            'last_name': 'Doe',
            'gender': '2',
            'dob': '1980-01-01',
            'address': '123 Main Street',
            'phone_num': '444-555-1234',
            'allergies': 'peanuts'
        }

        self.client = Client()

    def test_update_all_fields(self):
        # update all fields of the patient record
        response = self.client.put(
            reverse('update_patient_records'),
            json.dumps(self.valid_data),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # verify that all fields of the patient record have been updated
        updated_patient_record = PatientInformationModel.objects.get(patient_id=self.patient_record.patient_id)
        self.assertEqual(updated_patient_record.first_name, 'Jane')
        self.assertEqual(updated_patient_record.last_name, 'Doe')
        self.assertEqual(updated_patient_record.gender, '2')
        self.assertEqual(updated_patient_record.dob, '1980-01-01')
        self.assertEqual(updated_patient_record.address, '123 Main Street')
        self.assertEqual(updated_patient_record.phone_num, '555-555-1234')
        self.assertEqual(updated_patient_record.allergies, 'peanuts')

    def test_update_one_field(self):
        # update only one field of the patient record
        data = {
            'patient_id': self.patient_record.patient_id,
            'address': '456 Main Street'
        }
        response = self.client.put(
            reverse('update_patient_records'),
            json.dumps(data),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # verify that only the updated field of the patient record has been updated
        updated_patient_record = PatientInformationModel.objects.get(patient_id=self.patient_record.patient_id)
        self.assertEqual(updated_patient_record.address, '456 Main Street')
        self.assertEqual(updated_patient_record.first_name, 'John')
        self.assertEqual(updated_patient_record.last_name, 'Doe')
        self.assertEqual(updated_patient_record.gender, '1')
        self.assertEqual(updated_patient_record.dob, '1980-01-01')
        self.assertEqual(updated_patient_record.phone_num, '888-555-1234')
        self.assertEqual(updated_patient_record.allergies, 'none')

    def test_missing_patient_id(self):
        # update patient record without patient ID
        data = {
            'first_name': 'Jane',
            'last_name': 'Doe',
            'gender': '2',
            'dob': '1980-01-01',
            'address': '123 Main Street',
            'phone_num': '444-555-1234',
            'allergies': 'peanuts'
        }
        response = self.client.put(
            reverse('update_patient_records'),
            json.dumps(data),
            content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_missing_field_to_update(self):
        # update patient record without any fields to update
        data = {
            'patient_id': self.patient_record.patient_id
        }
        response = self.client.put(
            reverse('update_patient_records'),
            json.dumps(data),
            content_type='application/json')
        self.assertEqual(response.status_code, 400)


if __name__ == '__main__':
    unittest.main()
