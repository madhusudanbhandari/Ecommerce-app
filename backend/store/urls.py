from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.get_products, name='get_products'),
    path('products/<int:id>/', views.get_product, name='get_product'),
    path('categories/', views.get_categories, name='get_categories'),
    path('cart/', views.get_cart,name='get_cart'),
    path('cart/add/',views.add_to_cart,name='add_to_cart'),
    path('cart/remove/',views.remove_from_cart,name='remove_from_cart'),
    path('cart/update/',views.update_cart_quantity,name='update_cart_quantity'),
    path('orders/create/',views.create_order,name='create_order'),
    path('register/',views.register_view, name='register_view'),
    path('token/', TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),name='token_refresh'),
    

]