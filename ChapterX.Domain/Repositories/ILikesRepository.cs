using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface ILikesRepository : IRepository<Likes>
    {
        Task<IEnumerable<Likes>> GetByStoryIdAsync(int storyId, CancellationToken cancellationToken = default);
        Task<bool> DeleteByUserAndStoryAsync(int userId, int storyId, CancellationToken cancellationToken = default);
        Task<bool> ExistsAsync(int userId, int storyId, CancellationToken cancellationToken = default);
    }
}
