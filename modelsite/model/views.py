from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework import status
from .models import Model, Photo
from random import shuffle
from .serializers import *
#mail
from django.core.mail import send_mail
from rest_framework.response import Response
from django.http import Http404
from django.core.serializers import serialize

shuffled_queryset = None
needs_shuffle = True

class RandomPagination(PageNumberPagination):
    page_size = 2
    
def generate_shuffled_queryset():
    global shuffled_queryset, needs_shuffle
    queryset = list(Model.objects.filter(is_active=1))
    shuffle(queryset)
    shuffled_queryset = queryset
    needs_shuffle = False

class ModelAPIList(ListAPIView):
    serializer_class = PhotoSerializer
    pagination_class = RandomPagination
    
    def get_queryset(self):
        global shuffled_queryset, needs_shuffle
        if needs_shuffle and self.request.query_params.get('page') != '1':
            generate_shuffled_queryset()
        return shuffled_queryset

    def get(self, request, *args, **kwargs):
        global needs_shuffle
        if not self.request.query_params:
            needs_shuffle = True
        return super().get(request, *args, **kwargs)
    

class ModelAPIDetail(RetrieveAPIView):
    serializer_class = ModelDetailSerializer
    
    def get_queryset(self):
        return Model.objects.all()
    
    
    
class PhotoAPIList(ListAPIView):
    serializer_class = PhotoSerializer
    
    def get_queryset(self):
        queryset = Photo.objects.all()
        pk = self.kwargs['pk']
        if pk is not None:
            queryset = queryset.filter(model=pk)
        return queryset
    
class MainPageIList(ListAPIView):
    serializer_class = MainPageSerializer
    
    def get_queryset(self):
        queryset = Model.objects.all()
        queryset = list(queryset)
        shuffle(queryset)

        return queryset[:10]
    
    
class AnotherModelsIList(ListAPIView):
    serializer_class = AnotherModelsSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        queryset = Model.objects.exclude(pk=pk)
        queryset = list(queryset)
        shuffle(queryset)

        return queryset[:9]


class SendEmailAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            model_pk = serializer.validated_data.get('pk')
            if model_pk == 0:
                model_email = 'admin@test4test.com'
            else:
                user = Model.objects.get(pk=model_pk)
                model_email = user.email
            
            name = serializer.validated_data.get('name')
            email = serializer.validated_data.get('email')
            agency = serializer.validated_data.get('agency')
            text = serializer.validated_data.get('text')

            send_mail(
                'Request for work from TOP Model',
                f'Hello! You got email from TOP Model.\n\nName: {name}\nAgency: {agency}\nEmail: {email}\nMessage: {text}',
                'info@topmodel.com',
                [model_email],
                fail_silently=False,
            )

            return Response({'message': 'Email sent successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class SearchView(ListAPIView):
    serializer_class = PhotoSerializer
    pagination_class = RandomPagination

    def get_queryset(self):
        global shuffled_queryset, needs_shuffle
        if needs_shuffle and self.request.query_params.get('page') != '1':
            generate_shuffled_queryset()
        return shuffled_queryset

    def get(self, request, *args, **kwargs):
        global needs_shuffle
        if not self.request.query_params:
            needs_shuffle = True
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        global shuffled_queryset, needs_shuffle
        data = request.data
        gender = data.get('gender')
        height = data.get('height')
        hair = data.get('hair')
        price_hour = data.get('price_hour')
        price_day = data.get('price_day')
        
        print(gender)
        queryset = Model.objects.all()
        if gender:
            queryset = queryset.filter(gender=gender)
        if height:
            min_height, max_height = map(int, height.split('-'))
            queryset = queryset.filter(height__gte=min_height, height__lte=max_height)
        if hair:
            queryset = queryset.filter(hair=hair)
        if price_hour:
            min_price_hour, max_price_hour = map(int, price_hour.split('-'))
            queryset = queryset.filter(price_hour__gte=min_price_hour, price_hour__lte=max_price_hour)
        if price_day:
            min_price_day, max_price_day = map(int, price_day.split('-'))
            queryset = queryset.filter(price_day__gte=min_price_day, price_day__lte=max_price_day)
        
        shuffled_queryset = list(queryset)
        shuffle(shuffled_queryset)
        needs_shuffle = False
        
    
        page = self.paginate_queryset(shuffled_queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(shuffled_queryset, many=True)
        return Response(serializer.data)