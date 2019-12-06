using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Neo4jClient;
using WebApi.Extensions;
using WebApi.Services;

namespace WebApi
{
    internal class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddAuthorization()
                .AddFormatterMappings()
                .AddJsonFormatters()
                .AddApiExplorer()
                .AddCors(options =>
                {
                    options.AddPolicy("AllowAny", builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyMethod();
                        builder.AllowAnyHeader();
                    });
                });

            // OpenID Connect authorization code exchanger
            services.AddGoogleOpenIdConnectProvider(this.configuration["Auth:Google:RequestUri"]);
            services.AddSingleton<ITokenService, TokenService>();

            // Database
            services.AddSingleton<IDatabaseService, DatabaseService>();
            services.AddSingleton<IGraphClient>(serviceProvider =>
            {
                var logger = serviceProvider.GetRequiredService<ILogger<Startup>>();
                var baseUri = new Uri(this.configuration["Database:Uri"]);
                var dbUri = new Uri(baseUri, "/db/data");

                logger.LogDebug("Connecting to database");
                var client = new GraphClient(dbUri, this.configuration["Database:Username"], this.configuration["Database:Password"]);
                client.Connect();
                logger.LogDebug("Connected");

                return client;
            });

            // Swagger docs (development only)
            services.AddSwaggerDocument(options =>
            {
                options.Version = Program.Version;
                options.Title = "SmartAdvisor API";
            });

            // Authentication (using the Authorization header)
            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = this.configuration["DefaultAuthScheme"];
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, builder =>
                {
                    var configSection = this.configuration.GetSection("Auth:Tokens");
                    var localKey = configSection["EncryptionKey"];

                    builder.RequireHttpsMetadata = false;
                    builder.SaveToken = true;
                    builder.TokenValidationParameters = new TokenValidationParameters
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(localKey)),
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidIssuer = configSection["Issuer"],
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("AllowAny");
                app.UseOpenApi(settings => settings.Path = "/api/swagger/{documentName}/swagger.json");
                app.UseSwaggerUi3(settings =>
                {
                    settings.Path = "/api/swagger";
                    settings.DocumentPath = "/api/swagger/{documentName}/swagger.json";
                });
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
