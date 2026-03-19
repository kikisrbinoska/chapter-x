using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface IStoryRepository : IRepository<Story>
    {
        Task<IEnumerable<Story>> GetByWriterIdAsync(int writerId, CancellationToken cancellationToken = default);
    }
}
