from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .products import products
from rest_framework.response import Response
from .models import Product, Order, OderItem, ShippingAddress, Review
from .serializers import ProductSerializers, UserSerializers, UserSerializerWithToken, OrderSerializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {'no_active_account': 'email or pasXsword is incorrect!'}
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class registerUser(APIView):
        def post(self, request):
            try:
                data = request.data
                user = User.objects.create(
                    first_name=data['name'],
                    username = data['email'],
                    email = data['email'],
                    password = make_password(data['password']),
                )
                serializer = UserSerializerWithToken(user, many=False)
                return Response(serializer.data)
            except:
                message={'detail': 'USER WITH THIS EMAIL ALREADY EXIST'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

class getUserProfile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializers(user, many=False)
        return Response(serializer.data)

class updateUserProfile(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']

        if data['password'] != '':
            user.password = make_password(data['password'])
        
        user.save()

        return Response(serializer.data)

class getUsers(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializers(users, many=True)
        return Response(serializer.data)



class getUserByID(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializers(user, many=False)
        return Response(serializer.data)
    

class updateUserByID(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request, pk):
        user = User.objects.get(id=pk)
        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']
        user.is_staff = data['isAdmin']

        user.save()
        serializer = UserSerializers(user, many=False)

        return Response(serializer.data)


class deleteUser(APIView):
    permission_classes = [IsAdminUser]
    def delete(self, request, pk):
        usertodelete = User.objects.get(id = pk)
        usertodelete.delete()
        return Response('User was deleted')

class getTopProducts(APIView):
    def get(self, request):
        products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
        serializer = ProductSerializers(products, many=True)
        return Response(serializer.data)

class getProducts(APIView):
    
    def get(self, request):
        query = request.query_params.get('keyword')
        print(query)
        if query == None:
            query = ''
        
        products = Product.objects.filter(name__icontains=query)

        page = request.query_params.get('page')
        paginator = Paginator(products, per_page=10)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        page = int(page)


        serializer = ProductSerializers(products, many=True)
        return Response({'products':serializer.data, 'page':page, 'pages': paginator.num_pages})



class getProduct(APIView):
    
    def get(self, request, pk):
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializers(product, many=False)
        return Response(serializer.data)

class deleteProduct(APIView):
    permission_classes = [IsAdminUser]
    def delete(self, request, pk):
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response('Product Deleted')
    
class createProduct(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        user = request.user
        product = Product.objects.create(
            user = user,
            name = 'Sample Name',
            price = 0,
            brand = 'Sample Brand',
            countInStock = 0,
            category= 'Sample Category',
            description = 'Sample Description',
        )
        serializer = ProductSerializers(product, many=False)

        return Response(serializer.data)
    
class updateProduct(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request, pk):
        data = request.data
        product = Product.objects.get(_id=pk)

        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']

        product.save()

        serializer = ProductSerializers(product, many=False)
        return Response(serializer.data)
    
class uploadImage(APIView):
    def post(self, request):
        data = request.data
        product_id = data['product_id']

        product = Product.objects.get(_id=product_id)

        product.image = request.FILES.get('image')
        product.save()
        return Response('Image was uploaded')
    

class createProductReview(APIView):
    permission_classes = ([IsAuthenticated])
    def post(self, request, pk):
        user = request.user
        product = Product.objects.get(_id = pk)
        data = request.data

        #1 - Review already Exists
        alreadyExists = product.review_set.filter(user=user).exists()

        if alreadyExists:
            content = {'detail':'Product already reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        #2 - Review without rating or 0
        elif data['rating'] == 0:
            content = {'detail':'Please select a rating'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        #3 - create review
        else:
            review = Review.objects.create(
                user = user,
                product = product,
                name = user.first_name,
                rating = data['rating'],
                comment = data['comment']
            )
            reviews  = product.review_set.all()
            product.numReviews = len(reviews)
            total = 0
            for i in reviews:
                total += i.rating
            product.rating = total / len(reviews)
            product.save()

            return Response('Review was Added')




class addOrderItems(APIView):
    permission_classes = ([IsAuthenticated])
    def post(self, request):
        user = request.user
        data = request.data
        orderItems = data['orderItems']
        if orderItems and len(orderItems)== 0:
            return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            #  1. create order 
            order = Order.objects.create(
                user = user,
                paymentMethod = data['paymentMethod'],
                taxPrice = data['taxPrice'],
                shippingPrice = data['shippingPrice'],
                totalPrice = data['totalPrice'],
            )

            #  2. create shipping address
            shippingAddress = ShippingAddress.objects.create(
                Order = order,
                address = data['shippingAddress']['address'],
                city = data['shippingAddress']['city'],
                postalCode = data['shippingAddress']['postalCode'],
                # country = data['shippingAddress']['country']
            )

            #  3. loop through order items and connect to order
            for i in orderItems:
                product = Product.objects.get(_id=i['product'])
                item = OderItem.objects.create(
                    product = product,
                    order = order,
                    name = product.name,
                    qty = i['qty'],
                    price = i['price'],
                    image= product.image.url
                )
            #  4. change count in stock 
                product.countInStock -= int(item.qty)
                product.save()

        serializer = OrderSerializers(order, many=False)
        return Response(serializer.data)

class getOrders(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        order = user.order_set.all()
        Serializer = OrderSerializers(order, many=True)
        return Response(Serializer.data)
    
class getAllOrders(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        order = Order.objects.all()
        Serializer = OrderSerializers(order, many=True)
        return Response(Serializer.data)



class getOrderById(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user
        try:
            order = Order.objects.get(_id=pk)
            if user.is_staff or order.user == user:
                serializer = OrderSerializers(order, many=False)
                return Response(serializer.data)

            else:
                Response({'detail':'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'detail':'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class updateOrderToPaid(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()

        return Response ('order was paid')
    
class updateDelivered(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request, pk):
        order = Order.objects.get(_id=pk)
        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()

        return Response ('order was delivered')