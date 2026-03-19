using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface INotificationRepository : IRepository<Notification>
    {
        Task<IEnumerable<Notification>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    }
}
