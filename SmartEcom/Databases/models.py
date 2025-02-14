from django.db import models

# Create your models here.
class Product(models.Model):
    product_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    imgs = models.JSONField()
    specs = models.JSONField()
    inStock = models.IntegerField()
    rating = models.FloatField()
    reviews = models.JSONField()
    tags = models.JSONField()

    def __str__(self):
        return self.title