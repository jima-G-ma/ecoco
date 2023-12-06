import csv
from django.views.generic import TemplateView
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from ecoco.settings import BASE_DIR
from django.contrib.auth import get_user_model

User = get_user_model()

class IndexView(TemplateView):
  template_name = "index.html"


class CalendarView(TemplateView):
  template_name = "calendar.html"

class SearchView(TemplateView):
  template_name = "search.html"


class PlaceView(TemplateView):
  template_name = "place.html"

class SettingView(TemplateView):
  template_name = "setting.html"

class MypageView(TemplateView):
  template_name = "mypage.html"

  def get(self, request, pk):
        # pkに基づいてユーザーを取得し、ビューで使うデータを設定
        user = get_object_or_404(User, pk=pk)
        context = {'user': user}
        return render(request, self.template_name, context)

  def post(self, request, pk):
    if request.method == 'POST':
        selected_area = request.POST.get('district')
        user = get_user_model().objects.get(pk=pk)
        user.area = selected_area
        user.save()

    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def bunbetsu(request):
  csv_header = ["name", "label", "notice", "furigana"]
  g_List = []
  p1 = str(BASE_DIR) + "/ecoco_app/bunbetsu.csv"
  with open(p1, 'r', encoding="utf-8_sig") as f:
    for row in csv.DictReader(f, csv_header):
      g_List.append(row)

  sepa = {"item": g_List}
  return render(request, "separation.html", sepa)
