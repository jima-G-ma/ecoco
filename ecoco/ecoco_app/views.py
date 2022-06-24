from django.views.generic import TemplateView

class IndexView(TemplateView):
  template_name = "index.html"


class CalendarView(TemplateView):
  template_name = "calendar.html"

class SeparationView(TemplateView):
  template_name = "separation.html"

class SearchView(TemplateView):
  template_name = "search.html"

class PlaceView(TemplateView):
  template_name = "place.html"

class SettingView(TemplateView):
  template_name = "setting.html"