#!/bin/bash

DRAWABLE_DIR="android/app/src/main/res"

echo "Searching for PNGs in $DRAWABLE_DIR..."

find "$DRAWABLE_DIR" -type f -name "*.png" | while read -r file; do
    # get the base name and WebP output path
    output="${file%.png}.webp"

    # backup the original png
    # cp "$file" "${file}.bak"

    echo "Converting: $file -> $output"
    cwebp -q 75 "$file" -o "$output"

    # remove the original PNG after conversion
    # rm "$file"
done

echo "Conversion complete."
