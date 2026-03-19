using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface IAISuggestionRepository : IRepository<AISuggestion>
    {
        Task<IEnumerable<AISuggestion>> GetByChapterIdAsync(int chapterId, CancellationToken cancellationToken = default);
    }
}
