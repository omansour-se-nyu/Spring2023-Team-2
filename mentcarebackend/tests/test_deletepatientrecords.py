import unittest
import pytest
from django.urls import reverse
from django.test import Client, TestCase
from rest_framework import status
from mentcarebackend.models import PatientInformationModel, PatientBehaviorModel


@pytest.mark.django_db
class DeletePatientRecordsTest(TestCase):

    def setUp(self):
        self.url = reverse('Delete Patient Records')
        self.client = Client()
        self.patient = PatientInformationModel.objects.create(
            patient_id='999',
            first_name='John',
            last_name='Doe',
            gender='1',
            dob='2000-01-01',
            address='123 Main St',
            phone_num='333-555-1234',
            allergies='peanuts'
        )

        self.behavior = PatientBehaviorModel.objects.create(
            behavior_id='1',
            patient_id='999',
            behavior='Sad'
        )

    def test_delete_patient_records_valid_id(self):
        response = self.client.delete(
            reverse(self.url,
                    kwargs={
                        'patient_id': self.patient.patient_id
                    }))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['status'], 'Success')
        self.assertEqual(response.json()['message'], 'Patient record successfully deleted')
        self.assertFalse(PatientInformationModel.objects.filter(patient_id=self.patient.patient_id).exists())
        self.assertFalse(PatientBehaviorModel.objects.filter(patient=self.patient).exists())

    def test_delete_patient_records_missing_id(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()['status'], 'Error')
        self.assertEqual(response.json()['message'], 'Patient ID not given')

    def test_delete_patient_records_invalid_id(self):
        response = self.client.delete(self.url, kwargs={'patient_id': 999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json()['status'], 'Error')
        self.assertEqual(response.json()['message'], 'Patient record not found')

    def tearDown(self):
        self.patient.delete()
        self.behavior.delete()


if __name__ == '__main__':
    unittest.main()
