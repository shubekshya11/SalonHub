from django.urls import path
from .views import (
    services_list, service_detail,
    appointments_list, appointment_detail, appointment_status
)

urlpatterns = [
    # Services endpoints
    path('services/', services_list, name='services_list'),
    path('services/<int:pk>/', service_detail, name='service_detail'),
    
    # Appointments endpoints
    path('appointments/', appointments_list, name='appointments_list'),
    path('appointments/<int:pk>/', appointment_detail, name='appointment_detail'),
    path('appointments/<int:pk>/status/', appointment_status, name='appointment_status'),
]
