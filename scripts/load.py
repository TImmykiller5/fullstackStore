from base.models import Product
from base.products import products

def run():
    Product.objects.all().delete()
    for product in products:
        pro = Product(
            name = product['name'],
            brand = product['brand'],
            category = product['category'],
            description = product['description'],
            rating = product['rating'],
            numReviews = product['numReviews'],
            price = product['price'],
            countInStock = product['countInStock']
        )
        pro.save()
