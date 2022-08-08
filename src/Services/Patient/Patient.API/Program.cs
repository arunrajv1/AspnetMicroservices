using Patient.API.Data;
using Patient.API.Repositories;

using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Patient.API", Version = "v1" });
});
builder.Services.AddSingleton<IDocumentClient>(x => new DocumentClient(new Uri(builder.Configuration["CosmosDB:URL"]), builder.Configuration["CosmosDB:PrimaryKey"]));
//builder.Services.AddScoped<IPatientContext, PatientContext>();
//builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddCors(p => p.AddPolicy("corsPolicy", build =>
{
    build.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
}));

var app = builder.Build();

app.UseCors("corsPolicy");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{

//}
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Patient.API v1"));
app.UseAuthorization();
app.MapControllers();
app.Run();
