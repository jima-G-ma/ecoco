from django.urls import path

from . views import IndexView, CalendarView, SeparationView, SearchView, PlaceView, SettingView

urlpatterns = [
    path('', IndexView.as_view()),
    path('calendar/', CalendarView.as_view()),
    path('separation/', SeparationView.as_view()),
    path('search/', SearchView.as_view()),
    path('place/', PlaceView.as_view()),
    path('setting/', SettingView.as_view()),
]