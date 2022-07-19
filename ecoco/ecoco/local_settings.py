SECRET_KEY = 'j&$^*3xwxrro$bgj^7#ua()-h-$dzzeqx+j7bkfvdgvc6155&-' #追加

import os
from pathlib import Path

#settings.pyからそのままコピー
BASE_DIR = Path(__file__).resolve().parent.parent

#settings.pyからそのままコピー
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEBUG = True #ローカルでDebugできるようになります