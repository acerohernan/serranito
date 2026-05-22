# Publish Docker images for local Windows use.
# Usage: .\scripts\publish-images.ps1

Set-StrictMode -Version Latest
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptDir\.."

function Load-EnvFile {
    param([string]$path)
    if (-Not (Test-Path $path)) { return }
    Get-Content $path | ForEach-Object {
        if ($_ -and $_ -notmatch '^\s*#') {
            $parts = $_ -split '=', 2
            if ($parts.Length -eq 2) {
                $name = $parts[0].Trim()
                $value = $parts[1].Trim()
                if ($name) {
                    Set-Item -Path "Env:$name" -Value $value
                }
            }
        }
    }
}

Load-EnvFile ".env"

$dockerHubUser = $env:DOCKERHUB_USERNAME
$dockerHubPassword = $env:DOCKERHUB_PASSWORD
if (-not $dockerHubUser) {
    Write-Host 'DOCKERHUB_USERNAME is missing. Either set it in .env or export it in your PowerShell session.' -ForegroundColor Yellow
    exit 1
}
if (-not $dockerHubPassword) {
    Write-Host 'DOCKERHUB_PASSWORD is missing. Either set it in .env or export it in your PowerShell session.' -ForegroundColor Yellow
    exit 1
}

$dockerHubRepoApi = "$dockerHubUser/serranito-api-rest"
$dockerHubRepoFrontend = "$dockerHubUser/serranito-frontend"
$gitSha = ''
try {
    $gitSha = (& git rev-parse --short HEAD) -replace '\s+', ''
} catch {
    $gitSha = ''
}

$tags = @('latest')
if ($gitSha) { $tags += $gitSha }

Write-Host "Logging in to Docker Hub as $dockerHubUser..."
$dockerHubPassword | docker login --username $dockerHubUser --password-stdin
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Docker login failed. Verify DOCKERHUB_PASSWORD or credentials.' -ForegroundColor Red
    exit 1
}

Write-Host "Building and pushing images for Docker Hub user '$dockerHubUser'..."

function Build-And-PushImage {
    param(
        [string]$context,
        [string]$dockerfile,
        [string]$repo
    )

    Write-Host "\nBuilding image for $context..."
    docker build --platform linux/amd64 -t "${repo}:latest" -f "$dockerfile" "$context"
    if ($LASTEXITCODE -ne 0) { throw "Build failed for $context" }

    foreach ($tag in $tags) {
        if ($tag -ne 'latest') {
            docker tag "${repo}:latest" "${repo}:${tag}"
            if ($LASTEXITCODE -ne 0) { throw "Tag failed for ${repo}:${tag}" }
        }
        Write-Host "Pushing ${repo}:${tag}..."
        docker push "${repo}:${tag}"
        if ($LASTEXITCODE -ne 0) { throw "Push failed for ${repo}:${tag}" }
    }
}

Build-And-PushImage -context './api-rest' -dockerfile './api-rest/Dockerfile' -repo $dockerHubRepoApi
Build-And-PushImage -context './frontend' -dockerfile './frontend/Dockerfile' -repo $dockerHubRepoFrontend

Write-Host '\nAll images published successfully.' -ForegroundColor Green
