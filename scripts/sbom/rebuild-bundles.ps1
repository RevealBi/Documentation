param(
    [string] $RepositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression.FileSystem

$utf8WithoutBom = [System.Text.UTF8Encoding]::new($false)
$sbomRoot = Join-Path $RepositoryRoot 'static\sbom'
$catalogPath = Join-Path $sbomRoot 'catalog.json'
$catalog = Get-Content -LiteralPath $catalogPath -Raw | ConvertFrom-Json

function Get-Sha256([string] $Path) {
    return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Get-ProductSlug([string] $Product) {
    switch ($Product) {
        'Reveal Server' { return 'reveal-server' }
        'Reveal AI' { return 'reveal-ai' }
        'Reveal Client' { return 'reveal-client' }
        default { throw "Unsupported SBOM product '$Product'." }
    }
}

function Read-ZipText(
    [System.IO.Compression.ZipArchive] $Archive,
    [string] $EntryName
) {
    $entry = $Archive.GetEntry($EntryName)
    if ($null -eq $entry) {
        throw "Archive is missing '$EntryName'."
    }

    $reader = [System.IO.StreamReader]::new($entry.Open())
    try {
        return $reader.ReadToEnd()
    }
    finally {
        $reader.Dispose()
    }
}

function Write-ZipText(
    [System.IO.Compression.ZipArchive] $Archive,
    [string] $EntryName,
    [string] $Content
) {
    $entry = $Archive.CreateEntry($EntryName, [System.IO.Compression.CompressionLevel]::Optimal)
    $writer = [System.IO.StreamWriter]::new($entry.Open(), $utf8WithoutBom)
    try {
        $writer.Write($Content)
    }
    finally {
        $writer.Dispose()
    }
}

$rebuiltBundles = 0

foreach ($catalogEntry in $catalog.entries) {
    $downloadRelativePath = $catalogEntry.downloadUrl.TrimStart('.', '/').Replace('/', [IO.Path]::DirectorySeparatorChar)
    $downloadPath = Join-Path $sbomRoot $downloadRelativePath

    if ($catalogEntry.artifactType -eq 'file') {
        $catalogEntry.sha256 = Get-Sha256 $downloadPath
        continue
    }

    if ($catalogEntry.artifactType -ne 'bundle') {
        throw "Unsupported artifact type '$($catalogEntry.artifactType)'."
    }
    if (-not (Test-Path -LiteralPath $downloadPath -PathType Leaf)) {
        throw "Bundle '$downloadPath' does not exist."
    }

    $sourceRoot = Join-Path $sbomRoot (Join-Path 'files' (Join-Path (Get-ProductSlug $catalogEntry.product) (Join-Path $catalogEntry.platform $catalogEntry.packageVersion)))
    $existingArchive = [System.IO.Compression.ZipFile]::OpenRead($downloadPath)
    try {
        $manifest = (Read-ZipText $existingArchive 'manifest.json') | ConvertFrom-Json
        $readme = Read-ZipText $existingArchive 'README.txt'
    }
    finally {
        $existingArchive.Dispose()
    }

    $sourceFiles = [ordered]@{}
    foreach ($file in $manifest.files) {
        if (-not $file.archivePath.StartsWith('sboms/')) {
            throw "Manifest path '$($file.archivePath)' must start with 'sboms/'."
        }

        $relativeSourcePath = $file.archivePath.Substring('sboms/'.Length).Replace('/', [IO.Path]::DirectorySeparatorChar)
        $sourcePath = Join-Path $sourceRoot $relativeSourcePath
        if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf) -and $file.kind -eq 'aggregate') {
            $aggregateCandidates = @(Get-ChildItem -LiteralPath $sourceRoot -Filter '*.cdx.json' -File)
            if ($aggregateCandidates.Count -eq 1) {
                $sourcePath = $aggregateCandidates[0].FullName
            }
        }
        if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
            throw "Manifest source '$sourcePath' does not exist."
        }

        $file.sha256 = Get-Sha256 $sourcePath
        $sourceFiles[$file.archivePath] = $sourcePath
    }

    if ($readme -notmatch 'embedded CycloneDX VEX assessment') {
        $readme = $readme.TrimEnd() + [Environment]::NewLine + [Environment]::NewLine +
            'Each SBOM includes an embedded CycloneDX VEX assessment. Review vulnerabilities[].analysis for the status, justification, response, and assessment detail.' +
            [Environment]::NewLine
    }

    $temporaryZip = Join-Path ([IO.Path]::GetDirectoryName($downloadPath)) ([IO.Path]::GetRandomFileName() + '.zip')
    $newArchive = [System.IO.Compression.ZipFile]::Open($temporaryZip, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        Write-ZipText $newArchive 'manifest.json' (($manifest | ConvertTo-Json -Depth 20) + [Environment]::NewLine)
        Write-ZipText $newArchive 'README.txt' $readme
        foreach ($archivePath in $sourceFiles.Keys) {
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $newArchive,
                $sourceFiles[$archivePath],
                $archivePath,
                [System.IO.Compression.CompressionLevel]::Optimal
            ) | Out-Null
        }
    }
    finally {
        $newArchive.Dispose()
    }

    Move-Item -LiteralPath $temporaryZip -Destination $downloadPath -Force
    $catalogEntry.sha256 = Get-Sha256 $downloadPath
    $rebuiltBundles += 1
}

[IO.File]::WriteAllText(
    $catalogPath,
    (($catalog | ConvertTo-Json -Depth 20) + [Environment]::NewLine),
    $utf8WithoutBom
)

Write-Output "Rebuilt $rebuiltBundles SBOM bundles and refreshed catalog hashes."
