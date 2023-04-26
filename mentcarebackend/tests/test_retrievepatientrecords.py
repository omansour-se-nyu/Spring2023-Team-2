import unittest
import json
import pytest
from django.test import RequestFactory, TestCase
from django.urls import reverse

from mentcarebackend.views import retrieve_patient_records


@pytest.mark.django_db
class RetrievePatientRecordsTest(TestCase):

    def setUp(self):
        self.factory = RequestFactory()
        self.url = reverse('Retrieve Patient Records')

    def test_retrieve_all_patients(self):
        request = self.factory.post(self.url,
                                    data=json.dumps({'patient_id': 0}),
                                    content_type='application/json')
        response = retrieve_patient_records(request)
        assert response.status_code == 200
        assert response.json()['status'] == 'Success'
        assert len(response.json()['patient_information']) > 0

    def test_retrieve_specific_patient(self):
        patient_id = 1
        request = self.factory.post(self.url,
                                    data=json.dumps({'patient_id': patient_id}),
                                    content_type='application/json')
        response = retrieve_patient_records(request)
        assert response.status_code == 200
        assert response.json()['status'] == 'Success'
        assert len(response.json()['patient_information']) == 1
        assert response.json()['patient_information'][0]['fields']['patient_id'] == patient_id

    def test_missing_patient_id(self):
        request = self.factory.post(self.url,
                                    data=json.dumps({}),
                                    content_type='application/json')
        response = retrieve_patient_records(request)
        assert response.status_code == 400
        assert response.json()['status'] == 'Error'
        assert response.json()['message'] == 'Missing patient ID to retrieve'

    def test_invalid_request_method(self):
        request = self.factory.get(self.url)
        response = retrieve_patient_records(request)
        assert response.status_code == 400
        assert response.json()['status'] == 'Error'
        assert response.json()['message'] == 'Invalid request method'


if __name__ == '__main__':
    unittest.main()
