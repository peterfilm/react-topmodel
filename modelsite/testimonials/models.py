from django.db import models
from django_resized import ResizedImageField
from django.core.validators import MinLengthValidator

# Create your models here.


class Testimonial(models.Model):
    avatar = ResizedImageField(upload_to='testimonials', verbose_name='Avatar',
                               default=None, blank=True, null=True, size=[150, 150])
    name = models.CharField(max_length=50, verbose_name='Name', validators=[
                            MinLengthValidator(2)])
    position = models.CharField(verbose_name='Position', max_length=50)
    text = models.TextField(verbose_name='Message', max_length=1000)
    time_create = models.DateTimeField(
        auto_now_add=True, verbose_name='Register Date')
    time_update = models.DateTimeField(
        auto_now=True, verbose_name='Date of update')
    
    class Meta:
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
        
    def __str__(self):
        return f'Testimonial by {self.name}'
