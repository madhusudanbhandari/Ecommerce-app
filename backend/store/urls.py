from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.get_products),
    path('categories/', views.get_categories),
]