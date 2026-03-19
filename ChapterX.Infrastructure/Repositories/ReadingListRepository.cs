using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class ReadingListRepository : GenericRepository<ReadingList>, IReadingListRepository
    {
        public ReadingListRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ReadingList>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(r => r.UserId == userId)
                .ToListAsync(cancellationToken);
        }
    }
}
