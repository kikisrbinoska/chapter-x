using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface IReadingListRepository : IRepository<ReadingList>
    {
        Task<IEnumerable<ReadingList>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    }
}
