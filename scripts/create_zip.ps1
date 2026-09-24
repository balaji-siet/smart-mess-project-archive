$zipPath = "C:\Users\mkkni\OneDrive\Desktop\project\Food_Wastage_Reduction_System_Final.zip"
$tempDir = "C:\Users\mkkni\OneDrive\Desktop\project\temp_zip_staging"

if (Test-Path $zipPath) { Remove-Item -Force $zipPath }
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }

New-Item -ItemType Directory -Path $tempDir | Out-Null

$itemsToCopy = @(
    "frontend",
    "backend",
    "database",
    "ai",
    "smart-mess-software",
    "README.md",
    "PPT_Food_Wastage_Reduction_System.pptx"
)

foreach ($item in $itemsToCopy) {
    $src = Join-Path "C:\Users\mkkni\OneDrive\Desktop\project" $item
    if (Test-Path $src) {
        $dest = Join-Path $tempDir $item
        if (Test-Path $src -PathType Container) {
            Robocopy.exe $src $dest /E /XD node_modules .expo .git dist build .cache /XF *.log | Out-Null
        } else {
            Copy-Item $src $dest -Force
        }
    }
}

Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -CompressionLevel Optimal -Force
Remove-Item -Recurse -Force $tempDir
Write-Host "ZIP Created Successfully at $zipPath"
