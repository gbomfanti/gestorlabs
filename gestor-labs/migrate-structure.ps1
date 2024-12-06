# Script PowerShell para migração da estrutura
# Salve como 'migrate-structure.ps1' na raiz do projeto

# Função para criar diretório se não existir
function EnsureDirectory {
    param (
        [string]$path
    )
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Criado diretório: $path" -ForegroundColor Green
    }
}

# Função para mover conteúdo mantendo a estrutura
function MovePath {
    param (
        [string]$source,
        [string]$destination
    )
    if (Test-Path $source) {
        EnsureDirectory $destination
        Move-Item -Path "$source\*" -Destination $destination -Force -ErrorAction SilentlyContinue
        Write-Host "Movido: $source -> $destination" -ForegroundColor Green
    }
}

# Limpar a tela
Clear-Host
Write-Host "Iniciando migração da estrutura do projeto..." -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

# 1. Criar estrutura principal
Write-Host "Criando estrutura principal..." -ForegroundColor Yellow

$mainDirs = @(
    "prisma\migrations",
    "prisma\seeds",
    "server\api",
    "server\middleware",
    "server\services",
    "server\utils",
    "server\types",
    "src\app\(auth)\login",
    "src\app\(auth)\register",
    "src\app\(dashboard)\[tenant]"
)

foreach ($dir in $mainDirs) {
    EnsureDirectory $dir
}

# 2. Mover arquivos existentes
Write-Host "Movendo arquivos existentes..." -ForegroundColor Yellow

# Mover páginas para estrutura de tenant
$pagesToMove = @("entradas", "saidas", "relatorios", "configuracoes", "perfil")
foreach ($page in $pagesToMove) {
    $source = "src\app\$page"
    $destination = "src\app\(dashboard)\[tenant]\$page"
    MovePath $source $destination
}

# Mover outros diretórios
$pathsToMove = @{
    "src\app\components\layout" = "src\components\layout"
    "src\app\contexts" = "src\contexts"
    "src\app\fonts" = "public\fonts"
}

foreach ($path in $pathsToMove.GetEnumerator()) {
    MovePath $path.Key $path.Value
}

# 3. Criar arquivos base
Write-Host "Criando arquivos base..." -ForegroundColor Yellow

$filesToCreate = @(
    "prisma\schema.prisma",
    "prisma\middleware.ts",
    "server\middleware\auth.ts",
    "server\middleware\tenant.ts",
    "server\services\auth.service.ts",
    "server\services\tenant.service.ts",
    "src\app\(auth)\login\page.tsx",
    "src\app\(auth)\register\page.tsx"
)

foreach ($file in $filesToCreate) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
        Write-Host "Criado arquivo: $file" -ForegroundColor Green
    }
}

# 4. Atualizar package.json
Write-Host "Atualizando package.json..." -ForegroundColor Yellow

$packageJsonPath = 'package.json'
if (Test-Path $packageJsonPath) {
    $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
    if (!$packageJson.scripts.PSObject.Properties.Match('prisma:generate').Count) {
        $packageJson.scripts | Add-Member -Type NoteProperty -Name 'prisma:generate' -Value 'prisma generate'
        $packageJson.scripts | Add-Member -Type NoteProperty -Name 'prisma:migrate' -Value 'prisma migrate dev'
        $packageJson.scripts | Add-Member -Type NoteProperty -Name 'prisma:studio' -Value 'prisma studio'
        $packageJson | ConvertTo-Json -Depth 100 | Set-Content $packageJsonPath
        Write-Host "Adicionados scripts do Prisma ao package.json" -ForegroundColor Green
    }
}

# 5. Atualizar tsconfig.json
Write-Host "Atualizando tsconfig.json..." -ForegroundColor Yellow

$tsconfigPath = 'tsconfig.json'
if (Test-Path $tsconfigPath) {
    $tsConfig = Get-Content $tsconfigPath -Raw | ConvertFrom-Json
    if (!$tsConfig.compilerOptions.paths) {
        $tsConfig.compilerOptions | Add-Member -Type NoteProperty -Name 'paths' -Value @{
            "@/*" = @("./src/*")
            "@server/*" = @("./server/*")
            "@prisma/*" = @("./prisma/*")
        }
        $tsConfig | ConvertTo-Json -Depth 100 | Set-Content $tsconfigPath
        Write-Host "Adicionados paths ao tsconfig.json" -ForegroundColor Green
    }
}

Write-Host "Migração concluída!" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan
Write-Host "Próximos passos:"
Write-Host "1. Verifique se todos os arquivos foram movidos corretamente"
Write-Host "2. Ajuste importações nos arquivos que foram movidos"
Write-Host "3. Execute 'npm install' para instalar novas dependências"
Write-Host "4. Execute 'npm run dev' para testar a aplicação"
Write-Host "----------------------------------------" -ForegroundColor Cyan