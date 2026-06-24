using ChapterX.Application.Abstractions;
using ChapterX.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace ChapterX.Infrastructure.Data.DataContext
{
    public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : DbContext(options), IApplicationDbContext
    {
        public DbSet<User> Users { get; init; }
        public DbSet<Story> Stories { get; init; }
        public DbSet<Chapter> Chapters { get; init; }
        public DbSet<Comment> Comments { get; init; }
        public DbSet<Genre> Genres { get; init; }
        public DbSet<ReadingList> ReadingLists { get; init; }
        public DbSet<ReadingListItems> ReadingListItems { get; init; }
        public DbSet<Notification> Notifications { get; init; }
        public DbSet<Likes> Likes { get; init; }
        public DbSet<Collaboration> Collaborations { get; init; }
        public DbSet<Notify> Notifies { get; init; }
        public DbSet<AISuggestion> AISuggestions { get; init; }
        public DbSet<Admin> Admins { get; init; }
        public DbSet<Writer> Writers { get; init; }
        public DbSet<RegularUser> RegularUsers { get; init; }
        public DbSet<HasGenre> HasGenres { get; init; }
        public DbSet<NeedApproval> NeedApprovals { get; init; }
        public DbSet<Status> Statuses { get; init; }
        public DbSet<ContentType> ContentTypes { get; init; }
        public DbSet<SuggestionType> SuggestionTypes { get; init; }
        public DbSet<Roles> Roles { get; init; }
        public DbSet<PermissionLevel> PermissionLevels { get; init; }

        public Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
            => Database.BeginTransactionAsync(cancellationToken);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // USERS
            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("users");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("user_id");
                e.Property(x => x.Username).HasColumnName("username");
                e.Property(x => x.Email).HasColumnName("email");
                e.Property(x => x.Name).HasColumnName("user_name");
                e.Property(x => x.Surname).HasColumnName("surname");
                e.Property(x => x.Password).HasColumnName("password");
                e.Property(x => x.CreatedAt).HasColumnName("user_created_at");
                e.Property(x => x.UpdatedAt).HasColumnName("user_updated_at");
            });

            // ADMINS
            modelBuilder.Entity<Admin>(e =>
            {
                e.ToTable("admins");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("user_id");
                e.HasOne(x => x.User).WithOne(u => u.Admin).HasForeignKey<Admin>(x => x.Id);
            });

            // REGULAR_USER
            modelBuilder.Entity<RegularUser>(e =>
            {
                e.ToTable("regular_user");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("user_id");
                e.HasOne(x => x.User).WithOne(u => u.RegularUser).HasForeignKey<RegularUser>(x => x.Id);
            });

            // WRITER
            modelBuilder.Entity<Writer>(e =>
            {
                e.ToTable("writer");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("user_id");
                e.HasOne(x => x.User).WithOne(u => u.Writer).HasForeignKey<Writer>(x => x.Id);
            });

            // STORY
            modelBuilder.Entity<Story>(e =>
            {
                e.ToTable("story");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("story_id");
                e.Property(x => x.MatureContent).HasColumnName("mature_content");
                e.Property(x => x.Title).HasColumnName("title");
                e.Property(x => x.ShortDescription).HasColumnName("short_description");
                e.Property(x => x.Image).HasColumnName("image");
                e.Property(x => x.Content).HasColumnName("story_content");
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.CreatedAt).HasColumnName("story_created_at");
                e.Property(x => x.UpdatedAt).HasColumnName("story_updated_at");
                e.HasOne(x => x.Writer).WithMany(w => w.Stories).HasForeignKey(x => x.UserId);
            });

            // STATUS
            modelBuilder.Entity<Status>(e =>
            {
                e.ToTable("status");
                e.HasKey(x => new { x.StoryId, x.StatusValue });
                e.Ignore(x => x.Id);
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.StatusValue).HasColumnName("status");
                e.HasOne(x => x.Story).WithMany(s => s.Statuses).HasForeignKey(x => x.StoryId);
            });

            // CHAPTER
            modelBuilder.Entity<Chapter>(e =>
            {
                e.ToTable("chapter");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("chapter_id");
                e.Property(x => x.Number).HasColumnName("chapter_number");
                e.Property(x => x.Name).HasColumnName("chapter_name");
                e.Property(x => x.Title).HasColumnName("title");
                e.Property(x => x.Content).HasColumnName("chapter_content");
                e.Property(x => x.WordCount).HasColumnName("word_count");
                e.Property(x => x.Rating).HasColumnName("rating");
                e.Property(x => x.PublishedAt).HasColumnName("published_at");
                e.Property(x => x.ViewCount).HasColumnName("view_count");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.CreatedAt).HasColumnName("chapter_created_at");
                e.Property(x => x.UpdatedAt).HasColumnName("chapter_updated_at");
                e.HasOne(x => x.Story).WithMany(s => s.Chapters).HasForeignKey(x => x.StoryId);
            });

            // GENRE
            modelBuilder.Entity<Genre>(e =>
            {
                e.ToTable("genre");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("genre_id");
                e.Property(x => x.Name).HasColumnName("genre_name");
            });

            // HAS_GENRE
            modelBuilder.Entity<HasGenre>(e =>
            {
                e.ToTable("has_genre");
                e.HasKey(x => new { x.StoryId, x.GenreId });
                e.Ignore(x => x.Id);
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.GenreId).HasColumnName("genre_id");
                e.HasOne(x => x.Story).WithMany(s => s.HasGenres).HasForeignKey(x => x.StoryId);
                e.HasOne(x => x.Genre).WithMany(g => g.HasGenres).HasForeignKey(x => x.GenreId);
            });

            // LIKES
            modelBuilder.Entity<Likes>(e =>
            {
                e.ToTable("likes");
                e.HasKey(x => new { x.UserId, x.StoryId });
                e.Ignore(x => x.Id);
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.CreatedAt).HasColumnName("like_created_at");
                e.HasOne(x => x.User).WithMany(u => u.Likes).HasForeignKey(x => x.UserId);
                e.HasOne(x => x.Story).WithMany(s => s.Likes).HasForeignKey(x => x.StoryId);
            });

            // COMMENT
            modelBuilder.Entity<Comment>(e =>
            {
                e.ToTable("comment");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("comment_id");
                e.Property(x => x.Content).HasColumnName("comment_content");
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.CreatedAt).HasColumnName("comment_created_at");
                e.Property(x => x.UpdatedAt).HasColumnName("comment_updated_at");
                e.HasOne(x => x.User).WithMany(u => u.Comments).HasForeignKey(x => x.UserId);
                e.HasOne(x => x.Story).WithMany(s => s.Comments).HasForeignKey(x => x.StoryId);
            });

            // READING_LIST
            modelBuilder.Entity<ReadingList>(e =>
            {
                e.ToTable("reading_list");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("list_id");
                e.Property(x => x.Name).HasColumnName("list_name");
                e.Property(x => x.Content).HasColumnName("list_content");
                e.Property(x => x.IsPublic).HasColumnName("is_public");
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.CreatedAt).HasColumnName("list_created_at");
                e.Property(x => x.UpdatedAt).HasColumnName("list_updated_at");
                e.HasOne(x => x.User).WithMany(u => u.ReadingLists).HasForeignKey(x => x.UserId);
            });

            // READING_LIST_ITEMS
            modelBuilder.Entity<ReadingListItems>(e =>
            {
                e.ToTable("reading_list_items");
                e.HasKey(x => new { x.ListId, x.StoryId });
                e.Ignore(x => x.Id);
                e.Property(x => x.ListId).HasColumnName("list_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.AddedAt).HasColumnName("added_at");
                e.HasOne(x => x.ReadingList).WithMany(r => r.ReadingListItems).HasForeignKey(x => x.ListId);
                e.HasOne(x => x.Story).WithMany(s => s.ReadingListItems).HasForeignKey(x => x.StoryId);
            });

            // NOTIFICATION
            modelBuilder.Entity<Notification>(e =>
            {
                e.ToTable("notification");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("notification_id");
                e.Property(x => x.Content).HasColumnName("notification_content");
                e.Property(x => x.IsRead).HasColumnName("is_read");
                e.Property(x => x.CreatedAt).HasColumnName("notification_created_at");
                e.Property(x => x.RecipientUserId).HasColumnName("recipient_user_id");
                e.Property(x => x.Type).HasColumnName("type");
                e.Property(x => x.Link).HasColumnName("link");
            });

            // CONTENT_TYPE
            modelBuilder.Entity<ContentType>(e =>
            {
                e.ToTable("content_type");
                e.HasKey(x => new { x.NotificationId, x.ContentTypeValue });
                e.Ignore(x => x.Id);
                e.Property(x => x.NotificationId).HasColumnName("notification_id");
                e.Property(x => x.ContentTypeValue).HasColumnName("content_type");
                e.HasOne(x => x.Notification).WithMany(n => n.ContentTypes).HasForeignKey(x => x.NotificationId);
            });

            // NOTIFY
            modelBuilder.Entity<Notify>(e =>
            {
                e.ToTable("notify");
                e.HasKey(x => new { x.UserId, x.StoryId, x.NotificationId });
                e.Ignore(x => x.Id);
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.NotificationId).HasColumnName("notification_id");
                e.HasOne(x => x.User).WithMany(u => u.Notifies).HasForeignKey(x => x.UserId);
                e.HasOne(x => x.Story).WithMany(s => s.Notifies).HasForeignKey(x => x.StoryId);
                e.HasOne(x => x.Notification).WithMany(n => n.Notifies).HasForeignKey(x => x.NotificationId);
            });

            // AI_SUGGESTION
            modelBuilder.Entity<AISuggestion>(e =>
            {
                e.ToTable("ai_suggestion");
                e.HasKey(x => x.Id);
                e.Property(x => x.Id).HasColumnName("suggestion_id");
                e.Property(x => x.OriginalText).HasColumnName("original_text");
                e.Property(x => x.SuggestedText).HasColumnName("suggested_text");
                e.Property(x => x.Accepted).HasColumnName("accepted");
                e.Property(x => x.CreatedAt).HasColumnName("suggestion_created_at");
                e.Property(x => x.AppliedAt).HasColumnName("applied_at");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.HasOne(x => x.Story).WithMany(s => s.AISuggestions).HasForeignKey(x => x.StoryId);
            });

            // SUGGESTION_TYPE
            modelBuilder.Entity<SuggestionType>(e =>
            {
                e.ToTable("suggestion_type");
                e.HasKey(x => new { x.SuggestionId, x.SuggestionTypeValue });
                e.Ignore(x => x.Id);
                e.Property(x => x.SuggestionId).HasColumnName("suggestion_id");
                e.Property(x => x.SuggestionTypeValue).HasColumnName("suggestion_type");
                e.HasOne(x => x.AISuggestion).WithMany(a => a.SuggestionTypes).HasForeignKey(x => x.SuggestionId);
            });

            // NEED_APPROVAL
            modelBuilder.Entity<NeedApproval>(e =>
            {
                e.ToTable("need_approval");
                e.HasKey(x => new { x.SuggestionId, x.StoryId, x.ChapterId });
                e.Ignore(x => x.Id);
                e.Property(x => x.SuggestionId).HasColumnName("suggestion_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.ChapterId).HasColumnName("chapter_id");
                e.HasOne(x => x.AISuggestion).WithMany(a => a.NeedApprovals).HasForeignKey(x => x.SuggestionId);
                e.HasOne(x => x.Story).WithMany(s => s.NeedApprovals).HasForeignKey(x => x.StoryId);
                e.HasOne(x => x.Chapter).WithMany(c => c.NeedApprovals).HasForeignKey(x => x.ChapterId);
            });

            // COLLABORATION
            modelBuilder.Entity<Collaboration>(e =>
            {
                e.ToTable("collaboration");
                e.HasKey(x => new { x.UserId, x.StoryId });
                e.Ignore(x => x.Id);
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.CreatedAt).HasColumnName("collab_created_at");
                e.HasOne(x => x.User).WithMany(u => u.Collaborations).HasForeignKey(x => x.UserId);
                e.HasOne(x => x.Story).WithMany(s => s.Collaborations).HasForeignKey(x => x.StoryId);
            });

            // ROLES
            modelBuilder.Entity<Roles>(e =>
            {
                e.ToTable("roles");
                e.HasKey(x => new { x.UserId, x.StoryId, x.RoleValue });
                e.Ignore(x => x.Id);
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.RoleValue).HasColumnName("roles");
            });

            // PERMISSION_LEVEL
            modelBuilder.Entity<PermissionLevel>(e =>
            {
                e.ToTable("permission_level");
                e.HasKey(x => new { x.UserId, x.StoryId, x.Level });
                e.Ignore(x => x.Id);
                e.Property(x => x.UserId).HasColumnName("user_id");
                e.Property(x => x.StoryId).HasColumnName("story_id");
                e.Property(x => x.Level).HasColumnName("permission_level");
            });
        }
    }
}
