from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != "" and user.username != user.email:
        user.username = user.email


# call updateUser before updating User model
pre_save.connect(updateUser, sender=User)