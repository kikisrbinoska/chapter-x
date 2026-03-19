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
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("Database")));

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
