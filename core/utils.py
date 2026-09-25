import os
import uuid
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status


def api_response(success=True, message="", data=None, status_code=status.HTTP_200_OK):
    """
    Standardized REST API response format across all endpoints:
    {
        "success": bool,
        "message": str,
        "data": dict | list | None
    }
    """
    return Response(
        {
            "success": success,
            "message": message,
            "data": data if data is not None else {}
        },
        status=status_code
    )


def handle_file_upload(file_obj, folder_name="uploads"):
    """
    Handles file upload to Supabase Storage if credentials are configured in settings/.env,
    otherwise falls back to standard Django file storage safely.
    Returns the public web URL of the uploaded file.
    """
    if not file_obj:
        return None

    supabase_url = getattr(settings, 'SUPABASE_URL', None) or os.environ.get('SUPABASE_URL')
    supabase_key = getattr(settings, 'SUPABASE_KEY', None) or os.environ.get('SUPABASE_KEY')

    ext = file_obj.name.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"
    path_key = f"{folder_name}/{filename}"

    if supabase_url and supabase_key:
        try:
            from supabase import create_client
            supabase = create_client(supabase_url, supabase_key)
            bucket_name = folder_name
            
            # Read file bytes
            file_bytes = file_obj.read()
            
            # Upload to Supabase bucket
            supabase.storage.from_(bucket_name).upload(path=filename, file=file_bytes)
            
            # Get public URL
            public_url = supabase.storage.from_(bucket_name).get_public_url(filename)
            return public_url
        except Exception as e:
            print(f"[Supabase Upload Fallback]: {str(e)}")

    # Fallback to Django media storage if Supabase credentials aren't set
    from django.core.files.storage import default_storage
    saved_path = default_storage.save(f"{folder_name}/{filename}", file_obj)
    return f"{settings.MEDIA_URL}{saved_path}"
