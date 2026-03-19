using ChapterX.Application;
using ChapterX.Infrastructure;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.FullName);
});

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
try
{
    app.MapControllers();
}
catch (ReflectionTypeLoadException ex)
{
    Console.Error.WriteLine("ReflectionTypeLoadException while mapping controllers:");
    foreach (var loaderEx in ex.LoaderExceptions ?? [])
    {
        Console.Error.WriteLine(loaderEx.ToString());
    }

    throw;
}

app.Run();
