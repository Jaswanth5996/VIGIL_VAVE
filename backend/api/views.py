from django.shortcuts import render
from django.contrib.auth import get_user_model
from .models import Details
from .serializers import DetailsSerializer
from .utils import send_otp  # Import the OTP function
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes


User = get_user_model()


class SendOTPView(APIView):
    permission_classes = [AllowAny]  # ✅ Allow access without authentication

    def post(self, request):
        mobile = request.data.get("mobile")

        if not mobile:
            return Response({"message": "Mobile number is required"}, status=status.HTTP_400_BAD_REQUEST)

        otp = send_otp(mobile)  # ✅ Generate OTP

        if otp:
            user, created = User.objects.get_or_create(mobile=mobile, defaults={"username": f"user_{mobile}"})
            user.otp = otp  # ✅ Ensure OTP is updated
            user.save()

            return Response({
                "message": "OTP sent successfully",
                "is_new_user": created
            }, status=status.HTTP_200_OK)

        return Response({"message": "Failed to send OTP"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        mobile = request.data.get("mobile")
        otp = request.data.get("otp")

        if not mobile or not otp:
            return Response({"message": "Mobile number and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(mobile=mobile).first()
        if not user:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if user.otp is None or user.otp != otp:
            return Response({"message": "Invalid OTP. Try again."}, status=status.HTTP_400_BAD_REQUEST)

        user.last_login = timezone.now()
        user.otp = None  
        user.save()

        has_details = Details.objects.filter(user=user).exists()  # ✅ Check if details exist

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "message": "OTP verified successfully",
            "has_details": has_details,  # ✅ Send this flag for redirection
            "access": access_token,
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])  # ✅ Requires authentication
def get_profile(request):
    user = request.user
    details = Details.objects.filter(user=user).first()

    if not details:
        return Response({"message": "Details not found"}, status=404)

    return Response({
        "username": user.username,
        "mobile": user.mobile,
        "contact1": details.contact1,
        "contact2": details.contact2,
        "contact3": details.contact3,
        "secret_code": details.secret_code,
    })
        
class DetailsListCreateView(generics.ListCreateAPIView):
    queryset = Details.objects.all()
    serializer_class = DetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Details.objects.filter(user=self.request.user)  # ✅ Show only logged-in user’s data

    def create(self, request, *args, **kwargs):
        data = request.data.copy()  # ✅ Copy request data
        data["user"] = request.user.id  # ✅ Assign logged-in user ID

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # ✅ Assign user before saving
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print("Serializer Errors:", serializer.errors)  # ✅ Debugging log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
