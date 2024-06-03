"""
URL configuration for modelsite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from model.views import *
from testimonials.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/models/', ModelAPIList.as_view()),
    path('api/v1/models/mainpage/', MainPageIList.as_view()),
    path('api/v1/models/another/<int:pk>', AnotherModelsIList.as_view()),
    path('api/v1/photos/<int:pk>', PhotoAPIList.as_view()),
    path('api/v1/models/<int:pk>', ModelAPIDetail.as_view()),
    path('api/v1/testimonials/',TestimonialsIList.as_view()),
    path('api/v1/send_email/', SendEmailAPIView.as_view(), name='send_email'),
    path('api/v1/search/', SearchView.as_view(), name='search'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)