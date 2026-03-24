using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface ICommentRepository : IRepository<Comment>
    {
        Task<IEnumerable<Comment>> GetByChapterIdAsync(int chapterId, CancellationToken cancellationToken = default);
        Task<IEnumerable<Comment>> GetByStoryIdAsync(int storyId, CancellationToken cancellationToken = default);
    }
}
