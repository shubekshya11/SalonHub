from rest_framework import serializers
from .models import Service, Appointment


class ServiceSerializer(serializers.ModelSerializer):
    """
    Serializer for Service model
    """
    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'duration', 'created_at']
        read_only_fields = ['id', 'created_at']


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for Appointment model
    Accepts camelCase from frontend and maps to snake_case model fields
    """
    service_name = serializers.CharField(source='service.name', read_only=True)
    
    # Map frontend camelCase to model snake_case
    customerName = serializers.CharField(source='customer_name', required=True)
    customerPhone = serializers.CharField(source='customer_phone', required=True)
    date = serializers.DateField(source='appointment_date', required=True)
    time = serializers.TimeField(source='appointment_time', required=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'customerName', 'customerPhone', 'service', 'service_name',
            'date', 'time', 'notes', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class AppointmentStatusSerializer(serializers.Serializer):
    """
    Serializer for updating appointment status
    """
    status = serializers.ChoiceField(choices=Appointment.STATUS_CHOICES)
