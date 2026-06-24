using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class ChapterRepository : GenericRepository<Chapter>, IChapterRepository
    {
        public ChapterRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Chapter>> GetByStoryIdAsync(int storyId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(c => c.StoryId == storyId)
                .ToListAsync(cancellationToken);
        }

        public async Task<Chapter?> GetByIdWithStoryAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(c => c.Story)
                .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
        }

        public async Task IncrementViewCountAsync(int id, CancellationToken cancellationToken = default)
        {
            await _dbSet
                .Where(c => c.Id == id)
                .ExecuteUpdateAsync(s => s.SetProperty(c => c.ViewCount, c => c.ViewCount + 1), cancellationToken);
        }
    }
}
