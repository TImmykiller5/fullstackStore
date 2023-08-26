from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register',  views.registerUser.as_view(), name='register'),
    path('users/',  views.getUsers.as_view(), name='users'),
    path('users/profile/',  views.getUserProfile.as_view(), name='users-profile'),

    path('users/<str:pk>/',  views.getUserByID.as_view(), name='get-user'),
    path('user/update/<str:pk>/',  views.updateUserByID.as_view(), name='update-user'),
    path('user/delete/<str:pk>/',  views.deleteUser.as_view(), name='user-delete'),
    path('users/profile/update/',  views.updateUserProfile.as_view(), name='user-profile-update'),

    path('products/',  views.getProducts.as_view(), name='products'),
    path('products/create/',  views.createProduct.as_view(), name='create-product'),
    path('products/upload/',  views.uploadImage.as_view(), name='image-upload'),
    path('products/<str:pk>/reviews/',  views.createProductReview.as_view(), name='product-review'),
    path('products/top/',  views.getTopProducts.as_view(), name='top-product'),
    path('products/<str:pk>/',  views.getProduct.as_view(), name='product'),
    path('products/delete/<str:pk>/',  views.deleteProduct.as_view(), name='delete-product'),
    path('products/update/<str:pk>/',  views.updateProduct.as_view(), name='update-product'),

    path('orders/add/',  views.addOrderItems.as_view(), name='add_order'),
    path('orders/',  views.getAllOrders.as_view(), name='get_all_orders_admin'),
    path('orders/all/myorders/',  views.getOrders.as_view(), name='get_all_orders'),
    path('orders/<str:pk>/',  views.getOrderById.as_view(), name='get_order'),
    path('orders/<str:pk>/pay/',  views.updateOrderToPaid.as_view(), name='pay'),
    path('orders/<str:pk>/delivered/',  views.updateDelivered.as_view(), name='delivered'),



    
]
