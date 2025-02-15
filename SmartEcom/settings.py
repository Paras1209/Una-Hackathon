# ...existing code...

INSTALLED_APPS = [
    # ...existing code...
    'corsheaders',
    # ...existing code...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Ensure this is at the top
    # ...existing code...
]

# Allow all origins
CORS_ALLOW_ALL_ORIGINS = True

# Or specify allowed origins
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5174",
# ]

# ...existing code...
