using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        public GenreRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Genre?> GetByNameAsync(string name, CancellationToken cancellationToken = default)
        {
            return await _dbSet.FirstOrDefaultAsync(g => g.Name == name, cancellationToken);
        }
    }
}
