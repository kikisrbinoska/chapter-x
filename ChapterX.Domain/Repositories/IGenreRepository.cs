using ChapterX.Domain.Entities;

namespace ChapterX.Domain.Repositories
{
    public interface IGenreRepository : IRepository<Genre>
    {
        Task<Genre?> GetByNameAsync(string name, CancellationToken cancellationToken = default);
    }
}
