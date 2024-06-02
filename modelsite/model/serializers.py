from rest_framework import serializers
from .models import Model, Photo

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = ('pk','name', 'surname','avatar', 'city', 'country', 'price_hour', 
                  'price_day', 'avatar', 'is_active', 'gender', 'height',
                  'weight', 'bust', 'weist', 'hips', 'shoes', 'hair', 'eyes', 'bio',
                  'past_clients', 'experience', 'top_model', 'agency', 'vk', 'instagram', 'facebook', 'telegram', 'followers')
        
        
class MainPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = ('pk','name', 'surname', 'avatar', 'height',
                  'bust', 'weist', 'size', 'shoes', 'hair', 'eyes', 'followers')
        
        
        
        
        
# Models pages
class DopPhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('small_img', 'img', 'middle_img', 'is_published', 'pk')
        

class PhotoSerializer(serializers.ModelSerializer):
    
    photographs = serializers.SerializerMethodField()
    
    class Meta:
        model = Model
        fields = ('name', 'surname', 'city', 'price_hour', 'price_day', 'pk', 'photographs', 'avatar', 'gender')

    def get_photographs(self, obj):
        request = self.context.get('request')
        photos_queryset = obj.photographs.filter(is_published=True)
        photos_serializer = DopPhotosSerializer(photos_queryset, many=True, context={'request': request})
        return photos_serializer.data
    
    
class ModelDetailSerializer(serializers.ModelSerializer):
    photographs = serializers.SerializerMethodField()
    
    class Meta:
        model = Model
        fields = ('pk','name', 'surname', 'city', 'country', 'price_hour', 
                  'price_day', 'avatar', 'is_active', 'gender', 'height',
                  'weight', 'bust', 'weist', 'hips', 'shoes', 'hair', 'eyes', 'bio',
                  'past_clients', 'experience', 'top_model', 'agency', 'vk', 'instagram', 'facebook', 'telegram', 'followers', 'photographs')

    def get_photographs(self, obj):
        request = self.context.get('request')
        photos_queryset = obj.photographs.filter(is_published=True)
        photos_serializer = DopPhotosSerializer(photos_queryset, many=True, context={'request': request})
        return photos_serializer.data
    
    
class AnotherModelsSerializer(serializers.ModelSerializer):
    photographs = serializers.SerializerMethodField()
    
    class Meta:
        model = Model
        fields = ('pk','name', 'surname', 'city', 'price_hour', 'price_day', 'photographs')
    
    def get_photographs(self, obj):
        request = self.context.get('request')
        photos_queryset = obj.photographs.filter(is_published=True)[:4]
        photos_serializer = DopPhotosSerializer(photos_queryset, many=True, context={'request': request})
        return photos_serializer.data
    
    
class EmailSerializer(serializers.Serializer):
    pk = serializers.IntegerField()
    name = serializers.CharField()
    email = serializers.EmailField()
    agency = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    text = serializers.CharField()