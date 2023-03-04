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
from rest_framework.views import APIView

from mentcarebackend.models import MentcareModel, MentcareLoginsModel
from mentcarebackend.serializers import MentcareSerializer, MentcareLoginsSerializer


# Create your views here.


class UserAuthentication(UpdateAPIView):
    model = MentcareLoginsModel

    def get_user(self, queryset=None):
        return MentcareLoginsModel.objects.get(user=self.request.user)


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


# class AuthenticatedView(APIView):
# permission_classes = [IsAuthenticated, ]

# def get(self, request):
#     if request.user.is_authenticated:
#         return Response(status.HTTP_200_OK)
#     else:
#         return Response(status.HTTP_403_FORBIDDEN)


class ListMentcareLoginsAPIView(APIView):
    permission_classes = IsAuthenticated
    queryset = MentcareLoginsModel.objects.all()
    serializer_class = MentcareLoginsSerializer

    # def login(request):
    #     username = request.POST['username']
    #     password = request.POST['password']
    #     user = authenticate(username=username, password=password)
    #
    #     if user is not None:
    #         login(request, user)
    #     else:
    #         Response(status.HTTP_403_FORBIDDEN)
    #
    # @permission_classes([IsAuthenticated])
    # def get(self, request):
    #     content = {
    #         'user': str(request.user),  # `django.contrib.auth.User` instance.
    #         'password': str(request.auth),  # None
    #     }
    #     return Response(content)


# Create your views here.
class ListMentcareAPIView(ListAPIView):
    """This endpoint list all the available items from the database"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["get"]


class CreateMentcareAPIView(CreateAPIView):
    """This endpoint allows for creation of a item"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["post"]


class UpdateMentcareAPIView(UpdateAPIView):
    """This endpoint allows for updating a specific item"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["put"]


class DeleteMentcareAPIView(DestroyAPIView):
    """This endpoint allows for deletion of a specific item from the database"""
    queryset = MentcareModel.objects.all()
    serializer_class = MentcareSerializer
    http_method_names = ["delete"]
