try:
    from PIL import Image
    import os
    
    # Open the image
    img = Image.open('BG_Removed.png')
    
    # Convert RGBA to RGB (for JPEG)
    if img.mode == 'RGBA':
        # Create white background
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])  # Use alpha channel as mask
        img = background
    
    # Resize to reasonable size (800x800 max while maintaining aspect ratio)
    img.thumbnail((800, 800), Image.Resampling.LANCZOS)
    
    # Save as optimized JPEG
    img.save('profile-photo.jpg', 'JPEG', quality=85, optimize=True)
    
    # Get file sizes
    original_size = os.path.getsize('BG_Removed.png') / (1024 * 1024)
    new_size = os.path.getsize('profile-photo.jpg') / 1024
    
    print(f"Original: {original_size:.2f} MB")
    print(f"Optimized: {new_size:.2f} KB")
    print(f"Reduction: {((original_size * 1024 - new_size) / (original_size * 1024) * 100):.1f}%")
    print("Success! Image optimized.")
    
except ImportError:
    print("PIL not available, trying alternative method...")
    # Alternative: Just copy and rename for now, we'll optimize differently
    import shutil
    shutil.copy('BG_Removed.png', 'profile-photo.png')
    print("Copied image. Will need manual optimization.")
