using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface IChapterRepository : IRepository<Chapter>
    {
        Task<IEnumerable<Chapter>> GetByStoryIdAsync(int storyId, CancellationToken cancellationToken = default);
        Task<Chapter?> GetByIdWithStoryAsync(int id, CancellationToken cancellationToken = default);
        Task IncrementViewCountAsync(int id, CancellationToken cancellationToken = default);
    }
}
