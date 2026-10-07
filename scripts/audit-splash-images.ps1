param(
    [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot ".."))
)

$ErrorActionPreference = "Stop"
$srcRoot = Join-Path $ProjectRoot "src"
$publicRoot = Join-Path $ProjectRoot "public"

Write-Host "CASANOSTRA - Splash / Hero Image Audit" -ForegroundColor Cyan
Write-Host "Project: $ProjectRoot"
Write-Host ""

$files = Get-ChildItem -Path $srcRoot -Recurse -File |
    Where-Object { $_.Extension -in @(".ts", ".tsx", ".js", ".jsx", ".mjs", ".css") }

$remotePattern = 'https://images\.unsplash\.com/[^"'"'"'\s,)}`>]+'
$localImagePattern = '(/images/[^"'"'"'\s,)}`>]+\.(?:jpg|jpeg|png|webp|avif|gif))'

Write-Host "[1] Hero / splash related references" -ForegroundColor Yellow
$heroMatches = foreach ($file in $files) {
    Select-String -Path $file.FullName -Pattern 'heroImage|poster-hero|<poster|splash' | ForEach-Object {
        "{0}:{1}: {2}" -f $_.Path, $_.LineNumber, $_.Line.Trim()
    }
}
$heroMatches | ForEach-Object { Write-Host $_ }
if (-not $heroMatches) { Write-Host "No explicit splash/hero keyword references found." }

Write-Host ""
Write-Host "[2] Remaining remote image URLs in src" -ForegroundColor Yellow
$remoteMatches = foreach ($file in $files) {
    Select-String -Path $file.FullName -Pattern $remotePattern -AllMatches | ForEach-Object {
        foreach ($m in $_.Matches) {
            "{0}:{1}: {2}" -f $_.Path, $_.LineNumber, $m.Value
        }
    }
}
$remoteMatches | Sort-Object -Unique | ForEach-Object { Write-Host $_ }
if (-not $remoteMatches) { Write-Host "No remote Unsplash image URLs remain under src." -ForegroundColor Green }

Write-Host ""
Write-Host "[3] Local image paths referenced from src" -ForegroundColor Yellow
$localRefs = foreach ($file in $files) {
    Select-String -Path $file.FullName -Pattern $localImagePattern -AllMatches | ForEach-Object {
        foreach ($m in $_.Matches) {
            $m.Value
        }
    }
}

$missing = @()
$localRefs | Sort-Object -Unique | ForEach-Object {
    $relative = $_.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar
    $full = Join-Path $publicRoot $relative
    if (Test-Path -LiteralPath $full -PathType Leaf) {
        Write-Host "OK   $_" -ForegroundColor Green
    } else {
        Write-Host "MISS $_" -ForegroundColor Red
        $script:missing += $_
    }
}

Write-Host ""
if ($missing.Count -gt 0) {
    Write-Host "FAIL: $($missing.Count) referenced local image(s) are missing." -ForegroundColor Red
    exit 1
}

Write-Host "PASS: all referenced local image paths resolve." -ForegroundColor Green
