#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', 'frontpage.views.home', name='home'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
