using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface ICollaborationRepository : IRepository<Collaboration>
    {
        Task<bool> DeleteByUserAndStoryAsync(int userId, int storyId, CancellationToken cancellationToken = default);
    }
}
