from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator, MaxValueValidator
from datetime import date
from django_resized import ResizedImageField
from django.utils.safestring import mark_safe


# Create your models here.
class Model(models.Model):
    # Genders
    MALE = 'MALE'
    FEMALE = 'FEMALE'

    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    ]

    # Hair
    BLONDE = 'Blonde'
    BRUNETTE = 'Brunette'
    RED_HAIR = 'Red hair'
    BLACK_HAIR = 'Black hair'
    BROWN_HAIR = 'Brown hair'
    AUBURN_HAIR = 'Auburn hair'
    GRAY_HAIR = 'Gray hair'
    WHITE_HAIR = 'White hair'

    HAIR_CHOICES = [
        (BLONDE, 'Blonde'),
        (BRUNETTE, 'Brunette'),
        (RED_HAIR, 'Red hair'),
        (BLACK_HAIR, 'Black hair'),
        (BROWN_HAIR, 'Brown hair'),
        (AUBURN_HAIR, 'Auburn hair'),
        (GRAY_HAIR, 'Gray hair'),
        (WHITE_HAIR, 'White hair'),
    ]

    # EYES

    AMBER_EYES = 'Amber'
    BLUE_EYES = 'Blue'
    BROWN_EYES = 'Brown'
    GRAY_EYES = 'Gray'
    GREEN_EYES = 'Green'
    HAZEL_EYES = 'Hazel'
    RED_EYES = 'Red'

    EYES_CHOICES = [
        (AMBER_EYES, 'Amber'),
        (BLUE_EYES, 'Blue'),
        (BROWN_EYES, 'Brown'),
        (GRAY_EYES, 'Gray'),
        (GREEN_EYES, 'Green'),
        (HAZEL_EYES, 'Hazel'),
        (RED_EYES, 'Red'),
    ]

    name = models.CharField(max_length=50, verbose_name='Name', validators=[
                            MinLengthValidator(2)])
    surname = models.CharField(max_length=50, verbose_name='Surname', validators=[
                               MinLengthValidator(2)])
    city = models.CharField(max_length=100, verbose_name='City', validators=[
                            MinLengthValidator(2)])
    country = models.CharField(max_length=100, verbose_name='Country', validators=[
                               MinLengthValidator(2)])
    price_hour = models.PositiveIntegerField(verbose_name='Price per hour')
    price_day = models.PositiveIntegerField(verbose_name='Price per day')
    birthday = models.DateField(
        help_text='YYYY-mm-dd', verbose_name='Date of Birth')
    time_create = models.DateTimeField(
        auto_now_add=True, verbose_name='Register Date')
    time_update = models.DateTimeField(
        auto_now=True, verbose_name='Date of update')
    avatar = ResizedImageField(upload_to='avatars/', verbose_name='Avatar',
                               default=None, blank=True, null=True, size=[350, 350])
    is_active = models.BooleanField(default=True, verbose_name='Active')
    gender = models.CharField(
        max_length=6, choices=GENDER_CHOICES, default=FEMALE, verbose_name='Gender')
    height = models.PositiveIntegerField(
        verbose_name='Height', validators=[MinValueValidator(150)])
    weight = models.PositiveIntegerField(
        verbose_name='Weight', validators=[MinValueValidator(40)])
    bust = models.PositiveIntegerField(verbose_name='Bust')
    weist = models.PositiveIntegerField(verbose_name='Weist')
    hips = models.PositiveIntegerField(verbose_name='Hips')
    shoes = models.PositiveIntegerField(
        verbose_name='Shoes', validators=[MinValueValidator(25)])
    hair = models.CharField(
        max_length=11, choices=HAIR_CHOICES, default=BRUNETTE, verbose_name='Hair')
    eyes = models.CharField(
        max_length=11, choices=EYES_CHOICES, default=BROWN_EYES, verbose_name='Eyes')
    size = models.SmallIntegerField(verbose_name='Clothing size', validators=[MinValueValidator(30), MaxValueValidator(100)])
    bio = models.TextField(max_length=5000, blank=True,
                           verbose_name='Biography')
    past_clients = models.TextField(blank=True, verbose_name='Past clients',
                                    help_text='comma separated enumeration. example: client1, client2, client3...')
    experience = models.PositiveIntegerField(verbose_name='Experience since', validators=[
                                             MinValueValidator(1980), MaxValueValidator(date.today().year)], help_text='example: 2010')
    top_model = models.BooleanField(default=False, verbose_name='Top model')
    agency = models.CharField(
        blank=True, max_length=100, verbose_name='Agency')
    email = models.EmailField(max_length=100, verbose_name='Email')
    followers = models.SmallIntegerField(verbose_name='Count K of followers in Instagram', help_text='Example: write "9" if you have 9K')
    vk = models.URLField(blank=True, max_length=100, verbose_name='VK',
                         help_text='example: https://vk.com/myname')
    instagram = models.URLField(blank=True, max_length=100, verbose_name='Instagram',
                                help_text='example: https://instagram.com/myname')
    facebook = models.URLField(blank=True, max_length=100, verbose_name='Facebook',
                               help_text='example: https://facebook.com/myname')
    telegram = models.URLField(blank=True, max_length=100, verbose_name='Telegram',
                               help_text='example: https://telegram.com/myname')

    class Meta:
        verbose_name = 'Model'
        verbose_name_plural = 'Models'

    def __str__(self):
        return f'{self.name} {self.surname}'


class Photo(models.Model):
    model = models.ForeignKey('Model', on_delete=models.CASCADE, related_name='photographs')
    img = ResizedImageField(size=None, upload_to='photos/', default=None,
                            null=True, verbose_name='Photo', force_format='JPEG')
    small_img = ResizedImageField(size=[350, 350], upload_to='photos/small/',
                                  blank=True, null=True, verbose_name='Small Photo', force_format='JPEG')
    middle_img = ResizedImageField(size=[1080, 1080], upload_to='photos/middle/',
                                   blank=True, null=True, verbose_name='Middle Photo', force_format='JPEG')
    time_create = models.DateTimeField(
        auto_now_add=True, verbose_name='Register Date')
    time_update = models.DateTimeField(
        auto_now=True, verbose_name='Date of update')
    is_published = models.BooleanField(default=True, verbose_name='Published')

    def __str__(self):
        return f'Фотография {self.model.name} {self.model.surname}'

    class Meta:
        verbose_name = 'Photo'
        verbose_name_plural = 'Photos'

    def photo(self):
        if self.small_img:
            return mark_safe(f'<img src="{self.small_img.url}"  width=100 height=100 style="object-fit: cover; object-position: center top;">')

        return 'Without photo'

    def save(self, *args, **kwargs):
        if self.img:
            # small_img
            self.small_img._file = self.img._file
            self.small_img.name = self.img.name
            self.small_img._committed = False

            # middle_img
            self.middle_img._file = self.img._file
            self.middle_img.name = self.img.name
            self.middle_img._committed = False
            super(Photo, self).save(*args, **kwargs)
