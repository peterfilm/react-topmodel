from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import TestimonialSerializer
from .models import Testimonial

# Create your views here.
class TestimonialsIList(ListAPIView):
    serializer_class = TestimonialSerializer
    queryset = Testimonial.objects.all()