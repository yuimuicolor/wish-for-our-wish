import os
from PIL import Image

# 이미지 파일이 있는 디렉토리
images_dir = "./assets/images"

# 변환할 확장자
source_extensions = ['.png', '.jpg', '.jpeg', '.jfif', '.gif']

# 재귀적으로 모든 이미지 파일 찾기
for root, dirs, files in os.walk(images_dir):
    for file in files:
        file_path = os.path.join(root, file)
        file_ext = os.path.splitext(file)[1].lower()
        
        # .gif와 .ico 파일은 건너뛰기
        if file_ext in ['.gif', '.ico', '.svg']:
            print(f"Skipping: {file_path} (unsupported format)")
            continue
            
        if file_ext in source_extensions:
            try:
                # webp 파일 경로 생성
                webp_path = os.path.splitext(file_path)[0] + ".webp"
                
                # 이미지 열기
                img = Image.open(file_path)
                
                # 투명성을 유지하면서 webp로 저장
                # RGBA 모드는 그대로 유지
                if img.mode == 'P':
                    # Palette 모드인 경우 투명성 정보를 유지하기 위해 RGBA로 변환
                    if 'transparency' in img.info:
                        img = img.convert('RGBA')
                    else:
                        img = img.convert('RGB')
                
                # webp로 저장 (lossless 모드로 품질 유지)
                img.save(webp_path, 'WebP', quality=80)
                print(f"Converted: {file_path} → {webp_path}")
                
                # 원본 파일 삭제
                os.remove(file_path)
                print(f"Deleted: {file_path}")
            except Exception as e:
                print(f"Error converting {file_path}: {e}")

print("\n=== Conversion complete (with transparency preserved) ===")
