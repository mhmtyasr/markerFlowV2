FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/MarkerFlow.Web.Host/MarkerFlow.Web.Host.csproj", "src/MarkerFlow.Web.Host/"]
COPY ["src/MarkerFlow.Web.Core/MarkerFlow.Web.Core.csproj", "src/MarkerFlow.Web.Core/"]
COPY ["src/MarkerFlow.Application/MarkerFlow.Application.csproj", "src/MarkerFlow.Application/"]
COPY ["src/MarkerFlow.Core/MarkerFlow.Core.csproj", "src/MarkerFlow.Core/"]
COPY ["src/MarkerFlow.EntityFrameworkCore/MarkerFlow.EntityFrameworkCore.csproj", "src/MarkerFlow.EntityFrameworkCore/"]
WORKDIR "/src/src/MarkerFlow.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/MarkerFlow.Web.Host", "src/MarkerFlow.Web.Host"]
COPY ["src/MarkerFlow.Web.Core", "src/MarkerFlow.Web.Core"]
COPY ["src/MarkerFlow.Application", "src/MarkerFlow.Application"]
COPY ["src/MarkerFlow.Core", "src/MarkerFlow.Core"]
COPY ["src/MarkerFlow.EntityFrameworkCore", "src/MarkerFlow.EntityFrameworkCore"]
WORKDIR "/src/src/MarkerFlow.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "MarkerFlow.Web.Host.dll"]
