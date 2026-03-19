using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface IChapterRepository : IRepository<Chapter>
    {
        Task<IEnumerable<Chapter>> GetByStoryIdAsync(int storyId, CancellationToken cancellationToken = default);
    }
}
