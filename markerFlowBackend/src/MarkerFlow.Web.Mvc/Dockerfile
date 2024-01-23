FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

RUN dotnet tool install -g Microsoft.Web.LibraryManager.Cli
RUN ln -s ~/.dotnet/tools/libman /usr/local/bin/libman

WORKDIR /src
COPY ["src/MarkerFlow.Web.Mvc/MarkerFlow.Web.Mvc.csproj", "src/MarkerFlow.Web.Mvc/"]
COPY ["src/MarkerFlow.Web.Core/MarkerFlow.Web.Core.csproj", "src/MarkerFlow.Web.Core/"]
COPY ["src/MarkerFlow.Application/MarkerFlow.Application.csproj", "src/MarkerFlow.Application/"]
COPY ["src/MarkerFlow.Core/MarkerFlow.Core.csproj", "src/MarkerFlow.Core/"]
COPY ["src/MarkerFlow.EntityFrameworkCore/MarkerFlow.EntityFrameworkCore.csproj", "src/MarkerFlow.EntityFrameworkCore/"]
WORKDIR "/src/src/MarkerFlow.Web.Mvc"
RUN dotnet restore 

WORKDIR /src
COPY ["src/MarkerFlow.Web.Mvc", "src/MarkerFlow.Web.Mvc"]
COPY ["src/MarkerFlow.Web.Core", "src/MarkerFlow.Web.Core"]
COPY ["src/MarkerFlow.Application", "src/MarkerFlow.Application"]
COPY ["src/MarkerFlow.Core", "src/MarkerFlow.Core"]
COPY ["src/MarkerFlow.EntityFrameworkCore", "src/MarkerFlow.EntityFrameworkCore"]
WORKDIR "/src/src/MarkerFlow.Web.Mvc"
RUN libman restore
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "MarkerFlow.Web.Mvc.dll"]
