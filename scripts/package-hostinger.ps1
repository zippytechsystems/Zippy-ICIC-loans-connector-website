Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = Join-Path (Get-Location) "hostinger-upload.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
$distPath = (Resolve-Path "dist").Path

Get-ChildItem -Path $distPath -Recurse -Force | Where-Object { -not $_.PSIsContainer } | ForEach-Object {
    $relative = $_.FullName.Substring($distPath.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relative)
}

$zip.Dispose()
Write-Host "Zip package created successfully at: $zipPath"
