from .models import Product, Order, OderItem, ShippingAddress, Review
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializers(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializers = ReviewSerializers(reviews, many=True)
        return serializers.data

class ShippingAddressSerializers(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OderItemSerializers(serializers.ModelSerializer):
    class Meta:
        model =OderItem
        fields = '__all__'

class OrderSerializers(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    ShippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orders(self, obj):
        items = obj.oderitem_set.all()
        serializers = OderItemSerializers(items, many=True)
        return serializers.data

    def get_ShippingAddress(self, obj):
        try:
            address = ShippingAddressSerializers(obj.shippingaddress, many=False).data
        except:
            address = False
       
        return address
    
    def get_user(self, obj):
        user = obj.user
        serializers = UserSerializers(user, many=False)
        return serializers.data



class UserSerializers(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', '_id', 'isAdmin']

    def get__id(self, obj):
        _id = obj.id
        return _id

    def get_isAdmin(self, obj):
        return obj.is_staff
    

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializers):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', '_id', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        
        return str(token.access_token)