from django.urls import path
from .views import DetailsListCreateView,SendOTPView, VerifyOTPView , get_profile

urlpatterns = [
    path('detail/',DetailsListCreateView.as_view(),name="detail"),
    path("send-otp/", SendOTPView.as_view(), name="send_otp"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
    path("api/profile/", get_profile, name="get_profile"),
]