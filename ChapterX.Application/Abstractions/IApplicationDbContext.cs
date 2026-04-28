using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using UserEntity = ChapterX.Domain.Entities.User;
using StoryEntity = ChapterX.Domain.Entities.Story;
using ChapterEntity = ChapterX.Domain.Entities.Chapter;
using CommentEntity = ChapterX.Domain.Entities.Comment;
using GenreEntity = ChapterX.Domain.Entities.Genre;
using ReadingListEntity = ChapterX.Domain.Entities.ReadingList;
using ReadingListItemsEntity = ChapterX.Domain.Entities.ReadingListItems;
using NotificationEntity = ChapterX.Domain.Entities.Notification;
using LikesEntity = ChapterX.Domain.Entities.Likes;
using CollaborationEntity = ChapterX.Domain.Entities.Collaboration;
using NotifyEntity = ChapterX.Domain.Entities.Notify;
using AISuggestionEntity = ChapterX.Domain.Entities.AISuggestion;
using AdminEntity = ChapterX.Domain.Entities.Admin;
using WriterEntity = ChapterX.Domain.Entities.Writer;
using RegularUserEntity = ChapterX.Domain.Entities.RegularUser;
using HasGenreEntity = ChapterX.Domain.Entities.HasGenre;
using NeedApprovalEntity = ChapterX.Domain.Entities.NeedApproval;

namespace ChapterX.Application.Abstractions
{
    public interface IApplicationDbContext
    {
        DbSet<UserEntity> Users { get; }
        DbSet<StoryEntity> Stories { get; }
        DbSet<ChapterEntity> Chapters { get; }
        DbSet<CommentEntity> Comments { get; }
        DbSet<GenreEntity> Genres { get; }
        DbSet<ReadingListEntity> ReadingLists { get; }
        DbSet<ReadingListItemsEntity> ReadingListItems { get; }
        DbSet<NotificationEntity> Notifications { get; }
        DbSet<LikesEntity> Likes { get; }
        DbSet<CollaborationEntity> Collaborations { get; }
        DbSet<NotifyEntity> Notifies { get; }
        DbSet<AISuggestionEntity> AISuggestions { get; }
        DbSet<AdminEntity> Admins { get; }
        DbSet<WriterEntity> Writers { get; }
        DbSet<RegularUserEntity> RegularUsers { get; }
        DbSet<HasGenreEntity> HasGenres { get; }
        DbSet<NeedApprovalEntity> NeedApprovals { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default);
    }
}
