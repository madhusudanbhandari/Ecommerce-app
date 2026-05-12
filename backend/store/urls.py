from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.get_products, name='get_products'),
    path('products/<int:id>/', views.get_product, name='get_product'),
    path('categories/', views.get_categories, name='get_categories'),
]