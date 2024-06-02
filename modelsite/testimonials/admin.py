from django.contrib import admin
from .models import Testimonial
from django.utils.safestring import mark_safe

# Register your models here.
@admin.register(Testimonial)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['id','get_photo', 'name', 'position']
    list_display_links = ['id','name']
    fields = ['avatar', 'name', 'position', 'text']
    save_on_top = True
    readonly_fields = ['get_photo']

    def get_photo(self, obj: Testimonial):
        if obj.avatar:
            return mark_safe(f'<img src="{obj.avatar.url}"  width=100 height=100 style="object-fit: cover; object-position: center top; border-radius: 100%">')
        return 'Without photo'

    get_photo.short_description = 'Thumbnail'
    