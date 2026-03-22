using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface IReadingListItemsRepository : IRepository<ReadingListItems>
    {
        Task<bool> ExistsAsync(int listId, int storyId, CancellationToken cancellationToken = default);
    }
}
