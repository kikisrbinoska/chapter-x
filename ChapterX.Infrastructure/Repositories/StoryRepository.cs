using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class StoryRepository : GenericRepository<Story>, IStoryRepository
    {
        public StoryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Story>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(s => s.HasGenres)
                    .ThenInclude(hg => hg.Genre)
                .Include(s => s.Writer)
                    .ThenInclude(w => w!.User)
                .ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<Story>> GetByWriterIdAsync(int writerId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(s => s.Writer)
                .Where(s => s.Writer != null && s.Writer.Id == writerId)
                .ToListAsync(cancellationToken);
        }
    }
}
