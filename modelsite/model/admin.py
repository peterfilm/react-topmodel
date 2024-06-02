from django.contrib import admin
from .models import Model, Photo
from django.utils.safestring import mark_safe
from django.contrib import admin, messages
from django import forms
from datetime import date


class ModelToPhotoInline(admin.TabularInline):
    model = Photo
    fields = ['photo', 'img', 'is_published']
    readonly_fields = ('photo',)

# Register your models here.


@admin.register(Model)
class ModelAdmin(admin.ModelAdmin):
    inlines = [
        ModelToPhotoInline,
    ]

    list_display = ['pk', 'get_photo',
                    'full_name', 'gender', 'age', 'is_active', 'top_model', 'followers']
    list_display_links = ['get_photo', 'full_name']
    list_editable = ['is_active', 'top_model', 'followers']
    save_on_top = True
    actions = ['set_published', 'set_draft', 'set_topmodel', 'unchek_topmodel']
    search_fields = ['surname', 'name']
    list_filter = ['gender', 'is_active', 'top_model']
    fields = [('get_photo', 'avatar'), 'name', 'surname',
              ('city', 'country'), ('price_hour',
                                    'price_day'), 'birthday', 'gender', 'height',
              'weight', ('bust', 'weist',
                         'hips'), 'shoes', 'hair', 'eyes', 'bio', 'past_clients',
              'experience', 'agency', 'email', 'vk', 'instagram', 'facebook', 'telegram', 'top_model', 'is_active']

    def get_form(self, request, obj=None, **kwargs):
        kwargs['widgets'] = {
            'vk': forms.TextInput(attrs={'placeholder': 'https://vk.com'}),
            'facebook': forms.TextInput(attrs={'placeholder': 'https://facebook.com'}),
            'instagram': forms.TextInput(attrs={'placeholder': 'https://instagram.com'}),
            'telegram': forms.TextInput(attrs={'placeholder': 'https://telegram.com'}),
        }
        return super().get_form(request, obj, **kwargs)

    def get_photo(self, obj: Model):
        if obj.avatar:
            return mark_safe(f'<img src="{obj.avatar.url}" width=100 height=100 style="object-fit: cover; object-position: center top; border-radius: 100%">')
        return 'Without photo'

    def full_name(self, obj: Model):
        return obj.name + ' ' + obj.surname

    def age(self, obj: Model):
        return date.today().year - obj.birthday.year

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ['get_photo', 'gender']
        return ['get_photo']

    get_photo.short_description = 'Avatar\'s preview'
    full_name.short_description = 'Full name'

    @admin.action(description='Make models active')
    def set_published(self, request, queryset):
        count = queryset.update(is_active=True)
        self.message_user(
            request, f'{count} entries changed', messages.SUCCESS)

    @admin.action(description='Make models inactive')
    def set_draft(self, request, queryset):
        count = queryset.update(is_active=False)
        self.message_user(
            request, f'{count} entries changed', messages.WARNING)

    @admin.action(description='Make Top model')
    def set_topmodel(self, request, queryset):
        count = queryset.update(top_model=True)
        self.message_user(
            request, f'{count} entries changed', messages.SUCCESS)

    @admin.action(description='Uncheck "Top Model"')
    def unchek_topmodel(self, request, queryset):
        count = queryset.update(top_model=False)
        self.message_user(
            request, f'{count} entries changed', messages.WARNING)


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['id', 'get_photo', 'model', 'time_update', 'is_published']
    list_display_links = ['id', 'get_photo']
    fields = [('get_photo', 'img'), 'model', 'is_published']
    save_on_top = True
    readonly_fields = ['get_photo']
    list_editable = ['is_published']

    def get_photo(self, obj: Photo):
        if obj.small_img:
            return mark_safe(f'<img src="{obj.small_img.url}"  width=100 height=100 style="object-fit: cover; object-position: center top">')
        return 'Without photo'

    get_photo.short_description = 'Thumbnail'
