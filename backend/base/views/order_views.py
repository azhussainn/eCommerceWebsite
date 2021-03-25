from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializer import ProductSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime
from django.utils import timezone


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if not orderItems and len(orderItems) == 0:
        return Response({
            'details' : "No Order Items"},
            status=status.HTTP_400_BAD_REQUEST)
    else:

        #1. create the order

        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )

        #2. Create shipping address

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
        )

        #3. Create order items and set order to orderItem relationship

        for i in orderItems:
            #for relating every order item to a product
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )

            #4. Update Product stock
            product.countInStock -= item.qty

            #5.saving the product
            product.save()

        #Serializing current order with orderSerializer
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)

        #order info only available to staff and maker of order
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({
                'detail' : "Not Authorized to view this order"
            }, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({
            'detail' : "Order does not exist"
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user

    # get all orders of the user
    orders = user.order_set.all()

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)




@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now(tz=timezone.utc)
    order.save()
    return Response("Order was Paid")

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now(tz=timezone.utc)
    order.save()
    return Response("Order was Delivered")

@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrders(request):

    orders = Order.objects.all()

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
