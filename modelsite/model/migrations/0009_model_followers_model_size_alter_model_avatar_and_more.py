# Generated by Django 5.0.4 on 2024-04-11 19:08

import django.core.validators
import django_resized.forms
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('model', '0008_alter_model_birthday_alter_model_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='model',
            name='followers',
            field=models.SmallIntegerField(blank=True, default=0, help_text='Example: write "9" if you have 9K', verbose_name='Count of followers in Instagram'),
        ),
        migrations.AddField(
            model_name='model',
            name='size',
            field=models.SmallIntegerField(blank=True, default=42, validators=[django.core.validators.MinValueValidator(30), django.core.validators.MaxValueValidator(100)], verbose_name='Clothing size'),
        ),
        migrations.AlterField(
            model_name='model',
            name='avatar',
            field=django_resized.forms.ResizedImageField(blank=True, crop=None, default=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[350, 350], upload_to='avatars/', verbose_name='Avatar'),
        ),
        migrations.AlterField(
            model_name='photo',
            name='small_img',
            field=django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=-1, scale=None, size=[350, 350], upload_to='photos/small/', verbose_name='Small Photo'),
        ),
    ]
