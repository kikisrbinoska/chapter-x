using ChapterX.Application.Abstractions;
using ChapterX.Application.Auth;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using ChapterX.Infrastructure.Repositories;
using ChapterX.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ChapterX.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var poolSection = configuration.GetSection("ConnectionPool");
            var minPoolSize = poolSection.GetValue<int>("MinPoolSize", 1);
            var maxPoolSize = poolSection.GetValue<int>("MaxPoolSize", 20);
            var idleLifetime = poolSection.GetValue<int>("ConnectionIdleLifetime", 300);
            var pruningInterval = poolSection.GetValue<int>("ConnectionPruningInterval", 10);
            var commandTimeout = poolSection.GetValue<int>("CommandTimeout", 30);
            var connectionTimeout = poolSection.GetValue<int>("Timeout", 15);

            var baseConnectionString = configuration.GetConnectionString("Database")!;
            var connectionString =
                $"{baseConnectionString};Minimum Pool Size={minPoolSize};Maximum Pool Size={maxPoolSize};" +
                $"Connection Idle Lifetime={idleLifetime};Connection Pruning Interval={pruningInterval};" +
                $"Command Timeout={commandTimeout};Timeout={connectionTimeout}";

            services.AddDbContextPool<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString));

            services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());
            services.AddScoped<IJwtTokenService, JwtTokenService>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IWriterRepository, WriterRepository>();
            services.AddScoped<IStoryRepository, StoryRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IRegularUserRepository, RegularUserRepository>();
            services.AddScoped<IGenreRepository, GenreRepository>();
            services.AddScoped<IReadingListRepository, ReadingListRepository>();
            services.AddScoped<IReadingListItemsRepository, ReadingListItemsRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<INotifyRepository, NotifyRepository>();
            services.AddScoped<INeedApprovalRepository, NeedApprovalRepository>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IHasGenreRepository, HasGenreRepository>();
            services.AddScoped<ICollaborationRepository, CollaborationRepository>();
            services.AddScoped<IChapterRepository, ChapterRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IAISuggestionRepository, AISuggestionRepository>();
            services.AddScoped<IContentTypeRepository, ContentTypeRepository>();
            services.AddScoped<IPermissionLevelRepository, PermissionLevelRepository>();
            services.AddScoped<IRolesRepository, RolesRepository>();
            services.AddScoped<IStatusRepository, StatusRepository>();

            return services;
        }
    }
}
