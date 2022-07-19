import csv
from django.views.generic import TemplateView
from django.shortcuts import render
from ecoco.settings import BASE_DIR


class IndexView(TemplateView):
  template_name = "index.html"


class CalendarView(TemplateView):
  template_name = "calendar.html"


# class SeparationView(TemplateView):
#     template_name = "separation.html"


class SearchView(TemplateView):
  template_name = "search.html"


class PlaceView(TemplateView):
  template_name = "place.html"


def bunbetsu(request):
  csv_header = ["label", "name", "notice", "furigana"]
  g_List = []
  p1 = str(BASE_DIR) + "/ecoco_app/bunbetsu.csv"
  with open(p1, 'r', encoding="utf-8_sig") as f:
    for row in csv.DictReader(f, csv_header):
      g_List.append(row)

  sepa = {"item": g_List}
  return render(request, "separation.html", sepa)
