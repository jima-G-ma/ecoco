from django.urls import path
from . import views
from allauth.account.views import EmailView
from .views import CustomEmailView

app_name = 'accounts'
urlpatterns = [
]