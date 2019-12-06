FROM mcr.microsoft.com/dotnet/core/sdk:2.2
ENV DOTNET_USE_POLLING_FILE_WATCHER 1
EXPOSE 5000

WORKDIR /src
ENTRYPOINT dotnet restore && dotnet watch --project WebApi run --no-restore
